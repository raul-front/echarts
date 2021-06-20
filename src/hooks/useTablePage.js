/*
 * @Descripttion: table页面
 * @Author: pujianguo
 * @Date: 2021-06-20 21:57:30
 */

import { ref, computed, watch, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRouteQuery, updateRouteQuery, clearRouteQuery, confirmExecHandle, constDataToArray, filter } from 'utils/func'
import { useStore } from 'vuex'

const useTablePage = (getDataHandle) => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const routerName = route.name
  const isClearRouterQuery = true
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
    console.log('route.query change', val)
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
      clearRouteQuery(router, routerName)
    }
  })
  const initRoute = () => {
    let pageOption = store.state.user.pageOption[route.name]
    console.log('pageopton', pageOption)
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
    console.log('table height:', height)
    tableData.tableHeight = height
  }
  const handleSelectionChange = (values) => {
    tableData.selectedTable = values
  }

  return {
    componentFlexPageRef,
    componentFlexTableRef,
    batchHandleEnabled,
    tableData,
    handleSelectionChange,
    handleRefresh,
  }
}

export default useTablePage
