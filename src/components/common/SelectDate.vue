<template>
  <el-date-picker
    v-model="selected"
    :type="type"
    :placeholder="placeholder"
    :value-format="valueFormat"
    :disabled-date="disabledDate"
    @change="changeHandle">
  </el-date-picker>
</template>

<script>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { updateRouteQuery } from 'utils/func'

const valueFormatData = {
  year: 'YYYY',
  month: 'YYYY-MM',
  date: 'YYYY-MM-DD',
}
const placeholderData = {
  year: '请选择年份',
  month: '请选择月份',
  date: '请选择日期',
}
export default {
  props: {
    value: [String, null],
    // 类型：year(年); month(月); date(日)
    type: {
      type: String,
      default: 'date',
    },
    isQuery: { // 列表页使用
      type: Boolean,
      default: true,
    },
    allowAfter: { // 时候允许选择之后的年份
      type: Boolean,
      default: true,
    },
    allowMin: { // 允许选择的最小日期
      type: [Number, String],
      default: 0,
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
      if (props.allowMin) {
        return time.getTime() < (new Date(props.allowMin))
      }
      return false
    }

    const valueFormat = computed(() => {
      return valueFormatData[props.type]
    })
    const placeholder = computed(() => {
      return placeholderData[props.type]
    })

    watch(() => route.query, n => {
      if (props.isQuery && n[props.type] !== selected.value) {
        selected.value = n[props.type] || null
      }
    })
    watch(() => props.value, n => {
      if (n !== selected.value) {
        selected.value = n
      }
    }, { immediate: true })

    const changeHandle = (val) => {
      if (props.isQuery) {
        // 清空时，值为null，不用处理
        const query = {}
        query[props.type] = val
        updateRouteQuery(route, router, query)
      } else {
        // 普通下拉框数据绑定
        emit('input', val)
        emit('change', val)
      }
    }

    onMounted(() => {
      if (props.isQuery) {
        nextTick(() => {
          const query = route.query
          if (query && query[props.type]) {
            selected.value = query[props.type]
          } else {
            selected.value = null
          }
        })
      }
    })

    return {
      selected,
      placeholder,
      valueFormat,
      disabledDate,
      changeHandle,
    }
  },
}
</script>
