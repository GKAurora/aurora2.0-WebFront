<template>
  <div id="Annular" style='width: 100%; height: 250px'></div>
</template>
<script>
export default {
  data() {
    return {
      annular: null
    }
  },
  mounted () {
    this.getAnnular()
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.annular.resize()
      })
    })
  },
  methods: {
    getAnnular () {
      this.annular = this.$echarts.init(document.getElementById('Annular'))
      this.annular.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical', // 竖直排列
          top: 'auto',
          left: 'auto',
          textStyle: {
            // color: '#fff'
          }
          // icon:'image://https://unsplash.it/100/100?image=1005'    //可以自定义图标
        },
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: ['45%', '75%'],
            avoidLabelOverlap: false,
            selectedMode: 'multiple',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: { // 每块区域的圆滑
              // 阴影
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: { // 圆环中数据
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true, // 是否显示圆环中文字
                fontSize: '16',
                fontWeight: 'bold'
                // color: ''
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 40,
                name: '接入成功数'
              },
              { value: 50, name: '关联成功数' },
              { value: 28, name: '关联失败数' },
              { value: 19, name: '认证成功数' },
              { value: 30, name: '认证失败数' },
              { value: 27, name: 'DHCP 成功数' },
              { value: 42, name: 'DHCP 失败数' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#Annular {
  min-width: 500px;
}
</style>
