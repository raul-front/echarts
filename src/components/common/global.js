/*
 * @Descripttion: 注册全局组件
 * @Author: pujianguo
 * @Date: 2021-06-20 15:57:00
 */

const lisas = ['REmpty']

export default {
  install (Vue) {
    const lisaComponents = import.meta.globEager('../../lisa/components/common/*.vue')
    Object.keys(lisaComponents).forEach(fileName => {
      const component = lisaComponents[fileName]
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
      Vue.component(componentName, component.default || component)
      if (lisas.includes(componentName)) {
        const component = lisaComponents[fileName]
        Vue.component(componentName, component.default || component)
      }
    })

    const components = import.meta.globEager('./*.vue')
    Object.keys(components).forEach(fileName => {
      const component = components[fileName]
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
      Vue.component(componentName, component.default || component)
    })
  },
}
