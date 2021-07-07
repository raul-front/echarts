<template>
  <div class="chart-map">
    <div class="chart" id="chartMap" ref="mapChartRef"></div>
    <div class="status-wrap">
        <div class="item">
            <span class="icon"></span><span class="label">运行状态</span>
        </div>
        <div class="item">
            <span class="icon"></span><span class="label">离线状态</span>
        </div>
        <div class="item">
            <span class="icon"></span><span class="label">异常状态</span>
        </div>
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted, onUnmounted } from 'vue'
import echarts from 'echarts'
export default {
  props: {
    resize: Number,
  },
  setup (props) {
    let chartInstance = null
    const mapChartRef = ref(null)

    watch(() => props.resize, () => {
      _resize()
    })
    const _resize = () => {
      chartInstance && chartInstance.resize()
    }

    const initChart = async () => {
      const data = await fetch('echarts/data/yushui.json').then(res => res.json())
      console.log('yushui ', data)
      const dom = mapChartRef.value
      const mapName = 'yushuiqu'
      echarts.registerMap(mapName, data)
      echarts.init(dom) // 第一次需要初始化
      chartInstance = echarts.getInstanceByDom(dom)
      drawChart(mapName)
    }
    const drawChart = (mapName) => {
      if (!chartInstance) {
        initChart()
      } else {
        chartInstance.clear()
      }

      chartInstance.setOption({
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        geo: [
          // 阴影
          {
            map: mapName,
            silent: true, // 禁用鼠标事件，鼠标移上后不起作用
            type: 'map',
            zoom: 0.65,
            zlevel: 1,
            layoutCenter: ['50%', '50%'],
            layoutSize: '140%',
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            roam: false, // 是否缩放
            itemStyle: {
              normal: {
                areaColor: '#6caddb',
                borderWidth: 0,
              },
            },
          },
          // 地图
          {
            map: mapName,
            type: 'map',
            zlevel: 2,
            zoom: 0.65,
            layoutCenter: ['50%', '48%'],
            layoutSize: '140%',
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#74BCFF',
                },
              },
              emphasis: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            tooltip: {
              show: true,
            },
            roam: false, // 是否缩放

            itemStyle: {
              normal: {
                areaColor: '#071941',
                borderColor: '#5bd0fa',
                borderWidth: 1,
                // shadowColor: '#6caddb',
                // shadowOffsetX: 0,
                // shadowOffsetY: 1,
                // shadowBlur: 1,
              },
              emphasis: {
                areaColor: '#5bd3ff',
              },
            },
          },
        ],
        series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          zlevel: 3,
          rippleEffect: { // 涟漪特效
            period: 4, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 4, // 波纹圆环最大限制，值越大波纹越大
          },
          itemStyle: {
            normal: {
              color: (item) => {
                return item.data.color
              },
            },
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 10 + val[2] / 15 // 圆环大小
          },
          label: {
            normal: {
              show: false,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              formatter: function (params) { // 圆环显示文字
                return params.data.name
              },
              padding: 10,
              backgroundColor: '#fff',
              color: '#000',
              fontSize: 19,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: 'A矿区', value: [115.01497, 27.822526, 28], color: '#74FDFF' },
            { name: 'B矿区', value: [115.08497, 27.922526, 99], color: '#124F87' },
            { name: 'C矿区', value: [114.84497, 27.872526, 99], color: '#FE6376' },
          ],
        }],
      })
      chartInstance.on('click', function (item) {
        console.log('item', item)
      })
    }

    onMounted(() => {
      initChart()
    })
    onUnmounted(() => {
      chartInstance && chartInstance.dispose()
    })

    return {
      mapChartRef,
    }
  },
}
</script>
<style lang="scss">
.chart-map{
  position: relative;
  .chart{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .status-wrap{
    position: absolute;
    right: 10px;
    bottom: 20px;
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .item{
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      margin-right: 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
      &:nth-child(1){
        color: #74FDFF;
        .icon{
          background: #74FDFF;
        }
      }
      &:nth-child(2){
        color: #124F87;
        .icon{
          background: #124F87;
        }
      }
      &:nth-child(3){
        color: #FE6376;
        .icon{
          background: #FE6376;
        }
      }
    }
  }
}
</style>
