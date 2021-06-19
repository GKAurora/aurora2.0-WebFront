<template>
  <div>
    <!-- <el-card> -->
      <el-row :gutter="20">
        <el-col :span="24">
          <img
            src="@/assets/img/about/bisai1.jpg"
            style="width: 100%; height: auto"
            id="img"
            usemap="#Map"
            border="0"
          />
          <map name="Map" id="Map" @mouseenter="enter"
              @mouseleave="leave">
            <!-- coords="98,96,253,96,253,122,310,122,310,188,98,188" -->
            <area
              shape="poly"
              :coords="map_1"
              href="#"
              target="_self"
              alt="毕高现代客厅家具"
              title="毕高现代客厅家具"
              id="area1"
              @mouseenter="enter"
              @mouseleave="leave"
            />
            <area
              shape="rect"
              :coords="map_2"
              href="#"
              target="_self"
              alt="维思嘉餐桌椅"
              title="维思嘉餐桌椅"
              id="area2"
            />
            <area
              shape="rect"
              :coords="map_3"
              href="#"
              target="_self"
              alt="佳梦床垫"
              title="佳梦床垫"
              id="area3"
            />
            <area
              shape="rect"
              :coords="map_4"
              href="#"
              target="_self"
              alt="天子. 朗晴板式家具"
              title="天子. 朗晴板式家具"
              id="area4"
            />
            <area
              shape="rect"
              :coords="map_5"
              href="#"
              target="_self"
              alt="一米阳光板式家具"
              title="一米阳光板式家具"
              id="area5"
            />
            <area
              shape="rect"
              :coords="map_6"
              href="#"
              target="_self"
              alt="佳宝丽订制家具"
              title="佳宝丽订制家具"
              id="area6"
            />
            <area
              shape="poly"
              :coords="map_7"
              href="#"
              target="_self"
              alt="绿叶绿办公家具"
              title="绿叶绿办公家具"
              id="area7"
            />
            <area
              shape="poly"
              :coords="map_8"
              href="#"
              target="_self"
              alt="飞腾办公家具"
              title="飞腾办公家具"
              id="area8"
            />
            <area
              shape="poly"
              :coords="map_9"
              href="#"
              target="_self"
              alt="百发办公家具"
              title="百发办公家具"
              id="area9"
            />
            <area
              shape="rect"
              :coords="map_10"
              href="#"
              target="_self"
              alt="青松办公家具"
              title="青松办公家具"
              id="area10"
            />
            <area
              shape="rect"
              :coords="map_11"
              href="#"
              target="_self"
              alt="东金茶几餐桌椅"
              title="东金茶几餐桌椅"
              id="area11"
            />
            <area
              shape="rect"
              :coords="map_12"
              href="#"
              target="_self"
              alt="蓝调沙发"
              title="蓝调沙发"
              id="area12"
            />
            <area
              shape="poly"
              :coords="map_13"
              href="#"
              target="_self"
              alt="浪渡沙发"
              title="浪渡沙发"
              id="area13"
            />
            <area
              shape="poly"
              :coords="map_14"
              href="#"
              target="_self"
              alt="办公区"
              title="办公区"
              id="area14"
            />
            <area
              shape="poly"
              :coords="map_15"
              href="#"
              target="_self"
              alt="藤艺坊藤制家具"
              title="藤艺坊藤制家具"
              id="area15"
            />
            <area
              shape="rect"
              :coords="map_16"
              href="#"
              target="_self"
              alt="斯帝来沙发"
              title="斯帝来沙发"
              id="area16"
            />
            <area
              shape="poly"
              :coords="map_17"
              href="#"
              target="_self"
              alt="晶点时光儿童家具"
              title="晶点时光儿童家具"
              id="area17"
            />
            <area
              shape="rect"
              :coords="map_18"
              href="#"
              target="_self"
              alt="慧点家具"
              title="慧点家具"
              id="area18"
            />
            <area
              shape="rect"
              :coords="map_19"
              href="#"
              target="_self"
              alt="欧艺家板式家具"
              title="欧艺家板式家具"
              id="area19"
            />
            <area
              shape="poly"
              :coords="map_20"
              href="#"
              target="_self"
              alt="园林办公家具"
              title="园林办公家具"
              id="area20"
            />
          </map>
        </el-col>
      </el-row>
    <!-- </el-card> -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      W: 0, // 图片的相对宽度
      H: 0, // 图片的相对高度
      imgW: 985, // 图片初始宽度
      imgH: 562, // 图片初始高度
      // 各个店铺的区域
      map_1: [],
      map_2: [],
      map_3: [],
      map_4: [],
      map_5: [],
      map_6: [],
      map_7: [],
      map_8: [],
      map_9: [],
      map_10: [],
      map_11: [],
      map_12: [],
      map_13: [],
      map_14: [],
      map_15: [],
      map_16: [],
      map_17: [],
      map_18: [],
      map_19: [],
      map_20: []
    }
  },
  methods: {
    relative () {
      // var __this = this
      this.W = $('#img').width() // 获取图片的宽度
      this.H = $('#img').height() // 过去图片的高度
      // 使图片上的坐标跟随图片做相应的变化
      this.map_1 = [(100 * this.W / this.imgW), (99 * this.H / this.imgH),
        (254 * this.W / this.imgW), (99 * this.H / this.imgH),
        (254 * this.W / this.imgW), (127 * this.H / this.imgH),
        (312 * this.W / this.imgW), (127 * this.H / this.imgH),
        (312 * this.W / this.imgW), (193 * this.H / this.imgH),
        (100 * this.W / this.imgW), (193 * this.H / this.imgH),
        (100 * this.W / this.imgW), (99 * this.H / this.imgH)
      ]
      this.map_2 = [
        (314 * this.W / this.imgW), (99 * this.H / this.imgH),
        (370 * this.W / this.imgW), (193 * this.H / this.imgH)
      ]
      this.map_3 = [
        (371 * this.W / this.imgW), (99 * this.H / this.imgH),
        (427 * this.W / this.imgW), (193 * this.H / this.imgH)
      ]
      this.map_4 = [
        (428 * this.W / this.imgW), (99 * this.H / this.imgH),
        (484 * this.W / this.imgW), (193 * this.H / this.imgH)
      ]
      this.map_5 = [
        (485 * this.W / this.imgW), (99 * this.H / this.imgH),
        (541 * this.W / this.imgW), (193 * this.H / this.imgH)
      ]
      this.map_6 = [
        (541 * this.W / this.imgW), (99 * this.H / this.imgH),
        (657 * this.W / this.imgW), (193 * this.H / this.imgH)
      ]
      this.map_7 = [
        (658 * this.W / this.imgW), (99 * this.H / this.imgH),
        (715 * this.W / this.imgW), (99 * this.H / this.imgH),
        (715 * this.W / this.imgW), (64 * this.H / this.imgH),
        (812 * this.W / this.imgW), (64 * this.H / this.imgH),
        (812 * this.W / this.imgW), (193 * this.H / this.imgH),
        (658 * this.W / this.imgW), (193 * this.H / this.imgH),
        (658 * this.W / this.imgW), (99 * this.H / this.imgH)
      ]
      this.map_8 = [
        (828 * this.W / this.imgW), (64 * this.H / this.imgH),
        (885 * this.W / this.imgW), (64 * this.H / this.imgH),
        (885 * this.W / this.imgW), (99 * this.H / this.imgH),
        (976 * this.W / this.imgW), (99 * this.H / this.imgH),
        (976 * this.W / this.imgW), (265 * this.H / this.imgH),
        (828 * this.W / this.imgW), (265 * this.H / this.imgH),
        (828 * this.W / this.imgW), (64 * this.H / this.imgH)
      ]
      this.map_9 = [
        (828 * this.W / this.imgW), (265 * this.H / this.imgH),
        (939 * this.W / this.imgW), (265 * this.H / this.imgH),
        (939 * this.W / this.imgW), (375 * this.H / this.imgH),
        (976 * this.W / this.imgW), (375 * this.H / this.imgH),
        (976 * this.W / this.imgW), (432 * this.H / this.imgH),
        (828 * this.W / this.imgW), (432 * this.H / this.imgH),
        (828 * this.W / this.imgW), (265 * this.H / this.imgH)
      ]
      this.map_10 = [
        (658 * this.W / this.imgW), (375 * this.H / this.imgH),
        (828 * this.W / this.imgW), (432 * this.H / this.imgH)
      ]
      this.map_11 = [
        (483 * this.W / this.imgW), (375 * this.H / this.imgH),
        (658 * this.W / this.imgW), (432 * this.H / this.imgH)
      ]
      this.map_12 = [
        (254 * this.W / this.imgW), (375 * this.H / this.imgH),
        (427 * this.W / this.imgW), (432 * this.H / this.imgH)
      ]
      this.map_13 = [
        (100 * this.W / this.imgW), (321 * this.H / this.imgH),
        (202 * this.W / this.imgW), (321 * this.H / this.imgH),
        (202 * this.W / this.imgW), (432 * this.H / this.imgH),
        (110 * this.W / this.imgW), (432 * this.H / this.imgH),
        (100 * this.W / this.imgW), (375 * this.H / this.imgH),
        (100 * this.W / this.imgW), (321 * this.H / this.imgH)
      ]
      this.map_14 = [
        (15 * this.W / this.imgW), (116 * this.H / this.imgH),
        (82 * this.W / this.imgW), (116 * this.H / this.imgH),
        (82 * this.W / this.imgW), (265 * this.H / this.imgH),
        (100 * this.W / this.imgW), (265 * this.H / this.imgH),
        (100 * this.W / this.imgW), (320 * this.H / this.imgH),
        (44 * this.W / this.imgW), (320 * this.H / this.imgH),
        (15 * this.W / this.imgW), (116 * this.H / this.imgH)
      ]
      this.map_15 = [
        (150 * this.W / this.imgW), (209 * this.H / this.imgH),
        (201 * this.W / this.imgW), (209 * this.H / this.imgH),
        (201 * this.W / this.imgW), (321 * this.H / this.imgH),
        (100 * this.W / this.imgW), (321 * this.H / this.imgH),
        (100 * this.W / this.imgW), (265 * this.H / this.imgH),
        (150 * this.W / this.imgW), (265 * this.H / this.imgH),
        (150 * this.W / this.imgW), (209 * this.H / this.imgH)
      ]
      this.map_16 = [
        (215 * this.W / this.imgW), (209 * this.H / this.imgH),
        (297 * this.W / this.imgW), (358 * this.H / this.imgH)
      ]
      this.map_17 = [
        (321 * this.W / this.imgW), (224 * this.H / this.imgH),
        (370 * this.W / this.imgW), (224 * this.H / this.imgH),
        (370 * this.W / this.imgW), (320 * this.H / this.imgH),
        (427 * this.W / this.imgW), (320 * this.H / this.imgH),
        (427 * this.W / this.imgW), (358 * this.H / this.imgH),
        (312 * this.W / this.imgW), (358 * this.H / this.imgH),
        (312 * this.W / this.imgW), (224 * this.H / this.imgH)
      ]
      this.map_18 = [
        (455 * this.W / this.imgW), (201 * this.H / this.imgH),
        (610 * this.W / this.imgW), (350 * this.H / this.imgH)
      ]
      this.map_19 = [
        (610 * this.W / this.imgW), (201 * this.H / this.imgH),
        (695 * this.W / this.imgW), (350 * this.H / this.imgH)
      ]
      this.map_20 = [
        (770 * this.W / this.imgW), (223 * this.H / this.imgH),
        (812 * this.W / this.imgW), (223 * this.H / this.imgH),
        (812 * this.W / this.imgW), (358 * this.H / this.imgH),
        (710 * this.W / this.imgW), (358 * this.H / this.imgH),
        (710 * this.W / this.imgW), (321 * this.H / this.imgH),
        (770 * this.W / this.imgW), (321 * this.H / this.imgH),
        (770 * this.W / this.imgW), (223 * this.H / this.imgH)
      ]
    },
    // 鼠标移入事件，来显示提示信息
    enter () {
      for (let i = 1; i < 21; i++) {
        let title = $('#area' + i).attr('alt')
        $('#area' + i).attr({ 'title': title })
      }
    },
    // 移出事件
    leave () {
    }
  },
  mounted () {
    var __this = this
    __this.relative()
    window.onload = () => {
      __this.relative()
    }
    window.onresize = () => {
      return (() => {
        __this.relative()
      })()
    }
  }

}
</script>

<style lang="scss" scoped>
* {
  margin: 0 auto;
  padding: 0;
}
</style>
