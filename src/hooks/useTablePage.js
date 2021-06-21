/*
 * @Descripttion: table页面
 * @Author: pujianguo
 * @Date: 2021-06-20 21:57:30
 */

import { ref, computed, watch, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRouteQuery, updateRouteQuery, clearRouteQuery, copy } from 'utils/func'
import { useStore } from 'vuex'

const useTablePage = (getDataHandle) => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const editDialogData = reactive({
    visible: false,
    data: { action: 'add' },
  })

  let isClearRouterQuery = true
  const routeName = route.name
  const initQuery = {}

  const componentFlexPageRef = ref(null)
  const componentFlexTableRef = ref(null)

  const tableData = reactive({
    tableHeight: null,
    tableTotal: 0,
    tableData: [],
    tableLoading: false,
    selectedTable: [],
  })

  const batchHandleEnabled = computed(() => {
    return tableData.selectedTable.length > 0
  })

  watch(() => route.query, val => {
    // 页面离开是也会触发这里，需要判断
    if (routeName !== route.name) return
    if (JSON.stringify(val) === '{}') {
      initRoute()
    } else {
      getData()
    }
  })

  onMounted(() => {
    initRoute()
    nextTick(() => [
      setTableHeight(),
    ])
  })
  onBeforeUnmount(() => {
    if (isClearRouterQuery) {
      clearRouteQuery(router, routeName)
    }
  })
  const initRoute = () => {
    // TODO: 捋一下逻辑，添加注释
    let pageOption = store.state.user.pageOption[route.name]
    const query = route.query // 有query.super表示从别的页面跳转过来
    if (query.super || !pageOption) {
      delete query.super
      pageOption = Object.assign({ limit: 10, offset: 0, current: 1, total: 0 }, query, initQuery)
    }
    updateRouteQuery(route, router, pageOption)
  }

  const getData = () => {
    tableData.tableLoading = true
    const query = getRouteQuery(route.query)
    getDataHandle(query).then(({ total, list }) => {
      tableData.tableData = list
      tableData.tableTotal = total
      tableData.tableLoading = false
    }).catch(_ => {
      console.log('e', _)
      tableData.tableData = []
      tableData.tableTotal = 0
      tableData.tableLoading = false
    })
  }

  const handleRefresh = () => {
    getData()
  }

  const setTableHeight = () => {
    const pageHeight = componentFlexPageRef.value.offsetHeight - 20
    const cTableHeight = componentFlexTableRef.value.$el.offsetHeight
    let height = pageHeight - cTableHeight + 105
    if (height < 100) {
      height = null
    }
    tableData.tableHeight = height
  }
  const handleSelectionChange = (values) => {
    tableData.selectedTable = values
  }

  const openAddDialog = () => {
    editDialogData.data = { action: 'add' }
    editDialogData.visible = true
  }
  const openUpdateDialog = (item) => {
    editDialogData.data = copy(item)
    editDialogData.visible = true
  }

  const goAddPage = () => {
    isClearRouterQuery = false
    router.push({ name: `${routeName}_Add`, query: {} })
  }
  const goUpdatePage = (id) => {
    isClearRouterQuery = false
    router.push({ name: `${routeName}_Update`, params: { id: id } })
  }

  return {
    componentFlexPageRef,
    componentFlexTableRef,
    batchHandleEnabled,
    tableData,
    handleSelectionChange,
    handleRefresh,
    goAddPage,
    goUpdatePage,
    openAddDialog,
    openUpdateDialog,
    editDialogData,
  }
}

export default useTablePage
