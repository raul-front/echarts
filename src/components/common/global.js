/*
 * @Descripttion: 注册全局组件
 * @Author: pujianguo
 * @Date: 2021-06-20 15:57:00
 */

export default {
  install (Vue) {
    const allComponents = import.meta.globEager('./*.vue')
    Object.keys(allComponents).forEach(fileName => {
      const component = allComponents[fileName]
      const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
      Vue.component(componentName, component.default || component)
    })
  },
}
