import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const appRoute = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/large-screen-1',
    name: 'Large_Screen_1',
    component: () => import('@/views/largescreen/screen1/index.vue'),
  },
  {
    path: '/large-screen-2',
    name: 'Large_Screen_2',
    component: () => import('@/views/largescreen/screen1/index2.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/other/notFound.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: appRoute,
})

NProgress.configure({ showSpinner: false }) // NProgress Configuration 关闭右上角加载图标

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
