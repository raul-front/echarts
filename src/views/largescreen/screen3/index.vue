<template>
  <div class="large-screen-3">
    <header id="header">
      <h1>数据可视化-ECharts</h1>
    </header>

    <section class="mainbox">
      <div class="column">
        <div class="panel panel1">
          <h2 class="panel-title">饼图</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart1Ref" :resize="resizeFlag" v-loading="panelLoading.panel1"></base-chart2>
          </div>
        </div>
        <div class="panel panel2">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart2Ref" :resize="resizeFlag" v-loading="panelLoading.panel2"></base-chart2>
          </div>
        </div>
        <div class="panel panel3">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart3Ref" :resize="resizeFlag" v-loading="panelLoading.panel3"></base-chart2>
          </div>
        </div>
      </div>
      <div class="column">
        <!-- 地图模块 -->
        <div class="panel panel4">
          <div class="panel4-top"></div>
          <div class="panel-container">
            <chart-map class="chart" :resize="resizeFlag"></chart-map>
          </div>
        </div>
        <div class="panel panel5">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart5Ref" :resize="resizeFlag" v-loading="panelLoading.panel5"></base-chart2>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="panel panel6">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart6Ref" :resize="resizeFlag" v-loading="panelLoading.panel6"></base-chart2>
            <div class="label-wrap">
              <div class="item">
                <h1 class="title">
                  超载上路统计(次)
                </h1>
                <h2 class="num">
                  <span class="num-current">234</span>
                  <span class="num-all">/567</span>
                </h2>
              </div>
              <div class="item">
                <h1 class="title">
                  未盖篷布统计(次)
                </h1>
                <h2 class="num">
                  <span class="num-current">222</span
                  ><span class="num-all">/333</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel7">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart7Ref" :resize="resizeFlag" v-loading="panelLoading.panel7"></base-chart2>
          </div>
        </div>
        <div class="panel panel8">
          <h2 class="panel-title">柱形图-人员变化</h2>
          <div class="panel-container">
            <base-chart2 class="chart" ref="chart8Ref" :resize="resizeFlag" v-loading="panelLoading.panel8"></base-chart2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import '@/libs/flexible.js'
import _ from 'lodash'
import { getChart1Option, getChart2Option, getChart3Option, getChart5Option, getChart6Option, getChart7Option, getChart8Option } from './chart.js'
import { sleep } from 'lisa/utils/func.js'
import 'echarts-liquidfill'
import ChartMap from './ChartMap.vue'

