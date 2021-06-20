<template>
  <div class="component-flex-page template-list-list" ref="componentFlexPageRef">
    <r-table :total="tableData.tableTotal" ref="componentFlexTableRef">
      <template #handleUpLeftButtons>
        <el-form :inline="true">
            <!-- 下拉列表 list从const中获取-->
            <el-form-item>
              <page-select queryKey="status" :list="employeeStatusList"></page-select>
            </el-form-item>
            <!-- 带选项的搜索输入框 -->
            <el-form-item>
              <page-search-input :list="selectSearchList"></page-search-input>
            </el-form-item>
            <!-- 年选择 -->
            <el-form-item>
              <select-date type="year"></select-date>
            </el-form-item>
            <!-- 月份选择 -->
            <el-form-item>
              <select-date :allow-after="false" type="month"></select-date>
            </el-form-item>
            <!-- 日期选择 -->
            <el-form-item>
              <select-date></select-date>
            </el-form-item>
            <!-- 时间选择 -->
            <el-form-item>
              <select-time></select-time>
            </el-form-item>
        </el-form>
      </template>
      <template #handleUpRightButtons>
        <el-button type="primary">添加员工（dialog）</el-button>
        <el-button type="primary">添加员工（page）</el-button>
        <el-tooltip effect="light" content="刷新" placement="top">
          <el-button type="info" icon="el-icon-refresh" @click="handleRefresh" :loading="tableData.tableLoading"></el-button>
        </el-tooltip>
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
  </div>
</template>

<script>
import { ref } from 'vue'
import { listUser, deleteUser } from 'api/template'
import RTable from '@/components/common/RTable.vue'
import { employeeStatusData } from '@/filter/const'
import { confirmExecHandle, constDataToArray, filter } from 'utils/func'
import useTablePage from 'hooks/useTablePage'
import { ElMessage } from 'element-plus'

export default {
  components: {
    RTable,
  },
  setup (props, { emit }) {
    const employeeStatusList = ref(constDataToArray(employeeStatusData, { label: '员工状态', value: '' }))
    const selectSearchList = ref([
      { label: '姓名', value: 'name' },
      { label: '手机', value: 'phone' },
    ])

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
        return { list: list, total: res.total }
      })
    }

    const {
      componentFlexPageRef,
      componentFlexTableRef,
      batchHandleEnabled,
      tableData,
      handleSelectionChange,
      handleRefresh,
    } = useTablePage(getDataHandle)

    const goUpdatePage = (item) => {
      console.log('goUpdatePage', item)
    }

    const handleDeleteConfirm = (item) => {
      confirmExecHandle('提示', `此操作将永久删除员工 ${item.name}, 是否继续?`, () => {
        return deleteUser(item.id).then(_ => {
          ElMessage.success('删除成功')
          handleRefresh()
        }).catch(_ => {})
      })
    }
    const handleBatchDeleteConfirm = () => {
      confirmExecHandle('提示', `确认删除选中的${tableData.selectedTable.length}个用户吗？`, () => {
        const apis = tableData.selectedTable.map(x => deleteUser(x.id))
        return Promise.all(apis).then(_ => {
          ElMessage.success('批量执行成功')
          handleRefresh()
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
      batchHandleEnabled,
      tableData,
      handleSelectionChange,
      handleRefresh,

      selectSearchList,
      employeeStatusList,
      handleDeleteConfirm,
      handleBatchDeleteConfirm,
      goUpdatePage,
    }
  },
}
</script>

<style lang="scss">
</style>
