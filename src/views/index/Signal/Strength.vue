<template>
  <div id='Strength' style='width: 225px; height: 225px'></div>
</template>
<script>
export default {
  name: 'page',
  mounted () {
    this.getAccessSuccess()
  },
  methods: {
    getAccessSuccess () {
      this.$echarts.init(document.getElementById('Strength')).setOption({
        series: [
          {
            type: 'gauge',
            radius: '55%', // 大小
            center: ['50%', '45%'], // 显示位置
            startAngle: 90,
            endAngle: -270,
            min: 0, // 控制整个圆环数值范围
            max: 100,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              itemStyle: {
                // 边框
                borderWidth: 1,
                // borderColor: '#464646',
                color: '#7DD652' // 进度条颜色
              }
            },
            axisLine: {
              lineStyle: {
                width: 7, // 宽度
                color: [[1, '#fff']] // 圆环背景颜色
              }
            },
            splitLine: {
              show: false // 刻度
            },
            axisTick: {
              show: false // 小刻度
            },
            axisLabel: {
              show: false // 刻度值
            },
            data: [
              {
                value: 81,
                name: '信号强度达标率',
                title: {
                  offsetCenter: ['0%', '150%'] // 标题显示位置
                },
                detail: {
                  offsetCenter: ['0%', '0%'] // 数值显示位置
                }
              }
            ],
            title: {
              // 标题样式
              fontSize: 16,
              color: '#fff'
            },
            detail: {
              // 数值样式
              fontSize: 24,
              color: 'auto',
              borderColor: 'auto',
              formatter: '{value}%',
              color: '#fff',
              valueAnimation: true // 数值动态渲染
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
