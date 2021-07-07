import * as echarts from 'echarts'

const textColor = '#74BCFF'
const lineColor = '#1E7CD3'
const lineLightColor = '#0d3973'

export const getChart1Option = () => {
  return {
    color: ['#74FDFF', '#FFDD74', '#FE6376', '#70DC70'],
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)',
      formatter: function (val) {
        return (
          val.marker + val.name + ': ' + val.value + ' (' + val.percent + '%)'
        )
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#74bcff',
      },
    },
    legend: {
      selectedMode: true, // 是否可选择
      orient: 'vertical', // 垂直显示
      align: 'left', // 图标在左
      y: 'center', // 延Y轴居中
      x: '50%', // 居右显示
      itemGap: 15, // 间距
      itemHeight: 15,
      itemWidth: 15,
      icon:
        'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            width: 95,
            // 标题间距
          },
          b: {
            fontSize: 16,
          },
        },
      },
      // formatter: function (name) {
      //   const value = data.find(x => x.name === name).value || 0
      //   return '{a|' + name + '}{b|' + value + '}'
      // },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['25%', '50%'],
        clockwise: false,
        roseType: 'radius',
        label: {
          show: false,
        },
      },
    ],
  }
}

export const getChart2Option = () => {
  return {
    color: ['#74FDFF', '#FFDD74', '#FE6376', '#70DC70'],
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)',
      formatter: function (val) {
        return (
          val.marker + val.name + ': ' + val.value + ' (' + val.percent + '%)'
        )
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#74bcff',
      },
    },
    legend: {
      selectedMode: true, // 是否可选择
      orient: 'vertical', // 垂直显示
      align: 'left', // 图标在左
      y: 'center', // 延Y轴居中
      x: '50%', // 居右显示
      itemGap: 15, // 间距
      itemHeight: 15,
      itemWidth: 15,
      icon:
        'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            width: 95,
            // 标题间距
          },
          b: {
            fontSize: 16,
          },
        },
      },
      // formatter: function (name) {
      //   const value = data.find(x => x.name === name).value || 0
      //   return '{a|' + name + '}{b|' + value + '}'
      // },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['25%', '50%'],
        clockwise: false,
        roseType: 'radius',
        label: {
          show: false,
        },
      },
    ],
  }
}

export const getChart3Option = () => {
  return {
    color: ['#74FDFF', '#FFDD74', '#FE6376', '#70DC70'],
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)',
      formatter: function (val) {
        return (
          val.marker + val.name + ': ' + val.value + ' (' + val.percent + '%)'
        )
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#74bcff',
      },
    },
    legend: {
      selectedMode: true, // 是否可选择
      orient: 'vertical', // 垂直显示
      align: 'left', // 图标在左
      y: 'center', // 延Y轴居中
      x: '50%', // 居右显示
      itemGap: 15, // 间距
      itemHeight: 15,
      itemWidth: 15,
      icon:
        'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            width: 95,
            // 标题间距
          },
          b: {
            fontSize: 16,
          },
        },
      },
      // formatter: function (name) {
      //   const value = data.find(x => x.name === name).value || 0
      //   return '{a|' + name + '}{b|' + value + '}'
      // },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['25%', '50%'],
        clockwise: false,
        roseType: 'radius',
        label: {
          show: false,
        },
      },
    ],
  }
}

