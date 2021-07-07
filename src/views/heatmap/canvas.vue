<template>
  <div id='canvas'>
      <canvas id='myCanvas' style='width:100%; height:auto' @click="dialogVisible = true"></canvas>
      <div  class="search">
        <el-input placeholder="请输入用户手机号mac" v-model="mac" prefix-icon="el-icon-search">
        <el-button type="primary" slot="suffix" @click="getsearch()">查询</el-button>
        </el-input>
      </div>
      <!-- <img id='scream' src='../../assets/img/about/拓扑.png' alt='The Scream' style='display: none;'> -->
      <el-dialog
  title="用户轨迹详情"
  :visible.sync="dialogVisible"
  width="30%">
  用户手机mac:{{this.mac}}
  <el-table :data="areas">
    <el-table-column width="" property="startTime" label="到达时间"></el-table-column>
    <el-table-column width="" property="endTime" label="离开时间"></el-table-column>
    <el-table-column width="80" property="accessAp" label="活动区域"></el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import API from '../../api'
let canvas
let ctx
// 为每个区域假设代表点
let areaid =
  {
    'area_1': { 'x': '85', 'y': '180', 'w': '20', 'h': '20' },
    'area_2': { 'x': '85', 'y': '370', 'w': '20', 'h': '20' },
    'area_3': { 'x': '260', 'y': '370', 'w': '20', 'h': '20' },
    'area_4': { 'x': '500', 'y': '180', 'w': '20', 'h': '20' },
    'area_5': { 'x': '460', 'y': '370', 'w': '20', 'h': '20' },
    'area_6': { 'x': '650', 'y': '370', 'w': '20', 'h': '20' },
    'area_7': { 'x': '770', 'y': '180', 'w': '20', 'h': '20' },
    'area_8': { 'x': '850', 'y': '370', 'w': '20', 'h': '20' },
    'area_9': { 'x': '970', 'y': '180', 'w': '20', 'h': '20' },
    'area_10': { 'x': '1050', 'y': '370', 'w': '20', 'h': '20' },
    'area_11': { 'x': '1110', 'y': '180', 'w': '20', 'h': '20' }
  }
  // 遍历后端的用户区域
