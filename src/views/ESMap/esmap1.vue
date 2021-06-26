<template>
<!-- <div id="pane_main"> -->
  <el-card>
  <el-row>
    <el-col :span="21">
      <div id="content">
        <div id="map-container"></div>
        <div id="range" v-show="range">
          <div id="range_1"><div id="red"></div><span id="text">1000以上</span></div>
          <div id="range_1"><div id="Orange"></div><span id="text">750-1000</span></div>
          <div id="range_1"><div id="Yellow"></div><span id="text">500-750</span></div>
          <div id="range_1"><div id="DeepSkyBlue"></div><span id="text">250-500</span></div>
          <div id="range_1"><div id="Turquoise"></div><span id="text">0-250</span></div>
        </div>
        <div id="safety" v-show="range1">
          <div id="range_1"><div id="red"></div><span id="text">有感染者</span></div>
        </div>
        <div id="pannel" v-show="trajectory">
          <el-button type="primary" id="begin">开始</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="2">
      <div id="tab">
        <el-dropdown>
          <el-button type="primary" class="el-dropdown-link">
            地图背景色<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a data-prop="setBackgroundColor" data-des="" data-val="#001326">默认背景</a></el-dropdown-item>
            <el-dropdown-item><a data-prop="setBackgroundColor" data-des="" data-val="#87CEFA">淡蓝色</a></el-dropdown-item>
            <el-dropdown-item><a data-prop="setBackgroundColor" data-des="" data-val="#808080">灰色</a></el-dropdown-item>
            <el-dropdown-item><a data-prop="setBackgroundImage" data-des="" data-val="./image/wedgets/map_bg1.jpg">自定义背景</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider></el-divider>
        <el-dropdown>
          <el-button type="primary" class="heatmap">
            商场热力图<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a id="hpshow1" data-des='人流量热力图'>人流量热力图</a></el-dropdown-item>
            <el-dropdown-item><a id="hpshow" data-des='疫情热力图'>疫情热力图</a></el-dropdown-item>
            <el-dropdown-item><a id="hpHide" data-des='商场热力图'>取消热力图</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider></el-divider>
        <el-button type="primary"  id="begin_show">感染者轨迹回放</el-button>
      </div>
    </el-col>
  </el-row>
<!-- </div> -->
</el-card>
</template>

