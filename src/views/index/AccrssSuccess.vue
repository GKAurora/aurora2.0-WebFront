<template>
  <div id='Accrsssuccess' class='Accrss'></div>
</template>
<script>
export default {
  name: 'page',
  mounted () {
    this.getAccrss()
  },
  methods: {
    getAccrss () {
      this.$echarts.init(document.getElementById('Accrsssuccess')).setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          orient: 'vertical',
          left: 'center',
          data: [
            '接入成功率',
            '接入耗时',
            '漫游达标率',
            '信号和干扰',
            '容量健康度',
            '吞吐达标率'
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType: {
              // 多种图表切换
              type: ['bar', 'line']
            }
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['6/20', '6/21', '6/22', '6/23', '6/24', '6/25', '6/26']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '接入成功率',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: [40, 50, 60, 70, 90, 80, 85]
          },
          {
            name: '接入耗时',
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [30, 40, 50, 20, 80, 40, 73]
          },
          {
            name: '漫游达标率',
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [60, 50, 30, 80, 52, 60, 85]
          },
          {
            name: '信号和干扰',
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [57, 60, 89, 40, 60, 39, 85]
          },
          {
            name: '容量健康度',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: [40, 50, 60, 70, 90, 80, 85]
          },
          {
            name: '吞吐达标率',
            smooth: true,
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [40, 50, 60, 70, 90, 80, 85]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.Accrss {
  width: 1400px;
  height: 380px;
}
</style>
