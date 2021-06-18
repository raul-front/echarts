<template>
  <div class="component-table">
    <div class="table-header">
      <div class="table-header-left">
        <slot name="handleUpLeftButtons"></slot>
      </div>
      <div class="table-header-right">
        <slot name="handleUpRightButtons"></slot>
      </div>
    </div>
    <div class="table-content">
      <slot name="table"></slot>
    </div>
    <div class="table-footer">
      <div class="table-footer-left">
        <slot name="handleBottomLeftButtons"></slot>
      </div>
      <div class="table-footer-right" v-if="!noPage">
        <el-pagination background
          v-if="pageData.showPage"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50]"
          :total="pageData.realTotal"
          v-model:page-size="pageData.size"
          v-model:current-page="pageData.current"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { updateRouteQuery } from 'utils/func'

export default {
  name: 'component-table',
  props: {
    total: Number,
    noPage: {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const pageData = reactive({
      showPage: true,
      size: 10,
      current: 1,
      realTotal: 0,
    })
    watch(() => props.total, val => {
      pageData.realTotal = val
    })

    onMounted(() => {
      if (!props.noPage) {
        pageData.showPage = false
        nextTick(() => {
          // 这时候store中肯定有值
          const pageOption = store.state.user.pageOption[route.name]
          pageData.size = Number(pageOption.limit)
          pageData.current = Number(pageOption.current)
          pageData.realTotal = Number(pageOption.total)
          pageData.showPage = true
        })
      }
    })

    const handleSizeChange = (val) => {
      pageData.size = val
      pageData.current = 1
      handleCurrentChange()
    }
    const handleCurrentChange = () => {
      const offset = (pageData.current - 1) * pageData.size
      updateRouteQuery(route, router, {
        offset: offset,
        limit: pageData.size,
        current: pageData.current,
        total: pageData.realTotal,
      })
    }

    return {
      pageData,
      handleSizeChange,
      handleCurrentChange,
    }
  },
}
</script>

<style lang="scss">
.component-table{
  .table-header{
    // margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    &-left{
      .el-form-item{
        margin-bottom: 10px;
        // 解决列表页搜索部分没有对齐的问题
        .el-form-item__content>.el-date-editor .el-input__inner, .el-form-item__content>.el-select .el-input__inner, .el-form-item__content>.el-button{
          vertical-align: top;
        }
      }
    }
    &-right{
      .el-button{
        margin-bottom: 10px;
      }
    }
  }
  .table-content{

  }
  .table-footer{
    margin-top: 10px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    &-left{
    }
    &-right{
    }
  }
}
</style>
