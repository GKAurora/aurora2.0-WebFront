<template>
  <div id='main_1'>
      <canvas id='myCanvas' style='width:100%; height:auto'></canvas>
      <img id='scream' src='../../assets/img/about/拓扑.png' alt='The Scream' style='display: none;'>
  </div>
</template>

<script>
let canvas
let ctx
let img
// 为每个区域假设代表点
let area_id =
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
let area_id2 = {
  'area_2': {},
  'area_3': {},
  'area_1': {},
  'area_5': {},
  'area_9': {}
}
export default {
  data () {
    return {
      cavWidth: 1118, // 画布默认宽度
      cavHeight: 559 // 画布默认高度
    }
  },
  methods: {
    initCanvas () {
      console.log('初始化canvas')
      var a_key
      var a
      var b_key
      var b
      var R = (559 / 1118) / 2
      canvas = document.getElementById('myCanvas')
      img = document.getElementById('scream')
      ctx = canvas.getContext('2d')
      img.onload = function () {
        for (const key in area_id) {
          a_key = key
          a = area_id[key]
          for (const key1 in area_id2) {
            b_key = key1
            b = area_id2[key1]
            if (b_key === a_key) {
              b = a
              area_id2[key1] = b
            }
          }
        }

        // var keys = Object.keys(area_id2)
        // var sum = []
        // for (let i = 0; i < keys.length; i++) {
        //   sum.push(keys[i])
        //   console.log(sum[0])
        //   let values = area_id2[keys[i]]
        //   let oldvalues
        //   let oldx
        //   let oldy
        //   let x = values.x * R
        //   let y = values.y * R
        //   let w = values.w * R
        //   let h = values.h * R
        //   if (i == 0) {
        //     ctx.beginPath()
        //     ctx.fillStyle = 'green'
        //     ctx.fillRect(x, y, w, h)
        //     ctx.closePath()
        //     ctx.beginPath()
        //     ctx.fillStyle = '#ffffff'
        //     ctx.font = '10px Verdana'
        //     ctx.fillText(sum[0], x - 20, y + 15)
        //     ctx.closePath()
        //   } else if (i > 1) {
        //     oldvalues = area_id2[keys[i - 1]]
        //     oldx = oldvalues.x * R
        //     oldy = oldvalues.y * R
        //     ctx.beginPath()
        //     ctx.globalCompositeOperation = 'destination-over'
        //     ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
        //     ctx.moveTo(oldx, oldy)
        //     ctx.lineTo(x, y)
        //     ctx.stroke()
        //     ctx.closePath()
        //     ctx.beginPath()
        //     ctx.fillStyle = 'red'
        //     ctx.fillRect(x, y, w, h)
        //     ctx.closePath()
        //     ctx.beginPath()
        //     ctx.fillStyle = '#ffffff'
        //     ctx.font = '10px Verdana'
        //     ctx.fillText(sum[i], x - 20, y + 15)
        //     ctx.closePath()
        //   }

        var keys = Object.keys(area_id2)
        var sum = []
        for (let i = 0; i < keys.length; i++) {
          sum.push(keys[i])
          console.log(sum[0])
          let values = area_id2[keys[i]]
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
          } else if (i == 1) {
            oldvalues = area_id2[keys[i - 1]]
            oldx = oldvalues.x * R
            oldy = oldvalues.y * R
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-over'
            ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
            ctx.moveTo(oldx, oldy)
            ctx.lineTo(oldx, oldy-12)
            ctx.lineTo(x,oldy-12)
            ctx.lineTo(x,y)
            // ctx.quadraticCurveTo(oldx, oldy - 20, x, y)
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
          } else if (i == 2) {
            oldvalues = area_id2[keys[i - 1]]
            oldx = oldvalues.x * R
            oldy = oldvalues.y * R
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-over'
            ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
            ctx.moveTo(oldx+5, oldy)
            ctx.lineTo(oldx+5, oldy-17)
            ctx.lineTo(x,oldy-17)
            ctx.lineTo(x,y)
            // ctx.arcTo(x,y+30,x+10,y+30,10)
            // ctx.lineTo(x+30,y+30)
            // ctx.arcTo(oldx,y+30,oldx,oldy,10)
            // ctx.lineTo(oldx+2,oldy)
            // ctx.quadraticCurveTo(x-10, y + 30, oldx, oldy)
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
          } else if (i == 3) {
            oldvalues = area_id2[keys[i - 1]]
            oldx = oldvalues.x * R
            oldy = oldvalues.y * R
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-over'
            ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
            ctx.moveTo(oldx, oldy)
            ctx.lineTo(oldx+50, oldy)
            ctx.lineTo(oldx+50,oldy+20)
            ctx.lineTo(oldx+60,oldy+20)
            ctx.lineTo(oldx+60,oldy+35)
            ctx.lineTo(x,oldy+35)
            ctx.lineTo(x,y)
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
          } else if (i == 4) {
            oldvalues = area_id2[keys[i - 1]]
            oldx = oldvalues.x * R
            oldy = oldvalues.y * R
            ctx.beginPath()
            ctx.globalCompositeOperation = 'destination-over'
            ctx.strokeStyle = 'rgba(255 ,165, 0, 1.0)'
            ctx.moveTo(oldx+5, oldy)
            ctx.lineTo(oldx+5,oldy-15)
            ctx.lineTo(x,oldy-15)
            // ctx.lineTo(oldx+30, oldy)
            // ctx.arcTo(oldx+2,oldy-15,oldx+15,oldy-15,15)
            // ctx.lineTo(oldx+120,oldy-15)
            // ctx.arcTo(oldx+130,oldy-15,oldx+130,oldy-25,10)
            ctx.lineTo(x,y)
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
        canvas.onclick = function (e) {
        // 处理canvas的按下鼠标事件
        //   let keyid2 = {}
        //   for (const key_id2 in area_id2) {
        //     keyid2[key_id2] = {}
        //     // console.log(keyid2[key_id2])
        //   }
        //   var key2 = Object.keys(keyid2)
        //   for (let i=0;i<key2.length;i++) {
        //     console.log(key2[i] + keyid2[key2[i]])
        //   }
        //   alert(keyid2)
        // }
          var key2 = Object.keys(area_id2)
          var sum = []
          for (let i = 0; i < key2.length; i++) {
            sum.push(key2[i])
          }
          let sum_string = sum.join('-->')
          alert('用户路径：' + sum_string)
        }
      }
    }
  },
  mounted () {
    this.initCanvas()
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
#main_1{
    display: flex;
    justify-content: center;
    align-content: center;
}
#myCanvas{
    /* border: 1px salmon solid; */
    background-image: url('../../assets/img/about/拓扑.png');
    background-size: 100% auto;
}
</style>
