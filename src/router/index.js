import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'utils/storage'
// import store from '../store'
// import { ElMessage } from 'element-plus'

const allModules = import.meta.globEager('./modules/*.js')
const routeList = []
Object.keys(allModules).forEach(path => {
  const fileName = path.replace(/(.*\/)*([^.]+).*/ig, '$2')
  const route = allModules[path][fileName] || allModules[path].default || allModules[path]
  routeList.push(route)
})

export const otherRoute = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/other/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/other/register.vue'),
  },
  {
    path: '/notaccess',
    name: 'NotAccess',
    component: () => import('@/views/other/notAccess.vue'),
  },
]

const appRoute = {
  path: '/',
  component: () => import('@/views/layout/index.vue'),
  children: [
    ...routeList,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/other/notFound.vue'),
    },
  ],
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...otherRoute,
    appRoute,
  ],
})

NProgress.configure({ showSpinner: false }) // NProgress Configuration 关闭右上角加载图标
// 不需要登录的路由
const noLoginWhiteList = ['Login', 'NotFound', 'NotAccess']
// 不需要权限验证的路由
const whiteList = [
  'NotAccess',
  'ProfileBase',
]

// 权限判断
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (storage.getSignature()) {
    if (to.name === 'Login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // add admin whitelist
      // if (store.state.user.userInfo.isAdmin) {
      //   whiteList.push('ProfileBase_Organization')
      // }
      if (whiteList.includes(to.name)) {
        next()
      } else {
        // const permission = store.state.user.permission
        // if (permission) {
        //   const hasPermission = permission[to.name] && permission[to.name].find(x => x === 'show')
        //   if (hasPermission) {
        //     next()
        //   } else {
        //     ElMessage.warning('您没有权限')
        //     next({ path: '/notaccess', replace: true, query: { noGoBack: true, path: to.path } })
        //   }
        // } else {
        //   next()
        // }
        next()
      }
    }
  } else {
    if (noLoginWhiteList.includes(to.name)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
