
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalComponent from './components/common/global.js'
import installElementPlus from './plugins/element-plus.js'
import installDirectives from './directive/index.js'
import 'styles/index.scss'

import Mock from './mock'
Mock.bootstrap()

const app = createApp(App)
app.use(store).use(router).use(globalComponent)
installElementPlus(app)
installDirectives(app)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
