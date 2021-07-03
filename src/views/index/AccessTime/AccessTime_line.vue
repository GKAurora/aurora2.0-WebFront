<template>
  <div id='AccessTime_line' style='width: 100%; height: 250px'></div>
</template>
<script>
var data = [
  ['00:00', 86],
  ['01:00', 85],
  ['02:00', 68],
  ['03:00', 86],
  ['04:00', 73],
  ['05:00', 85],
  ['06:00', 73],
  ['07:00', 68]
]

var dateList = data.map(function (item) {
  return item[0]
})
var valueList = data.map(function (item) {
  return item[1]
})

export default {
  name: 'page',
  mounted () {
    this.getAccessSuccess()
  },
  methods: {
    getAccessSuccess () {
      this.$echarts.init(document.getElementById('AccessTime_line')).setOption({
        // Make gradient line here
        visualMap: [
          {
            show: false, // 颜色栏
            type: 'continuous', // 连续型
            seriesIndex: 0, // 渐变
            min: 0, // 最小值
            max: 400, // 最大值
            range: [0, 400],
            color: ['rgba(213,72,120,0.7)'] // 线颜色
            // color: ['orangered','yellow','lightskyblue']  //线颜色渐变
          }
        ],
        tooltip: {
          trigger: 'axis'

        },
        title: [
          {
            left: '8%',
            text: '接入耗时',
            textStyle: {
              color: '#fff'
            }
          }
        ],
        toolbox: {
          feature: {
            saveAsImage: {}, // 这样子就具备了下载图片功能
            dataZoom: {}, // 区域缩放
            magicType: {
              // 多种图表切换
              type: ['bar', 'line']
            }
          }
        },
        xAxis: [
          {
            data: dateList,
            boundaryGap:false     //第一个值紧挨在Y轴，默认是与Y轴有距离的
          }
          
        ],
        yAxis: [{}],
        grid: [
          {
            show: true,
            bottom: '20%', // 大小
            height: 'auto',
            width: 'auto',
            // backgroundColor: "#AFC5F7",
            borderColor: '#ccc'
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false, // 是否显示节点
            data: valueList,
            smooth: true, // 是否平滑
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(221,96,115,0.8)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(221,96,115,0.2)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            } // 区域颜色
          }
        ]
      })
    }
  }
}
</script>
