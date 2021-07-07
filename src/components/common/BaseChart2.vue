<template>
  <div class="base-chart" ref="baseChartRef"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import echarts from 'echarts'

export default {
  props: {
    resize: Number,
  },
  setup (props, { emit }) {
    let chartInstance = null
    const baseChartRef = ref(null)

    onMounted(() => {
    })
    onUnmounted(() => {
      chartInstance && chartInstance.dispose()
    })

    // 暴露给使用者
    const methodInitChart = (option) => {
      const dom = baseChartRef.value
      echarts.init(dom)
      chartInstance = echarts.getInstanceByDom(dom)
      chartInstance.setOption(option)
    }
    const methodDrawChart = (option) => {
      // chartInstance && chartInstance.clear() // 千万不能clear
      chartInstance && chartInstance.setOption(option)
    }
    const methodShowLoading = () => {
      chartInstance && chartInstance.showLoading('default', { color: '#74BCFF' })
    }
    const methodHideLoading = () => {
      chartInstance && chartInstance.hideLoading()
    }

    watch(() => props.resize, () => {
      methodResize()
    })
    const methodResize = () => {
      chartInstance && chartInstance.resize()
    }

    return {
      baseChartRef,
      methodInitChart,
      methodDrawChart,
      methodShowLoading,
      methodHideLoading,
      methodResize,
    }
  },
}
</script>
