<template>
  <div class="base-chart" ref="baseChartRef"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

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

    const initChart = () => {
      const dom = baseChartRef.value
      echarts.init(dom).setOption({}) // 第一次需要初始化
      chartInstance = echarts.getInstanceByDom(dom)
    }

    // 暴露给使用者
    const methodDrawChart = (option) => {
      if (!chartInstance) {
        initChart()
      } else {
        chartInstance.clear()
      }
      chartInstance.setOption(option)
    }
    const methodShowLoading = () => {
      if (!chartInstance) {
        initChart()
      }
      chartInstance.showLoading('default', { color: '#74BCFF' })
    }
    const methodHideLoading = () => {
      chartInstance && chartInstance.hideLoading()
    }

    watch(() => props.resize, () => {
      _resize()
    })
    const _resize = () => {
      chartInstance && chartInstance.resize()
    }

    return {
      baseChartRef,
      methodDrawChart,
      methodShowLoading,
      methodHideLoading,
    }
  },
}
</script>
