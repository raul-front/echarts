
export default (app) => {
  const lisaDirectives = import.meta.globEager('../lisa/directive/*.js')
  console.log('lisaDirectives', lisaDirectives)
  Object.keys(lisaDirectives).forEach(path => {
    const directiveName = path.replace(/(.*\/)*([^.]+).*/ig, '$2')
    app.directive(directiveName, lisaDirectives[path].default)
  })

  // 不会包含 index.js 本身
  const directives = import.meta.globEager('./*.js')
  Object.keys(directives).forEach(path => {
    const directiveName = path.replace(/(.*\/)*([^.]+).*/ig, '$2')
    app.directive(directiveName, directives[path].default)
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
