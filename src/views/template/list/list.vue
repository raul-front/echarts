<template>
  <div class="component-flex-page template-list-list" ref="componentFlexPageRef">
    <r-table :total="tableData.tableTotal" ref="componentFlexTableRef">
      <template #handleUpLeftButtons>
        <span>handleUpLeftButtons</span>
      </template>
      <template #handleUpRightButtons>
        <span>handleUpRightButtons</span>
      </template>
      <template #table>
        <el-table border size="medium" :max-height="tableData.tableHeight"
          v-loading="tableData.tableLoading" :data="tableData.tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" header-align="center" width="48"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
          <el-table-column prop="age" label="年龄" min-width="120"></el-table-column>
          <el-table-column prop="birth" label="生日" min-width="200"></el-table-column>
          <el-table-column prop="sexLabel" label="性别" min-width="180"></el-table-column>
          <el-table-column prop="addr" label="地址" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template v-slot="scope">
              <div class="table-cell-link" @click="goUpdatePage(scope.row)">修改</div>
              <div class="table-cell-link" @click="handleDeleteConfirm(scope.row)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #handleBottomLeftButtons>
        <el-button type="danger" @click="handleBatchDeleteConfirm" :disabled="!batchHandleEnabled">删除</el-button>
      </template>
    </r-table>
    <!-- <el-table border size="medium"
        v-loading="tableLoading" :data="tableData.tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" header-align="center" width="48"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" min-width="120"></el-table-column>
        <el-table-column prop="birth" label="生日" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Label" label="性别" min-width="180"></el-table-column>
      </el-table> -->
  </div>
</template>

<script>
import { ref, onMounted, computed, toRaw, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
import { listUser, deleteUser } from 'api/template'
import RTable from '@/components/common/RTable.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getRouteQuery, updateRouteQuery, clearRouteQuery, confirmExecHandle, filter } from 'utils/func'

import { ElMessage } from 'element-plus'

export default {
  components: {
    RTable,
  },
  setup (props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    let routerName = ''
    let isClearRouterQuery = true
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
      routerName = route.name
      isClearRouterQuery = true

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

    const handleSelectionChange = (values) => {
      tableData.selectedTable = values
    }
    const refresh = () => {
      getData()
    }
    const getData = () => {
      tableData.tableLoading = true
      const query = getRouteQuery(route.query)
      getDataHandle(query).then(({ list, count }) => {
        tableData.tableData = list
        tableData.tableTotal = count
        tableData.tableLoading = false
      }).catch(() => {
        tableData.tableData = []
        tableData.tableTotal = 0
        tableData.tableLoading = false
      })
    }
    const getDataHandle = (query) => {
      return listUser(query).then(res => {
        let list = res.items || []
        list = list.map(x => {
          return {
            id: x.id,
            name: x.name,
            age: x.age,
            birth: x.birth,
            sex: x.sex,
            sexLabel: filter('sex', x.sex),
            addr: x.addr,
          }
        })
        return { list: list, count: res.total }
      })
    }

    const initRoute = () => {
      let pageOption = store.state.user.pageOption[route.name]
      const query = route.query // 有query.super表示从别的页面跳转过来
      if (query.super || !pageOption) {
        delete query.super
        pageOption = Object.assign({ limit: 10, offset: 0, current: 1, total: 0 }, query, initQuery)
      }
      updateRouteQuery(route, router, pageOption)
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

    const goUpdatePage = () => {
      console.log('goUpdatePage')
    }

    const handleDeleteConfirm = (item) => {
      confirmExecHandle('提示', `此操作将永久删除员工 ${item.name}, 是否继续?`, () => {
        return deleteUser(item.id).then(_ => {
          ElMessage.success('删除成功')
          refresh()
        }).catch(_ => {})
      })
    }
    const handleBatchDeleteConfirm = () => {
      confirmExecHandle('提示', `确认删除选中的${tableData.selectedTable.length}个用户吗？`, () => {
        const apis = tableData.selectedTable.map(x => deleteUser(x.id))
        return Promise.all(apis).then(_ => {
          ElMessage.success('批量执行成功')
          refresh()
        }).catch(_ => {})

        // 有些资源有批量删除接口
        // let ids = this.selectedTable.map(x => x.id)
        // return batchDeleteUser(ids).then(res => {
        //   this.refresh()
        //   this.$message.success('执行成功')
        // }).catch(_ => {})
      })
    }

    return {
      componentFlexPageRef,
      componentFlexTableRef,
      tableData,
      batchHandleEnabled,
      handleSelectionChange,
      handleDeleteConfirm,
      handleBatchDeleteConfirm,
      goUpdatePage,
    }
  },
}
</script>

<style lang="scss">
</style>
