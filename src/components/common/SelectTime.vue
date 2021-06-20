<template>
  <el-date-picker
    v-model="selected"
    type="datetime"
    placeholder="选择时间"
    :disabled-date="disabledDate"
    @change="changeHandle">
  </el-date-picker>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { updateRouteQuery, format } from 'utils/func'

export default {
  props: {
    value: [String, null],
    queryKey: {
      type: String,
      default: 'time',
    },
    isQuery: { // 列表页使用
      type: Boolean,
      default: true,
    },
    allowAfter: { // 时候允许选择之后的年份
      type: Boolean,
      default: true,
    },
  },
  setup (props, { emit }) {
    const route = useRoute()
    const router = useRouter()

    const selected = ref(null)
    const disabledDate = (time) => {
      if (!props.allowAfter) {
        return time.getTime() > Date.now()
      }
      return false
    }

    watch(() => route.query, n => {
      if (props.isQuery) {
        // query中是时间戳，要转成需要的格式
        const time = format('second', n[props.queryKey]) || null
        if (time !== selected.value) {
          selected.value = time || null
        }
      }
    })
    watch(() => props.value, n => {
      // 如果input事件中转了格式，这里比较时需要转格式的
      if (n !== selected.value) {
        selected.value = n
      }
    }, { immediate: true })

    const changeHandle = (val) => {
      if (props.isQuery) {
        // 清空时，值为null，不用处理
        const query = {}
        // element-plus 的 value-format 不支持时间戳，需要自己转
        query[props.queryKey] = format('timestamp', val) || null
        updateRouteQuery(route, router, query)
      } else {
        // 普通下拉框数据绑定
        // 可以根据需求转成接口需要的格式
        emit('input', val)
        emit('change', val)
      }
    }

    onMounted(() => {
      if (props.isQuery) {
        nextTick(() => {
          const query = route.query
          if (query && query.time) {
            selected.value = query.time
          } else {
            selected.value = null
          }
        })
      }
    })

    return {
      selected,
      disabledDate,
      changeHandle,
    }
  },
}
</script>
