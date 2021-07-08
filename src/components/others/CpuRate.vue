<template>
  <div id='CpuRate' style='width: 300px; height: 300px;'></div>
</template>
<script>
export default {
  name: 'page',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      CpuRate: null
    }
  },
  mounted () {
    this.getDash()
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.CpuRate.resize()
      })
    })
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.getDash()
      }
    }
  },
  methods: {
    getDash () {
      this.CpuRate = this.$echarts.init(document.getElementById('CpuRate'))
      this.CpuRate.setOption({
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
                width: 18, // 宽度
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
                color: ''
              }
            },
            axisTick: {
              distance: -20, // 刻度位置
              length: 0,
              lineStyle: {
                color: '#999',
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
                value: this.value || 0
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
#CpuRate {
  margin: 0 auto;
  overflow: hidden;
}
</style>