export const getChart5Option = () => {
  const data = [
    { name: 'PM2.5', value: [8.2, 10, 5.5, 8.3, 9.7, 8.4, 6.5] },
    { name: 'TSP', value: [5.6, 3.2, 3.9, 2.1, 3.5, 5.7, 4.3] },
    { name: 'PM10', value: [3.7, 5.9, 7.8, 7.1, 7.9, 3.6, 10.1] },
  ]
  const color = ['#74FDFF', '#FE6376', '#FFDD74', '#FE6376']
  const series = data.map((x, i) => {
    if (i < 2) {
      return {
        name: x.name,
        type: 'bar',
        barWidth: 8,
        barGap: '80%', // 间距，值为柱子宽度的百分比
        emphasis: {
          focus: 'series',
        },
      }
    } else {
      return {
        name: x.name,
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        showSymbol: false,
        legendHoverLink: false,
        connectNulls: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: color[2], // 0% 处的颜色
            }, {
              offset: 1, color: 'transparent', // 100% 处的颜色
            }],
          },
        },
      }
    }
  })
  return {
    color: color,
    grid: {
      top: 30,
      left: 30,
      right: 30,
      bottom: 30,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      textStyle: {
        color: '#000',
      },
      axisPointer: { // 坐标轴指示器
        type: 'shadow',
      },
      // 自定义
      // formatter: function (arr) {
      //   if (arr.length) {
      //     let h = arr[0].name + '<br>'
      //     arr.forEach(x => {
      //       if (x.seriesType === 'bar') {
      //         h += x.marker + x.seriesName + ': ' + x.value + '<br>'
      //       }
      //     })
      //     return h
      //   }
      //   return ''
      // },
    },
    legend: {
      data: [],
      right: '30',
      top: '0',
      itemGap: 20, // 间距
      icon: 'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
          },
        },
      },
      formatter: function (name) {
        return '{a|' + name + '}'
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false }, // 隐藏坐标轴刻度
        axisLabel: {
          color: textColor,
          fontSize: 16,
        },
        axisLine: {
          lineStyle: {
            color: lineColor,
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: lineColor,
            width: 1,
            opacity: '0.4',
          },
        },
        axisLine: {
          lineStyle: {
            color: lineColor,
            width: 1,
          },
        },
      },
    ],
    series: series,
  }
}
export const getChart6Option = () => {
  const colors = ['#70F3FF', '#FFDD74']
  const data = [1, 2]
  return {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: false,
    },
    series: data.map((x, i) => {
      return {
        type: 'liquidFill',
        // center: [77 + 78, i === 0 ? 31 + 78 : 31 + 78 + 40 + 156],
        // radius: 156,
        data: [0],
        itemStyle: {
          normal: {
            // 水波颜色
            opacity: 0.4,
            color: colors[i],
          },
        },
        label: {
          normal: {
            textStyle: {
              color: colors[i], // 默认背景下的文字颜色
              insideColor: colors[i], // 水波背景下的文字颜色
              fontWeight: 900,
              fontSize: 35,
            },
          },
        },
        outline: {
          borderDistance: 0, // border向内占据的空间 不是width
          itemStyle: {
            borderWidth: 4,
            borderColor: colors[i],
          },
        },
        backgroundStyle: {
          // 背景
          color: 'transparent',
        },
      }
    }),
  }
}
export const getChart7Option = () => {
  return {
    color: ['#74FDFF', '#FFDD74', '#FE6376', '#70DC70'],
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)',
      formatter: function (val) {
        return (
          val.marker + val.name + ': ' + val.value + ' (' + val.percent + '%)'
        )
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#74bcff',
      },
    },
    legend: {
      selectedMode: true, // 是否可选择
      orient: 'vertical', // 垂直显示
      align: 'left', // 图标在左
      y: 'center', // 延Y轴居中
      x: '50%', // 居右显示
      itemGap: 15, // 间距
      itemHeight: 15,
      itemWidth: 15,
      icon:
        'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            width: 95,
            // 标题间距
          },
          b: {
            fontSize: 16,
          },
        },
      },
      // formatter: function (name) {
      //   const value = data.find(x => x.name === name).value || 0
      //   return '{a|' + name + '}{b|' + value + '}'
      // },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['25%', '50%'],
        clockwise: false,
        roseType: 'radius',
        label: {
          show: false,
        },
      },
    ],
  }
}
export const getChart8Option = () => {
  return {
    color: ['#74FDFF', '#FFDD74', '#FE6376', '#70DC70'],
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)',
      formatter: function (val) {
        return (
          val.marker + val.name + ': ' + val.value + ' (' + val.percent + '%)'
        )
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#74bcff',
      },
    },
    legend: {
      selectedMode: true, // 是否可选择
      orient: 'vertical', // 垂直显示
      align: 'left', // 图标在左
      y: 'center', // 延Y轴居中
      x: '50%', // 居右显示
      itemGap: 15, // 间距
      itemHeight: 15,
      itemWidth: 15,
      icon:
        'path://M511.999354 55.632162c246.639192 0 446.655354 200.016162 446.655354 446.655354 0 246.639192-200.016162 446.654061-446.655354 446.654061-246.639192 0-446.654061-200.016162-446.654061-446.654061C65.345293 255.648323 265.361455 55.632162 511.999354 55.632162L511.999354 55.632162zM511.999354 295.601131c-114.129455 0-206.685091 92.555636-206.685091 206.686384s92.555636 206.685091 206.685091 206.685091c114.129455 0 206.686384-92.555636 206.686384-206.685091S626.130101 295.601131 511.999354 295.601131L511.999354 295.601131zM511.999354 113.168808c-214.866747 0-389.118707 174.25196-389.118707 389.118707S297.132606 891.406222 511.999354 891.406222c214.86804 0 389.118707-174.25196 389.118707-389.118707S726.867394 113.168808 511.999354 113.168808z',
      textStyle: {
        color: textColor,
        fontSize: 14,
        rich: {
          a: {
            fontSize: 14,
            width: 95,
            // 标题间距
          },
          b: {
            fontSize: 16,
          },
        },
      },
      // formatter: function (name) {
      //   const value = data.find(x => x.name === name).value || 0
      //   return '{a|' + name + '}{b|' + value + '}'
      // },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['25%', '50%'],
        clockwise: false,
        roseType: 'radius',
        label: {
          show: false,
        },
      },
    ],
  }
}
