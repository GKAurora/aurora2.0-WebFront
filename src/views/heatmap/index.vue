<template>
<div>
  <div class="maps">
      <div class="hotPic" id="heatmap">
        <img src="../../assets/img/about/拓扑.png" alt="" style="width:100%; height: auto">
      </div>
  </div>
</div>
</template>

<script>
import Heatmap from 'heatmap.js'
import $ from 'jquery'
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
    // 初始化获取数据（模拟的展示数据）
    initValue () {
      var len = 30
      while (len--) {
        var val = Math.floor(Math.random() * 100)
        // max = Math.max(max, val)
        var point = {
          // x: Math.floor(Math.random() * 1118),
          // y: Math.floor(Math.random() * 532),
          // x: Math.floor(288 * 800 / 1681),
          // y: Math.floor(108 * 800 / 1681),
          x: Math.floor(288 * 901 / 1900),
          y: Math.floor(108 * 901 / 1900),
          value: val
        }
        this.points.push(point)
      }
    },
    // 初始化热力图
    initHotPic () {
      this.deleteHotMap()
      let self = this
      var heatmapInstance = Heatmap.create({
        container: document.getElementById('heatmap'),
        gradient: {// 渐变颜色
          '0': 'rgba(255,255,255,1)', // value为0的颜色
          '0.3': '#82ff6d', // value为500的颜色
          '0.8': '#f3ff6d', // value为1000的颜色
          '1': '#ff6d6d' // value为2000的颜色
        },
        // radius: 10,
        maxOpacity: 1,
        minOpacity: 0,
        blur: 0.75
        // radius:30, //半径
        // opacity:0.5, //透明
        // maxOpacity, //热图中最大值具有的最大不透明度
        // minOpacity, //热图中最小值的最小不透明度
        // onExtremaChange, //传递回调以接收极值更改更新
        // blur, //将应用于所有数据点的模糊因子。模糊因子越高，渐变将越平滑
        // xField, //数据点中x坐标的属性名称
        // yField, //数据点中y坐标的属性名称
        // valueField //数据点中y坐标的属性名称
      })
      var data = {
        max: 100, // 数据对比(max和min进行数据对比，从而展示热力颜色)
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
        console.log('宽=' + curVal, oldVal)
      }
    },
    cavHeight: {
      handler (curVal, oldVal) {
        var _this = this
        _this.cavHeight = curVal
        if (oldVal != 0 && oldVal != null) {
          for (var i = 0; i < this.points.length; i++) {
            this.points[i].y = Number((this.points[i].y * curVal / oldVal).toFixed(0))
            console.log(this.points[i].y)
          }
          _this.initHotPic()
        }
        console.log('高=' + curVal, oldVal)
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
