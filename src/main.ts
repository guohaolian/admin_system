import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import gloalComponent from '@/components/index'
import SvgIcon from '@/components/SvgIcon/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus, { locale: zhCn })
app.use(gloalComponent)
app.use(router)
app.use(pinia)
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
userStore.initTokenTimer()
//测试假接口能否使用
/* import axios from 'axios'

axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
}) */
import './permisstion'

app.mount('#app')
