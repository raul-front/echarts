
export default {
  path: 'template',
  menuName: 'Template',
  order: 100,
  icon: 'iconfont icon-zonglan',
  meta: { title: '模板页面' },
  component: () => import('@/views/template/index.vue'),
  redirect: 'template/echarts',
  children: [
    {
      path: 'list',
      meta: { title: '列表页', firstPageName: 'Template_List' },
      component: () => import('@/views/template/list/index.vue'),
      children: [
        { path: '', name: 'Template_List', component: () => import('@/views/template/list/list.vue'), meta: { isfirstPage: true, showIntro: true, title: '模板', desc: '模板描述' } },
        { path: 'add', name: 'Template_List_Add', component: () => import('@/views/template/list/edit.vue'), meta: { title: '模板_Add' } },
        { path: 'update/:id', name: 'Template_List_Update', component: () => import('@/views/template/list/edit.vue'), meta: { title: '模板_Update' } },
      ],
    },
    // {
    //   path: 'echarts',
    //   meta: { title: 'Echarts图表', firstPageName: 'TemplateEcharts' },
    //   component: () => import('@/views/template/echarts/index'),
    //   children: [
    //     { path: 'base', name: 'TemplateEcharts', component: () => import('@/views/template/echarts/base'), meta: { showIntro: true, showRouteTabs: true, title: 'Base', desc: '描述信息' } },
    //     { path: 'basecomponent', name: 'TemplateEcharts_BaseComponent', component: () => import('@/views/template/echarts/basecomponent'), meta: { showIntro: true, showRouteTabs: true, title: '图表组件', desc: '描述信息' } },
    //     { path: 'detailcomponent', name: 'TemplateEcharts_DetailComponent', component: () => import('@/views/template/echarts/detailcomponent'), meta: { showIntro: true, showRouteTabs: true, title: '单个图表组件', desc: '描述信息' } },
    //   ],
    // },
  ],
}
