<template>
  <div class="bg">
    <!--上部分-->
    <el-card style="height: 430px" id="bar">
      <el-row>
        <!--设备概览-->
        <el-col :span="10" class="Biankuang">
          <span style="font-weight: 700">设备状态概览</span>
          <hr />
          <br />
          <div class="grid-content bg-purple text">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-card class="box-card">
                    <span class="test"><strong>65</strong></span>
                    <br /><br />
                    <p class="test1">设备接入总数</p>
                    <br />
                    <div class="Mask">
                      <span>详细信息 </span>
                      <i class="el-icon-video-play"></i>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="8"
                ><div class="grid-content bg-purple-light">
                  <el-card class="box-card1">
                    <span class="test"><strong>5</strong></span>
                    <br /><br />
                    <p class="test1">安全设备</p>
                    <br />
                    <div class="Mask">
                      <span>详细信息 </span>
                      <i class="el-icon-video-play"></i>
                    </div>
                  </el-card>
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-card class="box-card2">
                    <span class="test"><strong>186</strong></span>
                    <br /><br />
                    <p class="test1">无线设备</p>
                    <br />
                    <div class="Mask">
                      <span>详细信息 </span>
                      <i class="el-icon-video-play"></i>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-row :gutter="20">
                <el-col :span="24">
                  <!--图表-->
                  <div class="grid-content bg-purple">
                    <the-Annular></the-Annular>
                  </div>
                </el-col>
              </el-row>
            </el-row></div
        ></el-col>
        <!--仪表盘-->
        <el-col :span="14" style="padding-left: 50px">
          <div
            class="grid-content bg-purple-light"
            style="width: 900px; height: 400px"
          >
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <the-Dashboard></the-Dashboard>
                </div>
                <div class="Ziti">
                  <p>不可达率：100%</p>
                  <p>设备状态：正常</p>
                  <p>运行时间：182天</p>
                  <p>最后轮转时间：2021-06-18 11:56:32</p>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-Radarmap></the-Radarmap></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <!--下部分-->
    <el-card id="bar">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            <the-Accrsssuccess></the-Accrsssuccess></div
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Radarmap from "./RadarMap";
import Accrsssuccess from "./AccrssSuccess.vue";
import Dashboard from "./Dashboard.vue";
import Annular from "./Annular.vue";
export default {
  components: {
    "the-Radarmap": Radarmap,
    "the-Accrsssuccess": Accrsssuccess,
    "the-Dashboard": Dashboard,
    "the-Annular": Annular,
  },
  name: "page",
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
/*背景图片 */
/* .bg{
  background-image: url('../../assets/img/about/bg.gif');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
} */
.box-card {
  width: 169px;
  border-radius: 10px;
  background-color: darkseagreen;
  height: 138px;
  text-align: center;
  .test {
    font-size: 35px;
    color: aliceblue;
  }
}
.box-card1 {
  width: 169px;
  border-radius: 10px;
  background-color: cornflowerblue;
  height: 138px;
  text-align: center;
  .test {
    font-size: 35px;
    color: aliceblue;
  }
}
.box-card2 {
  width: 169px;
  border-radius: 10px;
  background-color: darkgray;
  height: 138px;
  text-align: center;
  .test {
    font-size: 35px;
    color: aliceblue;
  }
}
.test1 {
  color: aliceblue;
}
.Ziti {
  color: darkgrey;
}
#bar {
  background-color: #c2f2fd;
}
.Biankuang {
  padding-left: 5px;
  padding-right: 5px;
}
.Mask {
  width: 125x;
  border-radius: 10px;
  background: rgba(95, 95, 95, 0.4);
  margin-top: 5px;
  color: aliceblue;
}
i{
  padding-top: 0.5px;
}
</style>