export default {
  props: {},
  components: {
    ChartMap,
  },
  setup (props, { emit }) {
    const resizeFlag = ref(0)
    const panelLoading = reactive({
      panel1: false,
      panel2: false,
      panel3: false,
      panel5: false,
      panel6: false,
      panel7: false,
      panel8: false,
    })

    const resizeHandle = _.throttle(function (e) {
      renderChart6()
      resizeFlag.value++
    }, 100)

    const initChart = () => {
      initChart1()
      initChart2()
      initChart3()
      initChart5()
      initChart6()
      initChart7()
      initChart8()
    }

    const chart1Ref = ref(null)
    const initChart1 = () => {
      const initOption = getChart1Option()
      chart1Ref.value.methodInitChart(initOption)
    }
    const getCard1Data = async () => {
      panelLoading.panel1 = true
      await sleep(200)
      panelLoading.panel1 = false
      const data = [
        { value: 435, name: '已处理事件' },
        { value: 516, name: '越界事件总计' },
        { value: 746, name: '已开采总量' },
        { value: 978, name: '可开采总量' },
      ]
      const dataOption = {
        legend: {
          data: data.map(x => x.name).reverse(),
          formatter: function (name) {
            const value = data.find(x => x.name === name).value || 0
            return '{a|' + name + '}{b|' + value + '}'
          },
        },
        series: [
          {
            data: data,
          },
        ],
      }
      chart1Ref.value.methodDrawChart(dataOption)
    }

    const chart2Ref = ref(null)
    const initChart2 = () => {
      const initOption = getChart2Option()
      chart2Ref.value.methodInitChart(initOption)
    }
    const getCard2Data = async () => {
      panelLoading.panel2 = true
      await sleep(200)
      panelLoading.panel2 = false
      const data = [
        { value: 435, name: '已处理事件' },
        { value: 516, name: '越界事件总计' },
        { value: 746, name: '已开采总量' },
        { value: 978, name: '可开采总量' },
      ]
      const dataOption = {
        legend: {
          data: data.map(x => x.name).reverse(),
          formatter: function (name) {
            const value = data.find(x => x.name === name).value || 0
            return '{a|' + name + '}{b|' + value + '}'
          },
        },
        series: [
          {
            data: data,
          },
        ],
      }
      chart2Ref.value.methodDrawChart(dataOption)
    }

    const chart3Ref = ref(null)
    const initChart3 = () => {
      const initOption = getChart3Option()
      chart3Ref.value.methodInitChart(initOption)
    }
    const getCard3Data = async () => {
      panelLoading.panel3 = true
      await sleep(200)
      panelLoading.panel3 = false
      const data = [
        { value: 435, name: '已处理事件' },
        { value: 516, name: '越界事件总计' },
        { value: 746, name: '已开采总量' },
        { value: 978, name: '可开采总量' },
      ]
      const dataOption = {
        legend: {
          data: data.map(x => x.name).reverse(),
          formatter: function (name) {
            const value = data.find(x => x.name === name).value || 0
            return '{a|' + name + '}{b|' + value + '}'
          },
        },
        series: [
          {
            data: data,
          },
        ],
      }
      chart3Ref.value.methodDrawChart(dataOption)
    }

    const chart5Ref = ref(null)
    const initChart5 = () => {
      const initOption = getChart5Option()
      chart5Ref.value.methodInitChart(initOption)
    }
    const getCard5Data = async () => {
      panelLoading.panel5 = true
      await sleep(500)
      panelLoading.panel5 = false

      const data = [
        { name: 'PM2.5', value: [8.2, 10, 5.5, 8.3, 9.7, 8.4, 6.5] },
        { name: 'TSP', value: [5.6, 3.2, 3.9, 2.1, 3.5, 5.7, 4.3] },
        { name: 'PM10', value: [3.7, 5.9, 7.8, 7.1, 7.9, 3.6, 10.1] },
      ]

      const dataOption = {
        legend: {
          data: data.map(x => x.name),
        },
        xAxis: [
          {
            data: ['5/25', '5/26', '5/27', '5/28', '5/29', '5/30', '5/31'],
          },
        ],
        series: data.map(x => {
          return {
            data: x.value,
          }
        }),
      }
      chart5Ref.value.methodDrawChart(dataOption)
    }

    const chart6Ref = ref(null)
    const initChart6 = () => {
      const initOption = getChart6Option()
      chart6Ref.value.methodInitChart(initOption)
      renderChart6()
    }
    const getCard6Data = async () => {
      panelLoading.panel6 = true
      await sleep(600)
      panelLoading.panel6 = false
      const data = [
        { all: 567, current: 130, percent: 23 },
        { all: 567, current: 317, percent: 30 },
      ]
      const dataOption = {
        series: data.map(x => {
          return {
            name: x.percent + '%',
            data: [x.percent / 100],
          }
        }),
      }
      chart6Ref.value.methodDrawChart(dataOption)
    }
    // 大小改变时，重新绘制
    const renderChart6 = () => {
      // 原尺寸是在宽度为 460 的设计稿上开发的
      const width = chart6Ref.value.$el.offsetWidth
      const bili = width / 460
      const arr = [1, 2]
      //  center: [77 + 78, x === 1 ? 31 + 78 : 31 + 78 + 40 + 156],
      // radius: 156,
      const renderOption = {
        series: arr.map(x => {
          return {
            center: [(77 + 78) * bili, x === 1 ? (31 + 78) * bili : (31 + 78 + 40 + 156) * bili],
            radius: 156 * bili,
          }
        }),
      }
      chart6Ref.value.methodDrawChart(renderOption)
      // chart6Ref.value.methodResize()
    }

    const chart7Ref = ref(null)
    const initChart7 = () => {
      const initOption = getChart7Option()
      chart7Ref.value.methodInitChart(initOption)
    }
    const getCard7Data = async () => {
      panelLoading.panel7 = true
      await sleep(700)
      panelLoading.panel7 = false
      const data = [
        { value: 435, name: '已处理事件' },
        { value: 516, name: '越界事件总计' },
        { value: 746, name: '已开采总量' },
        { value: 978, name: '可开采总量' },
      ]
      const dataOption = {
        legend: {
          data: data.map(x => x.name).reverse(),
          formatter: function (name) {
            const value = data.find(x => x.name === name).value || 0
            return '{a|' + name + '}{b|' + value + '}'
          },
        },
        series: [
          {
            data: data,
          },
        ],
      }
      chart7Ref.value.methodDrawChart(dataOption)
    }

    const chart8Ref = ref(null)
    const initChart8 = () => {
      const initOption = getChart8Option()
      chart8Ref.value.methodInitChart(initOption)
    }
    const getCard8Data = async () => {
      panelLoading.panel8 = true
      await sleep(800)
      panelLoading.panel8 = false
      const data = [
        { value: 435, name: '已处理事件' },
        { value: 516, name: '越界事件总计' },
        { value: 746, name: '已开采总量' },
        { value: 978, name: '可开采总量' },
      ]
      const dataOption = {
        legend: {
          data: data.map(x => x.name).reverse(),
          formatter: function (name) {
            const value = data.find(x => x.name === name).value || 0
            return '{a|' + name + '}{b|' + value + '}'
          },
        },
        series: [
          {
            data: data,
          },
        ],
      }
      chart8Ref.value.methodDrawChart(dataOption)
    }

    const getData = () => {
      getCard1Data()
      getCard2Data()
      getCard3Data()
      getCard5Data()
      getCard6Data()
      getCard7Data()
      getCard8Data()
    }
    onMounted(() => {
      initChart()
      getData()
      window.addEventListener('resize', resizeHandle)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandle)
    })

    return {
      chart1Ref,
      chart2Ref,
      chart3Ref,
      chart5Ref,
      chart6Ref,
      chart7Ref,
      chart8Ref,
      resizeFlag,
      panelLoading,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>
