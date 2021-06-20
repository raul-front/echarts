<template>
  <el-select class="page-select select-dark" popper-class="select-dark" v-model="value" placeholder="" @change="changeHandle">
    <template v-if="noLabel">
      <el-option v-for="(item, i) in list" :key="i" :label="item" :value="item"></el-option>
    </template>
    <template v-else>
      <el-option v-for="(item, i) in list" :key="i" :label="item.label" :value="item.value"></el-option>
    </template>
  </el-select>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { updateRouteQuery } from 'utils/func'

export default {
  name: 'page-select',
  props: {
    list: Array,
    queryKey: String,
    noLabel: { // list中的item是简单数据类型
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()

    const value = ref('')

    watch(() => route.query, n => {
      if (n[props.queryKey] !== value.value) {
        value.value = n[props.queryKey] || ''
      }
    })

    onMounted(() => {
      nextTick(() => {
        // 从query中初始化数据
        const query = route.query
        if (query && query[props.queryKey]) {
          value.value = query[props.queryKey]
        }
      })
    })

    const changeHandle = (val) => {
      const query = {}
      query[props.queryKey] = val || null
      updateRouteQuery(route, router, query)
    }

    return {
      value,
      changeHandle,
    }
  },
}
</script>
