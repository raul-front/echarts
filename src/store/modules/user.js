import storage from '@/utils/storage'
import config from '@/config'

const state = {
  fullLoading: false,
  menuCollapsed: false,
  permission: null,
  token: '',
  pageOption: {},
  userInfo: {
    id: 0,
    isAdmin: false,
    name: 'raul',
    phone: '',
    email: '',
    avatar: config.defaultAvatar,
  },
}

export const user = {
  namespaced: true,
  state,
  actions: {
    syncSystemInitData ({ commit }) {
      const apis = []
      commit('SET_FULL_LOADING', true)
      Promise.all(apis).then(() => {
        // 设置菜单
        // commit('setInitMenuFromApi', menu)
        // // 设置公共资源， mutations在common模块中
        // commit('setInitConstDataFromApi', [org, permission])
        // // 设置app公共资源， app/store.appCommon模块中
        // commit('appCommon/setInitAppConstDataFromApi', res)
      }).finally(() => {
        setTimeout(() => {
          commit('SET_FULL_LOADING', false)
        }, 350)
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OPENID: (state, openid) => {
      state.openid = openid
    },
    // 设置菜单收缩
    SET_MENU_COLLAPSED (state, payload) {
      storage.setMenuCollapsed(payload)
      state.menuCollapsed = payload
    },
    SET_FULL_LOADING (state, payload) {
      state.fullLoading = payload
    },

    // 初始化数据
    SET_INITDATA_FROM_STORAGE (state) {
      console.log('SET_INITDATA_FROM_STORAGE')
      // const userInfo = storage.setAdminInfo()
      // if (userInfo) {
      //   state.userInfo = userInfo
      // }

      // const token = storage.setSignature()
      // if (token) {
      //   state.token = token
      // }

      const pageOption = storage.getPageOption()
      if (pageOption) {
        state.pageOption = pageOption
      }

      const menuCollapsed = storage.getMenuCollapsed()
      if (menuCollapsed !== null) {
        // 注意：storage里面存放的是字符串，这里需要转换
        state.menuCollapsed = menuCollapsed === 'true'
      }
    },
    SET_SYSTEM_INITDATA_FROM_API (state, data) {
      console.log('SET_SYSTEM_INITDATA_FROM_API')
    },

    SET_PAGE_OPTION (state, { routerName, data, isPage }) {
      let option = state.pageOption[routerName] ? state.pageOption[routerName] : {}
      if (isPage) {
        option = data
      } else {
        option = Object.assign({}, option, data)
      }
      state.pageOption[routerName] = option
      storage.setPageOption(state.pageOption)
    },
    CLEAR_PAGE_OPTION (state, routerName) {
      delete state.pageOption[routerName]
      storage.setPageOption(state.pageOption)
    },
  },
}
