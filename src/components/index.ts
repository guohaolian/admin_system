// ...existing code...
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component, Plugin } from 'vue'

import * as ElementPlusIcons from '@element-plus/icons-vue'

const components: Record<string, Component> = { SvgIcon }

const globalComponent: Plugin = {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]!)
    })
    //注册element-plus图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }
  },
}

export default globalComponent
// ...existing code...
