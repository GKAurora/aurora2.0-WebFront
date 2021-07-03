<template>
  <div id='Dashboard' style='width: 100%; height: 300px;'></div>
</template>
<script>
export default {
  name: 'page',
  mounted () {
    this.getDash()
  },
  methods: {
    getDash () {
      this.$echarts.init(document.getElementById('Dashboard')).setOption({
        title: {
          text: 'CPU利用率',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: 'center'
        },

        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            axisLine: {
              lineStyle: {
                width: 15, // 宽度
                color: [
                  // 颜色区域划分
                  [0.3, 'darkseagreen'],
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
              distance: -20, // 刻度位置
              length: 0,
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            splitLine: {
              distance: -10, // 刻度值位置
              length: 0,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            axisLabel: {
              color: 'auto', // 刻度值位置
              distance: -10,
              fontSize: 14
            },
            detail: {
              fontSize: 25,
              valueAnimation: true,
              formatter: '{value} %',
              color: 'auto'
            },
            data: [
              {
                value: 40
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#Dashboard {
  margin: 0 auto;
  overflow: hidden;
}
</style>
