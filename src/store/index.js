import { createStore } from 'vuex'

const allModules = import.meta.globEager('./modules/*.js')
const modules = {}
Object.keys(allModules).forEach(path => {
  const fileName = path.replace(/(.*\/)*([^.]+).*/ig, '$2')
  modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path]
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: modules,
})
