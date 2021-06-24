<template>
  <div class="large-screen-1">
    <header id="header">
      <h1>数据可视化-ECharts</h1>
      <div class="show-time">
        当前时间: {{time}}
      </div>
    </header>

    <section class="mainbox">
      <div class="column">
        <div class="panel">
          <h2>柱形图-就业行业</h2>
          <base-chart class="chart" ref="chart1Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel panel2">
          <h2>
            折线图-人员变化
            <span @click="changeChart2(0)">2020</span>
            <span @click="changeChart2(1)">2021</span>
          </h2>
          <base-chart class="chart" ref="chart2Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-年龄分布</h2>
          <base-chart class="chart" ref="chart3Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <ul class="no-hd">
            <li>125811</li>
            <li>100000</li>
          </ul>
          <ul class="no-bd">
            <li>前端需求人数</li>
            <li>市场供应人数</li>
          </ul>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <chart-map class="chart" :resize="resizeFlag"></chart-map>
        </div>
      </div>
      <div class="column">
        <div class="panel bar2">
          <h2>柱形图-就业行业</h2>
          <base-chart class="chart" ref="chart4Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>折线图-播放量</h2>
          <base-chart class="chart" ref="chart5Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
          <h2>饼形图-地区分布</h2>
          <base-chart class="chart" ref="chart6Ref" :resize="resizeFlag"></base-chart>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import '@/libs/flexible.js'
import _ from 'lodash'
import { getChart1Option, getChart2Option, getChart3Option, getChart4Option, getChart5Option, getChart6Option } from './chart.js'
import ChartMap from './ChartMap.vue'

export default {
  props: {},
  components: {
    ChartMap,
  },
  setup (props, { emit }) {
    const time = ref('')
    let timer = null
    const resizeFlag = ref(0)

    const resizeHandle = _.throttle(function (e) {
    }, 100)

    const formatNumber = (n) => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    const setTime = () => {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDay()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      time.value = `${year}年${formatNumber(month)}月${formatNumber(day)}日 - ${formatNumber(h)}时${formatNumber(m)}分${formatNumber(s)}秒`
    }
    const initTime = () => {
      timer = setInterval(() => {
        setTime()
      }, 1000)
    }

    const getData = () => {
      getCard1Data()
      getCard2Data()
      getCard3Data()
      getCard4Data()
      getCard5Data()
      getCard6Data()
    }

    const chart1Ref = ref(null)
    const getCard1Data = () => {
      const data = []
      const option = getChart1Option(data)
      chart1Ref.value.methodDrawChart(option)
    }

    const chart2Data = [
      {
        year: '2020', // 年份
        data: [
          // 两个数组是因为有两条线
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        ],
      },
      {
        year: '2021', // 年份
        data: [
          // 两个数组是因为有两条线
          [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
          [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
        ],
      },
    ]
    const chart2Ref = ref(null)
    const getCard2Data = () => {
      const option = getChart2Option(chart2Data[0])
      chart2Ref.value.methodDrawChart(option)
    }
    const changeChart2 = (index) => {
      const option = getChart2Option(chart2Data[index])
      chart2Ref.value.methodDrawChart(option)
    }

    const chart3Ref = ref(null)
    const getCard3Data = () => {
      const data = []
      const option = getChart3Option(data)
      chart3Ref.value.methodDrawChart(option)
    }

    const chart4Ref = ref(null)
    const getCard4Data = () => {
      const data = []
      const option = getChart4Option(data)
      chart4Ref.value.methodDrawChart(option)
    }

    const chart5Ref = ref(null)
    const getCard5Data = () => {
      const data = []
      const option = getChart5Option(data)
      chart5Ref.value.methodDrawChart(option)
    }

    const chart6Ref = ref(null)
    const getCard6Data = () => {
      const data = []
      const option = getChart6Option(data)
      chart6Ref.value.methodDrawChart(option)
    }

    onMounted(() => {
      setTime()
      initTime()
      getData()
      window.addEventListener('resize', resizeHandle())
    })
    onUnmounted(() => {
      clearInterval(timer)
      window.removeEventListener('resize', resizeHandle())
    })

    return {
      chart1Ref,
      chart2Ref,
      chart3Ref,
      chart4Ref,
      chart5Ref,
      chart6Ref,
      time,
      resizeFlag,
      changeChart2,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>
