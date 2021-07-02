<template>
<div>
  <div class='maps'>
      <div class='hotPic' id='heatmap'>
        <img src='../../assets/img/about/拓扑.png' alt='' style='width:100%; height: auto'>
      </div>
  </div>
</div>
</template>

<script>
import Heatmap from 'heatmap.js'
import API from '../../api'
export default {
  data () {
    return {
      points: [], // 热力图数据存放数组
      cavWidth: null, // 获取宽度
      cavHeight: null // 获取高度
    }
  },
  methods: {
    // 初始化获取宽高(考虑到后期的适配，获取父级元素的宽高)
    getRectValue () {
      this.cavWidth = document.getElementById('heatmap').clientWidth
      this.cavHeight = document.getElementById('heatmap').clientHeight
      // console.log(this.cavWidth, this.cavHeight)
    },
    // 初始化获取数据
    async initValue () {
      let R = 901 / 1900 // 宽高比例
      try {
        const conf = API.sdn.heatmap()
        const data1 = await this.$axios(conf)
        let datas = data1.data.data
        console.log(datas)
        let x
        let y
        let val
        for (let i = 0; i < datas.length; i++) {
          val = datas[i].count
          x = datas[i].x * R
          y = datas[i].y * R
          // console.log(val,x,y);
          var point = {
            x: x,
            y: y,
            value: val
          }
          this.points.push(point)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 初始化热力图
    initHotPic () {
      this.deleteHotMap()
      let self = this
      var heatmapInstance = Heatmap.create({
        container: document.getElementById('heatmap'),
        gradient: {// 渐变颜色
          '0': 'rgba(255,255,255,1)',
          '0.3': '#82ff6d',
          '0.8': '#f3ff6d',
          '1': '#ff6d6d'
        },
        radius: 15,
        maxOpacity: 1,
        minOpacity: 0,
        blur: 1
      })
      var data = {
        max: 50, // 数据对比(max和min进行数据对比，从而展示热力颜色)
        min: 0,
        data: self.points

      }
      heatmapInstance.setData(data)
    },
    // 删除之前的热力图
    deleteHotMap () {
      var heatmapBox = document.getElementById('heatmap')
      if (heatmapBox.children.length > 1) {
        var oldCanvas = heatmapBox.children[1]
        heatmapBox.removeChild(oldCanvas)
      }
    }
  },
  created () {
    this.initValue()
  },
  mounted () {
    this.getRectValue()
    this.initValue()
    this.initHotPic()
    // this.progressDom = document.getElementsByClassName('progress_list')
    var _this = this
    window.onresize = () => {
      return (() => {
        _this.cavWidth = document.getElementById('heatmap').clientWidth
        _this.cavHeight = document.getElementById('heatmap').clientHeight
      })()
    }
  },
  watch: {
    cavWidth: {
      handler (curVal, oldVal) {
        var _this = this
        _this.cavWidth = curVal
        if (oldVal != 0 && oldVal != null) {
          for (var i = 0; i < this.points.length; i++) {
            this.points[i].x = Number((this.points[i].x * curVal / oldVal).toFixed(0))
          }
          _this.initHotPic()
        }
        // console.log('宽=' + curVal, oldVal)
      }
    },
    cavHeight: {
      handler (curVal, oldVal) {
        var _this = this
        _this.cavHeight = curVal
        if (oldVal != 0 && oldVal != null) {
          for (var i = 0; i < this.points.length; i++) {
            this.points[i].y = Number((this.points[i].y * curVal / oldVal).toFixed(0))
            // console.log(this.points[i].y)
          }
          _this.initHotPic()
        }
        // console.log('高=' + curVal, oldVal)
      }
    }
  }
}
</script>

<style>
.maps{
    display:flex;
    align-items:center;
    justify-content:center;
}
</style>
