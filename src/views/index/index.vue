<template>
  <div class="bg">
    <!--上部分-->
    <el-card style="height:430px" id="bar">
      <el-row >
        <!--设备概览-->
        <el-col :span="10" class="Biankuang">
          <span style="font-weight: 700;">设备状态概览</span>
          <hr />
          <br />
          <div class="grid-content bg-purple text">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-card class="box-card">
                    <span class="test"><strong>65</strong></span>
                    <br /><br />
                    <p class="test1">交换机</p>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="8"
                ><div class="grid-content bg-purple-light">
                  <el-card class="box-card1">
                    <span class="test"><strong>5</strong></span>
                    <br /><br />
                    <p class="test1">安全设备</p>
                  </el-card>
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-card class="box-card2">
                    <span class="test"><strong>186</strong></span>
                    <br /><br />
                    <p class="test1">无线设备</p>
                  </el-card>
                </div>
              </el-col>
              <el-row :gutter="20">
                <el-col :span="24">
                  <!--图表-->
                  <div
                    id="Huan"
                    class="grid-content bg-purple"
                    style="width: 500px; height: 250px"
                  ></div>
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
                ><div
                  class="grid-content bg-purple"
                  style="width: 300px; height: 300px"
                  id="YiBiao"
                ></div>
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
          ><div
            class="grid-content bg-purple"
          >
          <the-Accrsssuccess></the-Accrsssuccess>
          </div
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Radarmap from "./RadarMap";
import Accrsssuccess from "./AccrssSuccess.vue"
export default {
  components: {
    "the-Radarmap": Radarmap,
    "the-Accrsssuccess":Accrsssuccess
  },
  name: "page",
  mounted() {
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      [
        this.$echarts.init(document.getElementById("Huan")).setOption({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "20%",
            left: "80%",
          },
          series: [
            {
              name: "设备状态",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              selectedMode: "multiple",
              itemStyle: {
                // 阴影
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                // 圆环中数据
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "20",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 10, name: "未管理" },
                { value: 182, name: "正常" },
                { value: 20, name: "次要" },
                { value: 9, name: "严重" },
                { value: 50, name: "未知" },
                { value: 55, name: "警告" },
                { value: 10, name: "重要" },
              ],
            },
          ],
        }),
        this.$echarts.init(document.getElementById("YiBiao")).setOption({
          title: {
            text: "CPU利用率",
            textStyle: {
              color: "#212222",
              fontSize: 16,
            },
            left: "center",
          },
          
          series: [
            {
              type: "gauge",
              center:['50%','60%'],
              axisLine: {
                lineStyle: {
                  width: 15, // 宽度
                  color: [
                    // 颜色区域划分
                    [0.3, "darkseagreen"],
                    [0.7, "#37a2da"],
                    [1, "#fd666d"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: -20, // 刻度位置
                length: 5,
                lineStyle: {
                  color: "#fff",
                  width: 1,
                },
              },
              splitLine: {
                distance: -30, // 刻度值位置
                length: 30,
                lineStyle: {
                  color: "#fff",
                  width: 2,
                },
              },
              axisLabel: {
                color: "auto", // 刻度值位置
                distance: -10,
                fontSize: 16,
              },
              detail: {
                fontSize: 25,
                valueAnimation: true,
                formatter: "{value} %",
                color: "auto",
              },
              data: [
                {
                  value: 40,
                },
              ],
            },
          ],
        }),
      ];
    },
  },
};
</script>
<style lang="css" scoped>
/*背景图片 */
/* .bg{
  background-image: url('../../assets/img/about/bg.gif');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
} */
.item {
  padding: 18px 0;
}
.box-card {
  width: 169px;
  border-radius: 10px;
  background-color: darkseagreen;

  height: 138px;
  text-align: center;
}
.box-card1 {
  width: 169px;
  border-radius: 10px;
  background-color: cornflowerblue;
  height: 138px;
  text-align: center;
}
.box-card2 {
  width: 169px;
  border-radius: 10px;
  background-color: darkgray;
  height: 138px;
  text-align: center;
}
.test {
  font-size: 35px;
  color: aliceblue;
}
.test1 {
  color: aliceblue;
}
.Ziti {
  color: darkgrey;
}
#bar{
   background-color:#c2f2fd; 
}
.Biankuang {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
