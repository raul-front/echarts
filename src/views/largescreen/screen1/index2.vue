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
          <base-chart2 class="chart" ref="chart1Ref" :resize="resizeFlag"></base-chart2>
          <div class="panel-footer"></div>
        </div>
        <div class="panel panel2">
          <h2>
            折线图-人员变化
            <span @click="changeChart2(0)">2020</span>
            <span @click="changeChart2(1)">2021</span>
          </h2>
          <base-chart2 class="chart" ref="chart2Ref" :resize="resizeFlag"></base-chart2>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-年龄分布</h2>
          <base-chart2 class="chart" ref="chart3Ref" :resize="resizeFlag"></base-chart2>
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
          <base-chart2 class="chart" ref="chart4Ref" :resize="resizeFlag"></base-chart2>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>折线图-播放量</h2>
          <base-chart2 class="chart" ref="chart5Ref" :resize="resizeFlag"></base-chart2>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
          <h2>饼形图-地区分布</h2>
          <base-chart2 class="chart" ref="chart6Ref" :resize="resizeFlag"></base-chart2>
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
import { getChart1Option, getChart2Option, getChart3Option, getChart4Option, getChart5Option, getChart6Option } from './chart2.js'
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

    const initChart = () => {
      initChart1()
      initChart2()
      initChart3()
      initChart4()
      initChart5()
      initChart6()
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
    const initChart1 = () => {
      const initOption = getChart1Option()
      chart1Ref.value.methodInitChart(initOption)
    }
    const getCard1Data = () => {
      // TODO: getData
      // const data = []
      const dataOption = {
        xAxis: [
          {
            data: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
          },
        ],
        series: [
          {
            data: [200, 300, 300, 900, 1500, 1200, 600],
          },
        ],
      }
      chart1Ref.value.methodDrawChart(dataOption)
    }

    let chart2Data = []
    const chart2Ref = ref(null)
    const initChart2 = () => {
      const initOption = getChart2Option()
      chart2Ref.value.methodInitChart(initOption)
    }
    const getCard2Data = () => {
      chart2Data = [
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
      const dataOption = {
        xAxis: {
          data: ['1月', '2月', '3月 ', '4 月', ' 5月', '6月', '7月', '8月 ', '9月 ', '10 月', '1,1月', '12月'],
        },
      }
      chart2Ref.value.methodDrawChart(dataOption)
      changeChart2(0)
    }
    const changeChart2 = (index) => {
      const data = chart2Data[index].data
      const dataOption = {
        series: [
          { data: data[0] },
          { data: data[1] },
        ],
      }
      chart2Ref.value.methodDrawChart(dataOption)
    }

    const chart3Ref = ref(null)
    const initChart3 = () => {
      const initOption = getChart3Option()
      chart3Ref.value.methodInitChart(initOption)
    }
    const getCard3Data = () => {
      const dataOption = {
        series: [
          {
            data: [
              { value: 1, name: '0岁以下' },
              { value: 4, name: '20-29岁' },
              { value: 2, name: '30-39岁' },
              { value: 2, name: '40-49岁' },
              { value: 1, name: '50岁以上' },
            ],
          },
        ],
      }
      chart3Ref.value.methodDrawChart(dataOption)
    }

    const chart4Ref = ref(null)
    const initChart4 = () => {
      const initOption = getChart4Option()
      chart4Ref.value.methodInitChart(initOption)
    }
    const getCard4Data = () => {
      const dataOption = {
        yAxis: [
          {},
          {
            data: [702, 350, 610, 793, 664],
          },
        ],
        series: [
          {
            data: [70, 34, 60, 78, 69],

          },
          {
            data: [100, 100, 100, 100, 100],
          },
        ],
      }
      chart4Ref.value.methodDrawChart(dataOption)
    }

    const chart5Ref = ref(null)
    const initChart5 = () => {
      const initOption = getChart5Option()
      chart5Ref.value.methodInitChart(initOption)
    }
    const getCard5Data = () => {
      const dataOption = {
        xAxis: [
          {
            data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '26', '28', '29', '30'],
          },
        ],
        series: [
          {
            data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
          },
          {
            data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
          },
        ],
      }
      chart5Ref.value.methodDrawChart(dataOption)
    }

    const chart6Ref = ref(null)
    const initChart6 = () => {
      const initOption = getChart6Option()
      chart6Ref.value.methodInitChart(initOption)
    }
    const getCard6Data = () => {
      const dataOption = {
        series: [
          {
            data: [
              { value: 20, name: '云南' },
              { value: 26, name: '北京' },
              { value: 24, name: '山东' },
              { value: 25, name: '河北' },
              { value: 20, name: '江苏' },
              { value: 25, name: '浙江' },
              { value: 30, name: '四川' },
              { value: 42, name: '湖北' },
            ],
          },
        ],
      }
      chart6Ref.value.methodDrawChart(dataOption)
    }

    onMounted(() => {
      setTime()
      initTime()
      initChart()
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
