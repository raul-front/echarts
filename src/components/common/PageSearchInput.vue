<template>
  <el-input placeholder="请输入搜索内容" v-model.trim="inputValue" @keydown.native.enter.prevent="onSearch">
    <template #prepend>
      <el-select v-model="select" placeholder="请选择" style="width: 100px">
        <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button icon="el-icon-search" @click.stop="onSearch"></el-button>
    </template>
  </el-input>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { updateRouteQuery } from 'utils/func'

export default {
  name: 'page-search-input',
  props: {
    list: Array,
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()

    const lastSelect = ref('')
    const select = ref('')
    const inputValue = ref('')

    // 从query中获取初始数据
    const initData = () => {
      const query = route.query
      // 从路由中获取参数并绑定
      let k = ''
      let v = ''
      for (const key in query) {
        if (props.list.find(x => x.value === key)) {
          k = key
          v = query[key]
        }
      }
      if (k && v) {
        select.value = k
        inputValue.value = v
      } else {
        select.value = props.list[0].value
        inputValue.value = ''
      }
    }

    const onSearch = () => {
      if (select.value === '') {
        ElMessage.warning('请选择筛选项')
        return
      }
      const query = {}
      query[select.value] = inputValue.value || null
      if (lastSelect.value) {
        query[lastSelect.value] = null
      }
      updateRouteQuery(route, router, query)
    }

    watch(select, (n, o) => {
      console.log('change', n, o)
      if (!o) return
      lastSelect.value = o
      inputValue.value = ''
      onSearch()
    })
    watch(() => route.query, n => {
      if (n[select.value] === undefined) {
        inputValue.value = ''
      }
    })

    onMounted(() => {
      nextTick(() => {
        initData()
      })
    })

    return {
      lastSelect,
      select,
      inputValue,
      onSearch,
    }
  },
}
</script>
