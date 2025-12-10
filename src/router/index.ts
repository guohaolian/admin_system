// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

// 抽一个工厂函数，后面 resetRouter 会复用
function createMyRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    // 滚动行为
    scrollBehavior() {
      return {
        left: 0,
        top: 0,
      }
    },
  })
}

// 当前项目实际使用的 router 实例
const router = createMyRouter()

// ⭐ 新增：重置路由方法（清空之前动态 addRoute 的异步路由）
export function resetRouter() {
  const newRouter = createMyRouter()
  // 替换 matcher，达到“还原路由表”的效果
  ;(router as any).matcher = (newRouter as any).matcher
}

export default router
