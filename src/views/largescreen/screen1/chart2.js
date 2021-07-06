import * as echarts from 'echarts'

export const getChart1Option = () => {
  return {
    color: ['#2f89cf'],
    tooltip: {
      trigger: 'axis', // 触发类型 item | axis | none
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    // 修改图表的大小
    grid: {
      left: '0%',
      top: '10px',
      right: '0%',
      bottom: '4%',
      containLabel: true, // 包含刻度文字在内
    },
    xAxis: [
      {
        type: 'category',
        // 刻度线
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: 'rgba(255,255,255,.6) ',
          fontSize: '12',
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // 修改刻度标签 相关样式
        axisLabel: {
          color: 'rgba(255,255,255,.6) ',
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            // type: "solid"
            color: 'rgba(255,255,255,.1)',
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: '35%',
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
  }
}

export const getChart2Option = () => {
  return {
    // 通过这个color修改两条线的颜色
    color: ['#00f2f1', '#ed3f35'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // data: ['新增粉丝', '新增游客'],
      // 修改图例组件 文字颜色
      textStyle: {
        color: '#4c9bfd',
      },
      // 这个10% 必须加引号
      right: '10%',
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
      containLabel: true, // 包含刻度文字在内
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a', // 分割线颜色
        },
      },
    },
    series: [
      {
        name: '新增粉丝',
        type: 'line',
        smooth: true, // true 可以让我们的折线显示带有弧度
      },
      {
        name: '新增游客',
        type: 'line',
        smooth: true,
      },
    ],
  }
}

export const getChart3Option = () => {
  return {
    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },

    legend: {
      bottom: '0%',
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        // 这个radius可以修改饼形图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径
        radius: ['40%', '60%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        // 图形上的文字
        label: {
          show: false,
          position: 'center',
        },
        // 链接文字和图形的线是否显示
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  }
}

export const getChart4Option = () => {
  const myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
  return {
    grid: {
      top: '10%',
      left: '22%',
      bottom: '10%',
      // containLabel: true
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false,
    },
    yAxis: [
      // 有两个坐标轴重叠来完成效果
      {
        type: 'category',
        inverse: true,
        data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff',
        },
      },
      {
        data: [],
        inverse: true, // 反向
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0, // 使用第一个坐标轴
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function (params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex]
          },
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        // 柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: true,
          position: 'inside',
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: '{c}%',
        },
      },
      {
        name: '框',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1, // 使用第二个坐标轴
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15,
        },
      },
    ],
  }
}

export const getChart5Option = () => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '0%',
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },

    grid: {
      left: '10',
      top: '30',
      right: '10',
      bottom: '10',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        // 坐标轴两边留白策略。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
        boundaryGap: false,
        // x轴更换数据
        data: [],
        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
        },
        // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
        },
        // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        smooth: true,
        // 单独修改当前线条的样式
        lineStyle: {
          color: '#0184d5',
          width: '2',
        },
        // 填充颜色设置
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)', // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
              },
            ],
            false,
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
        // 设置拐点
        symbol: 'circle',
        // 拐点大小
        symbolSize: 8,
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: '#0184d5',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12,
        },
        data: [],
      },
      {
        name: '联盟广告',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#00d887',
            width: 2,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0, 216, 135, 0.4)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(0, 216, 135, 0.1)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
        // 设置拐点 小圆点
        symbol: 'circle',
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: '#00d887',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12,
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
      },
    ],
  }
}

export const getChart6Option = () => {
  return {
    color: [
      '#006cff',
      '#60cda0',
      '#ed8884',
      '#ff9f7f',
      '#0096ff',
      '#9fe6b8',
      '#32c5e9',
      '#1d9dff',
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      bottom: '0%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },
    series: [
      {
        name: '地区分布',
        type: 'pie',
        radius: ['10%', '70%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        // 图形的文字标签
        label: {
          fontSize: 10,
        },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 6,
          // length2 链接文字的线条
          length2: 8,
        },
      },
    ],
  }
}
