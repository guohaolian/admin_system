//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
//引入操作本地存储token的工具函数
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

import type { UserState } from './types/type'

//引入路由（常量路由）
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
// 引入路由实例
import router, { resetRouter } from '@/router'
// 引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
// 新增：token 自动过期相关
const TOKEN_EXPIRE_KEY = 'token_expire'
const TOKEN_TTL = 60 * 60 * 1000 // 30s，毫秒
let tokenTimer: ReturnType<typeof setTimeout> | null = null

//创建用户相关的小仓库
let useUserStore = defineStore('user', {
  state(): UserState {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存贮生成菜单需要数组
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  getters: {},
  actions: {
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)

        // 设置过期时间并启动定时器
        try {
          const expireAt = Date.now() + TOKEN_TTL
          localStorage.setItem(TOKEN_EXPIRE_KEY, String(expireAt))
        } catch (e) {}
        this.startTokenTimer()

        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },

    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        // 计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )
        // 菜单需要的数据
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        // 目前路由器管理的只有常量路由，用户计算完毕的异步路由和任意路由需要动态添加
        const newRoutes = [...userAsyncRoute, anyRoute]
        newRoutes.forEach((route: any) => {
          router.addRoute(route)
        })

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        resetRouter()

        try {
          localStorage.removeItem(TOKEN_EXPIRE_KEY)
        } catch (e) {}
        if (tokenTimer) {
          clearTimeout(tokenTimer)
          tokenTimer = null
        }
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 新增：启动过期定时器（remaining 毫秒可选）
    startTokenTimer(remaining?: number) {
      // 清理已有定时器
      if (tokenTimer) {
        clearTimeout(tokenTimer)
        tokenTimer = null
      }
      const ms = typeof remaining === 'number' ? remaining : TOKEN_TTL
      tokenTimer = setTimeout(() => {
        this.token = ''
        REMOVE_TOKEN()
        try {
          localStorage.removeItem(TOKEN_EXPIRE_KEY)
        } catch (e) {}
      }, ms)
    },
    // 新增：初始化定时器（在 app 启动时调用）
    initTokenTimer() {
      const token = GET_TOKEN()
      if (!token) return
      try {
        const expire = Number(localStorage.getItem(TOKEN_EXPIRE_KEY) || '0')
        const now = Date.now()
        if (!expire || expire <= now) {
          // 已过期 -> 清理
          this.token = ''
          REMOVE_TOKEN()
          localStorage.removeItem(TOKEN_EXPIRE_KEY)
          if (tokenTimer) {
            clearTimeout(tokenTimer)
            tokenTimer = null
          }
        } else {
          // 还有剩余时间 -> 启动定时器
          this.startTokenTimer(expire - now)
        }
      } catch (e) {
        // 如遇 localStorage 问题则直接使用默认 TTL
        this.startTokenTimer()
      }
    },
  },
})

export default useUserStore
