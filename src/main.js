
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element-plus.js'
import 'styles/index.scss'

import Mock from './mock'
Mock.bootstrap()

const app = createApp(App)
app.use(store).use(router)
installElementPlus(app)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
