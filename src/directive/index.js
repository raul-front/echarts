
export default (app) => {
  // 不会包含 index.js 本身
  const allDirectives = import.meta.globEager('./*.js')
  Object.keys(allDirectives).forEach(fileName => {
    const directiveName = fileName.replace(/^\.\//, '').replace(/\.js$/, '')
    app.directive(directiveName, allDirectives[fileName].default)
  })
}

// app.directive('xxx', {
//   mounted (el, binding) {
//     console.log(el, '安装了')
//   },
//   beforeUnmount (el, binding) {
//     console.log(el, '卸载了')
//   },
// })

//   created(el, binding, vnode, prevVnode) {}, // 新增
//   beforeMount() {},
//   mounted() {},
//   beforeUpdate() {}, // 新增
//   updated() {},
//   beforeUnmount() {}, // 新增
//   unmounted() {}