let areaid2 = {}
export default {
  data () {
    return {
      cavWidth: 1118, // 画布默认宽度
      cavHeight: 559, // 画布默认高度
      dialogVisible: false, // 弹窗
      mac: '', // 搜索框的值
      areas: [], // 存储后端返回的值
      level: 1,
      site_id: this.$store.state.siteMsg.siteId || '857b706e-67d9-49c0-b3cd-4bd1e6963c07' // 站点id
    }
  },
  methods: {
    getsearch () {
      setTimeout(() => {
        this.initCanvas()
      }, 500)
      this.initarea()
    },
    async initarea () {
      try {
        const conf = API.sdn.getUserRoute(this.level, this.site_id, this.mac)
        const data = await this.$axios(conf)
        // console.log(data.data.data)
        if (data.data.code === 200) {
          this.$message({
            message: '用户信息查询成功',
            type: 'success'
          })
          this.areas = data.data.data
          for (let i = 0; i < this.areas.length; i++) {
          // console.log(areas[i].accessAp)
            areaid2[this.areas[i].accessAp] = {}
            let datatime = new Date(parseInt(this.areas[i].startTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
            this.areas[i].startTime = datatime
            let endtime = new Date(parseInt(this.areas[i].endTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
            this.areas[i].endTime = endtime
          }
        } else {
          this.$message({
            message: '请输入正确的用户手机mac',
            type: 'warning'
          })
        }
      } catch (error) {
        this.$message({
          message: '请在首页选择站点',
          type: 'error'
        })
        console.log(error)
      }
    },
    initCanvas () {
      console.log('初始化canvas')
      this.assignment()
      var R = (559 / 1118) / 2
      canvas = document.getElementById('myCanvas')
      ctx = canvas.getContext('2d')
      var keys = Object.keys(areaid2)
      var sum = []
      for (let i = 0; i < keys.length; i++) {
        sum.push(keys[i])
        // console.log(sum[0])
        let values = areaid2[keys[i]]
        let oldvalues
        let oldx
        let oldy
        let x = values.x * R
        let y = values.y * R
        let w = values.w * R
        let h = values.h * R
        if (i == 0) {
          ctx.beginPath()
          ctx.fillStyle = 'green'
          ctx.fillRect(x, y, w, h)
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px Verdana'
          ctx.fillText(sum[0], x - 20, y + 15)
          ctx.closePath()
        }
        if (i == 1) {
          oldvalues = areaid2[keys[i - 1]]
          oldx = oldvalues.x * R
          oldy = oldvalues.y * R
          ctx.beginPath()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
          ctx.moveTo(oldx, oldy)
          ctx.lineTo(oldx, oldy - 12)
          ctx.lineTo(x, oldy - 12)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = 'red'
          ctx.fillRect(x, y, w, h)
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px Verdana'
          ctx.fillText(sum[i], x - 20, y + 15)
          ctx.closePath()
        }
        if (i == 2) {
          oldvalues = areaid2[keys[i - 1]]
          oldx = oldvalues.x * R
          oldy = oldvalues.y * R
          ctx.beginPath()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
          ctx.moveTo(oldx + 5, oldy)
          ctx.lineTo(oldx + 5, oldy - 17)
          ctx.lineTo(x, oldy - 17)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = 'red'
          ctx.fillRect(x, y, w, h)
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px Verdana'
          ctx.fillText(sum[i], x - 20, y + 15)
          ctx.closePath()
        }
        if (i == 3) {
          oldvalues = areaid2[keys[i - 1]]
          oldx = oldvalues.x * R
          oldy = oldvalues.y * R
          ctx.beginPath()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
          ctx.moveTo(oldx, oldy)
          ctx.lineTo(oldx + 50, oldy)
          ctx.lineTo(oldx + 50, oldy + 20)
          ctx.lineTo(oldx + 60, oldy + 20)
          ctx.lineTo(oldx + 60, oldy + 35)
          ctx.lineTo(x, oldy + 35)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = 'red'
          ctx.fillRect(x, y, w, h)
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px Verdana'
          ctx.fillText(sum[i], x - 20, y + 15)
          ctx.closePath()
        }
        if (i == 4) {
          oldvalues = areaid2[keys[i - 1]]
          oldx = oldvalues.x * R
          oldy = oldvalues.y * R
          ctx.beginPath()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
          ctx.moveTo(oldx + 5, oldy)
          ctx.lineTo(oldx + 5, oldy - 15)
          ctx.lineTo(x, oldy - 15)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = 'red'
          ctx.fillRect(x, y, w, h)
          ctx.closePath()
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.font = '10px Verdana'
          ctx.fillText(sum[i], x - 20, y + 15)
          ctx.closePath()
        }
      }
    },
    // 为区域坐标赋值
    assignment () {
      var akey
      var a
      var bkey
      var b
      for (const key in areaid) {
        akey = key
        a = areaid[key]
        for (const key1 in areaid2) {
          bkey = key1
          b = areaid2[key1]
          if (bkey === akey) {
            b = a
            areaid2[key1] = b
          }
        }
      }
    }

  },
  activated () {
    this.initCanvas()
  },
  mounted () {
    // this.initarea()
    // this.initCanvas()
    var _this = this
    window.onresize = () => {
      return (() => {
        _this.initCanvas()
      })()
    }
  }
}
</script>

<style>
#canvas{
    display: flex;
    justify-content: center;
    align-content: center;
}
#myCanvas{
    /* border: 1px salmon solid; */
    background-image: url('../../assets/img/about/拓扑.png');
    background-size: 100% auto;
}
.search{
  position: absolute;
  top:14%;
  right: 0%;
  width: 30%;
  height: auto;
  opacity: 0.5;
  transform: all 1s;
}
.search:hover {
  opacity: 1;
  transform: all 1s;
}
</style>
