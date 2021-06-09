<template>
  <div id="main" class="test">
  </div>
</template>
<script>
import * as echarts from 'echarts'
var chartDom = document.getElementById('main')
var myChart = echarts.init(chartDom)
var option

option = {
  series: [{
    type: 'gauge',
    axisLine: {
      lineStyle: {
        width: 30,
        color: [
          [0.3, '#67e0e3'],
          [0.7, '#37a2da'],
          [1, '#fd666d']
        ]
      }
    },
    pointer: {
      itemStyle: {
        color: 'auto'
      }
    },
    axisTick: {
      distance: -30,
      length: 8,
      lineStyle: {
        color: '#fff',
        width: 2
      }
    },
    splitLine: {
      distance: -30,
      length: 30,
      lineStyle: {
        color: '#fff',
        width: 4
      }
    },
    axisLabel: {
      color: 'auto',
      distance: 40,
      fontSize: 20
    },
    detail: {
      valueAnimation: true,
      formatter: '{value} km/h',
      color: 'auto'
    },
    data: [{
      value: 70
    }]
  }]
}

setInterval(function () {
  option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
  myChart.setOption(option, true)
}, 2000)

option && myChart.setOption(option)
export default {

}
</script>
<style lang="css" scoped>
.test{
  width: 500px;
  height: 600px;
  border: 1px solid red;
}
</style>