<script>
// import MapApplication from '../../MapApplication'
import $ from 'jquery'
export default {
  name: 'MapContainer',
  data () {
    return {
      range: false,
      range1: false,
      trajectory: false
    }
  },
  // data: () => ({
  //   mapID: 'test666'
  // }),

  mounted () {
    // MapApplication.initMap(this)
    var that = this
    var container = null
    var heatmapInstance = null
    var heatmapInstance1 = null
    var heatmapPoints = []
    var selModel = null
    var gradient = null
    var gradient1 = null
    var mapID = 'test666' // 存放地图数据的文件夹名（test666,MyRoom,10005）
    var floorControl
    var floorLayer
    var coordIndex = 0 // 坐标点下标
    var coordsData = null
    var timer = -1
    var mapCoord
    var tm, tm2, tm3, layer1, layer2, layer3
    var coord
    var line = null
    container = document.getElementById('map-container')
    // console.log(window.esmap)
    that.map = new window.esmap.ESMap({
      container: container, // 渲染dom
      mapDataSrc: './data', // 地图数据位置
      mapThemeSrc: './data/theme', // 主题数据位置
      focusAlphaMode: true, // 对不可见图层启用透明设置 默认为true
      focusAnimateMode: true, // 聚焦层切换的动画显示
      focusAlpha: 0.9, // 对不聚焦图层启用透明设置，当focusAlphaMode = true时有效
      visibleFloors: 'all', // 更多初始化参数配置请参考https://www.esmap.cn/escopemap/content/cn/develope/map-config.html
      token: 'escope'
    })
    // 提示信息
    var prompt = {
      show: function (fnum, pt1) {
        // var div = document.getElementById('prompt');
        console.log('这是地图大小:' + '最大X：' + that.map.maxX + '最小X：' + that.map.minX +
        '最大Y' + that.map.maxY + '最小Y' + that.map.minY)
        // 坐标转换
        var pt2 = that.map.coordScreenToMap(pt1.x, pt1.y, pt1.z)

        if (pt2 != null) { // 屏幕到地图坐标可能是没有有意义的一个数字，所以做了范围限制，超出范围则是null！
          var pt3 = Mercator2lonLat(pt2.x, pt2.y)
          console.log('fnum=' + fnum + ', height=' + pt1.z + ',屏幕坐标：x=' + pt1.x +
                            ', y=' + pt1.y + ',地图坐标：x=' + parseInt(pt2.x) + ', y=' + parseInt(pt2.y) +
                           ',经纬度：lon=' + pt3[0].toFixed(5) + ', lat=' + pt3[1].toFixed(5))
        } else {
          console.log('fNum=' + fnum + ', height=' + pt1.z + ',屏幕坐标：x=' + pt1.x + ', y=' +
                            pt1.y + ',地图坐标：超出计算返回' + ',屏幕坐标：无效')
        }
      }
    }
    // 打开地图数据
    that.map.openMapById(mapID)
    that.map.showCompass = true // 显示指南针
    that.map.showScaler = true // 显示地图比例尺

    var ctlOpt = new esmap.ESControlOptions({
      position: esmap.ESControlPositon.RIGHT_TOP,
      // 注意：imgURL参数是static目录下图片的路径
      imgURL: './image/wedgets/'
    })

    // // 从后台接口拉取需要回放的人员轨迹点数据
    // $.getJSON('./data.json', function (data) {
    //   coordsData = data.points
    // })
    coordsData = [
      { 'x': 12683450, 'y': 2557842, 'fnum': 1 },
      { 'x': 12683451, 'y': 2557841, 'fnum': 1 },
      { 'x': 12683468, 'y': 2557840, 'fnum': 1 },
      { 'x': 12683467, 'y': 2557839, 'fnum': 1 },
      { 'x': 12683491, 'y': 2557891, 'fnum': 2 },
      { 'x': 12683498, 'y': 2557907, 'fnum': 2 },
      { 'x': 12683502, 'y': 2557915, 'fnum': 2 },
      { 'x': 12683501, 'y': 2557913, 'fnum': 2 },
      { 'x': 12683498, 'y': 2557852, 'fnum': 2 },
      { 'x': 12683484, 'y': 2557899, 'fnum': 2 },
      { 'x': 12683484, 'y': 2557897, 'fnum': 2 },
      { 'x': 12683484, 'y': 2557898, 'fnum': 2 },
      { 'x': 12683483, 'y': 2557896, 'fnum': 2 },
      { 'x': 12683483, 'y': 2557893, 'fnum': 2 },
      { 'x': 12683482, 'y': 2557890, 'fnum': 2 },
      { 'x': 12683481, 'y': 2557886, 'fnum': 2 },
      { 'x': 12683473, 'y': 2557840, 'fnum': 3 },
      { 'x': 12683466, 'y': 2557844, 'fnum': 3 }
    ]
    that.map.on('loadComplete', function () {
      // 创建楼层控件
      var floorControl = new esmap.ESScrollFloorsControl(that.map, ctlOpt)
      container.onclick = function (event) {
        var currentFid = that.map.focusFloorNum
        prompt.show(currentFid, {
          x: event.offsetX, // 需要取距离地图容器的相对屏幕坐标
          y: event.offsetX,
          z: that.map.getFloorHeight(currentFid)
        })
      }
    })
    var begin1 = document.getElementById('begin_show')
    begin1.onclick = function () {
      that.trajectory = true
      that.range = false
      that.range1 = false
    }
    var begin = document.getElementById('begin')
    begin.onclick = function () {
      if (timer !== -1) {
        return
      }
      var flag = true
      coordIndex = 0
      updateCoord()
    }

    function CreateMarker (x, y, fnum) { // 标注起始坐标点， 所在楼层
      var layer = new esmap.ESLayer('textMarker')
      floorLayer = that.map.getFloor(fnum) // 所在楼层
      tm = new esmap.ESTextMarker({
        x: x, // gpos1.x - 16
        y: y, // gpos1.y + 25
        name: '小张',
        showLevel: 20,
        height: 0.5,
        image: './image/wedgets/2D.png',
        imageAlign: 'bottom',
        imageSize: 50,
        seeThrough: true,
        // spritify: true, //是否跟随地图缩放默认为true
        fillcolor: '1,6,7', // 填充色
        fontsize: '8.0', // 字体大小
        strokecolor: '255,255,0' // 边框色
      })
      layer.addMarker(tm)
      floorLayer.addLayer(layer)
    }

    function updateCoord () { // 实时刷新轨迹线
      var points = []
      var lastfnum = 0
      timer = setInterval(updated, 100)
      function updated () {
        console.log(coordsData)
        if (coordIndex >= coordsData.length) { // 数据用完了，关掉定时器，清0
          clearInterval(timer)
          timer = -1
          that.map.clearLineMarkById('routes')
          line = null
          if (lastfnum > 0) { that.map.getFloor(lastfnum).removeLayersByTypes(esmap.ESLayerType.TEXT_MARKER) }
          return
        }
        var coord = coordsData[coordIndex] // 取坐标点
        if (that.map.focusFloorNum !== coord.fnum) { that.map.focusFloorNum = coord.fnum } // 判断聚焦楼层
        if (lastfnum !== coord.fnum)// 切换层的时候先要清除之前层的Marker
        {
          if (lastfnum > 0) { that.map.getFloor(lastfnum).removeLayersByTypes(esmap.ESLayerType.TEXT_MARKER) }
          CreateMarker(coord.x, coord.y, coord.fnum)
          lastfnum = coord.fnum
          points = []
        }
        // 过滤前后重复的
        if (points.length && points.length > 0) {
          var chge = ckSamePt(points[points.length - 1], coord)
            		if (chge) { return }
        }

        tm.moveTo({
          x: coord.x,
          y: coord.y,
          time: 0
        })
        // 只保留16个点  画轨迹线
        if (points.length > 16) {
          points.shift() // 先踢掉第一个
        }

        points.push(coord) // 在把新点加入进去

        drawLine(points)
        coordIndex++
      }
    }

    // 配置线标注样式
    var lineStyle = {
      lineWidth: 3,
      alpha: 0.8,
      offsetHeight: 0,
      hiddenByFloor: false,
      url: './image/wedgets/arrow1.png', // 贴图线图片url
      lineType: esmap.ESLineType.TEXTURE
    }

    // 画轨迹线
    function drawLine (points) {
      if (points.length && points.length <= 1) {
        return
      }
      changeSameP(points)
      if (line) {
        line.updatePoints(points)
      } else {
        // 创建线标注对象
        line = new esmap.ESLineMarker('routes', points, lineStyle)
        // 调用地图的画线方法
        that.map.drawLineMark(line)
      }
    }

    // 来回画线坐标重复导致线不显示的问题,采用重复坐标点偏移一些来解决
    function changeSameP (points) {
      if (points.length && points.length < 3) return
      let chge = ckSamePt(points[points.length - 1], points[points.length - 3])
      if (chge) {
        points[points.length - 1].x += 0.001
        points[points.length - 1].y += 0.001
        return points
      } else {
        return points
      }
    }

    // 判断两点是否相等
    function ckSamePt (p1, p2) {
      if (p1.fnum !== p2.fnum) {
        return false
      }
      if (Math.abs(p1.x - p2.x) < 0.0001 && Math.abs(p1.y - p2.y) < 0.0001) { // 判断两点间距离
        return true
      }
      return false
    }
    // 背景
    $('a[data-prop]').on('click', function (e) {
      that.map.setBackgroundImage(null) // 取消地图背景图片(地图有背景图片时，地图背景色将会失效。)
      var prop = $(this).data('prop')
      var val = $(this).data('val')
      var des = $(this).data('des')
      that.map[prop](val) // map.setBackgroundColor('#FF0000')修改背景颜色    map.setBackgroundImage('./image/bg.jpg')修改背景图片
      $('.el-dropdown-link').html(des + $(this).text() + ' <span class="el-icon-arrow-down el-icon--right">')
    })
    // 热力图
    $('a[id]').on('click', function (e) {
      var des = $(this).data('des')
      $('.heatmap').html(des + ' <span class="el-icon-arrow-down el-icon--right">')
    })
    // 地图坐标转经纬度坐标
    function Mercator2lonLat (mercatorX, mercatorY) {
      var xy = []
      var x = mercatorX / 20037508.34 * 180
      var y = mercatorY / 20037508.34 * 180
      y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2)
      xy.push(x)
      xy.push(y)
      return xy
    }
    // 配置热力图渐变色值
    gradient1 = {
      0.45: 'rgb(64,224,208)',
      0.55: 'rgb(0,191,255)',
      0.65: 'rgb(255,255,0)',
      0.95: 'rgb(255,165,0)',
      1.0: 'rgb(255,0,0)'
    }
    gradient = {
      1.0: 'rgb(255,0,0)'
    }
    // 疫情
    var initHeatMap = function () {
      heatmapInstance = esmap.ESHeatMap.create(that.map, {
        radius: 20, // 热点半径
        opacity: 1, // 热力图透明度
        mapOpacity: 0.2, // 设置地图楼层整体透明度
        backgroundColor: '#FFFFFF', // 热力图背景颜色，默认白色
        max: 1, // 热力点value的最大值
        gradient: gradient // 渐变色值，可配
        // 系统默认值：
        // .45: "rgb(0,0,255)",
        // .55: "rgb(0,255,255)",
        // .65: "rgb(0,255,0)",
        // .95: "yellow",
        // 1: "rgb(255,0,0)"
      })
    }
    // 随机
    var initHeatMap1 = function () {
      heatmapInstance1 = esmap.ESHeatMap.create(that.map, {
        radius: 20, // 热点半径
        opacity: 1, // 热力图透明度
        mapOpacity: 0.2, // 设置地图楼层整体透明度
        backgroundColor: '#FFFFFF', // 热力图背景颜色，默认白色
        max: 1000, // 热力点value的最大值
        gradient: gradient1 // 渐变色值，可配
        // 系统默认值：
        // .45: "rgb(0,0,255)",
        // .55: "rgb(0,255,255)",
        // .65: "rgb(0,255,0)",
        // .95: "yellow",
        // 1: "rgb(255,0,0)"
      })
    }
    // 添加热力图方法,根据json文件
    var addHeatMap = function (map, fID) {
      // 创建热力图对象
      if (!heatmapInstance)initHeatMap()
      heatmapInstance.setFloorNum(fID)
      heatmapInstance.clearPoints()
      heatmapInstance.addPoint(12683485.016940786, 2557881.79043444, 15)
      heatmapInstance.addPoint(12683473.584433805, 2557902.7500288216, 30)
      heatmapInstance.addPoint(12683430.236178169, 2557900.209471927, 80)
      heatmapInstance.addPoint(12683447.067369001, 2557860.036916029, 100)
      //     //热力图应用到哪一楼层
      heatmapInstance.disposeHeatMap(fID)
      var floorLayer = map.getFloor(fID)
      floorLayer.applyHeatMap(heatmapInstance)
    }
    // 随机添加热力图方法
    var addHeatMap1 = function (map, fID) {
      // 创建热力图对象
      if (!heatmapInstance1)initHeatMap1()

      heatmapInstance1.setFloorNum(fID)
      heatmapInstance1.clearPoints()
      heatmapInstance1.randomPoints(200)

      // heatmapInstance.disposeHeatMap(fID)
      // 热力图应用到哪一楼层
      var floorLayer = map.getFloor(fID)
      floorLayer.applyHeatMap(heatmapInstance1)
    }
    // 移除应用热力图
    $('#hpHide').on('click', function () {
      var floorLayer = that.map.getFloor(that.map.focusFloorNum)
      floorLayer.removeHeatMap(heatmapInstance)
      floorLayer.removeHeatMap(heatmapInstance1)
      that.range = false
      that.range1 = false
    })

    // 在当前聚焦楼层应用热力图
    $('#hpshow').on('click', function () {
      var floorLayer = that.map.getFloor(that.map.focusFloorNum)
      floorLayer.removeHeatMap(heatmapInstance1)
      addHeatMap(that.map, that.map.focusFloorNum)
      that.range = false
      that.trajectory = false
      that.range1 = true
    })

    $('#hpshow1').on('click', function () {
      var floorLayer = that.map.getFloor(that.map.focusFloorNum)
      floorLayer.removeHeatMap(heatmapInstance)
      addHeatMap1(that.map, that.map.focusFloorNum)
      that.range = true
      that.trajectory = false
      that.range1 = false
    })
  },

  destroyed () {
    // MapApplication.destroyMap()
    var that = this
    that.map.dumpScene()
    that.map = null
  }
}
</script>

<style>
#content {
  display: flex;
  justify-content: center;
}
#map-container {
  height: auto;
  width: 98%;
  position: relative;
}
.el-dropdown-link {
  cursor: pointer;
  padding: 0 5;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#range {
  position: absolute;
  left: 4%;
  bottom: 15%;
}
#safety {
  position: absolute;
  left: 4%;
  bottom: 15%;
}
#range_1 {
  clear: both;
}
#text {
  color: white;
  margin-left: 3px;
  font-size: 14px;
}
#red {
  background: red;
  width: 20px;
  height: 16px;
  float: left;
}
#Orange {
  background: #FFA500;
  width: 20px;
  height: 16px;
  float: left;
}
#Yellow {
  background: #FFFF00;
  width: 20px;
  height: 16px;
  float: left;
}
#DeepSkyBlue {
  background: #00BFFF;
  width: 20px;
  height: 16px;
  float: left;
}
#Turquoise {
  background: #40E0D0;
  width: 20px;
  height: 16px;
  float: left;
}
#pannel {
        position: absolute;
        left: 4%;
        bottom: 15%;
        z-index: 999;
    }

    #begin {
        background-color: rgb(97, 195, 212);
    }
</style>
