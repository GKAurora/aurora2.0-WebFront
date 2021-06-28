<template>
  <div class="bg">
    <!--上部分-->
    <el-card style="height: 430px" id="bar">
      <el-row>
        <!--设备概览-->
        <el-col :span="10" class="Biankuang">
          <span style="font-weight: 700; color: #f5f3f3">设备状态概览</span>
          <hr />
          <br />
          <div class="grid-content bg-purple text">
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-card class="Device_count">
                    <span class="Device_font"><strong>186</strong></span>
                    <br /><br />
                    <p class="Device_font_two">接入设备总数</p>
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
                  <el-card class="Security_count">
                    <span class="Device_font"><strong>58</strong></span>
                    <br /><br />
                    <p class="Device_font_two">有线用户</p>
                    <br />
                    <div class="Mask">
                      <span>详细信息 </span>
                      <i class="el-icon-video-play"></i>
                    </div>
                  </el-card></div
              ></el-col>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-card class="Wireless_count">
                    <span class="Device_font"><strong>128</strong></span>
                    <br /><br />
                    <p class="Device_font_two">无线用户</p>
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
            style="width: 900px; height: 300px"
          >
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <the-Dashboard></the-Dashboard>
                </div>
                <div style="color: darkgrey">
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
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-row>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-AccessSuccess_guape></the-AccessSuccess_guape>
                      </div>
                    </el-col>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-CertificationSuccess></the-CertificationSuccess>
                      </div>
                    </el-col>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-DhcpSuccess></the-DhcpSuccess>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-AccessSuccess_line></the-AccessSuccess_line></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-row>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-RelationTime></the-RelationTime>
                      </div>
                    </el-col>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-Authentication></the-Authentication>
                      </div>
                    </el-col>
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <the-DhcpTime></the-DhcpTime>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-AccessTime_line></the-AccessTime_line></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-row>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple">
                        <the-RoamSuccess></the-RoamSuccess></div
                    ></el-col>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple-light">
                        <the-RoamTime></the-RoamTime></div
                    ></el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-RoamDefence></the-RoamDefence></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-row>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple">
                        <the-Strength></the-Strength></div
                    ></el-col>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple-light">
                        <the-Interfere></the-Interfere></div
                    ></el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-SignaInterference_line></the-SignaInterference_line></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Radarmap from "./RadarMap";
import Accrsssuccess from "./AccrssSuccess.vue";
import Dashboard from "./Dashboard.vue";
import Annular from "./Annular.vue";
import AccessSuccess_guape from "./AccessSuccess/AccessSuccess_guape.vue";
import CertificationSuccess_gauge from "./AccessSuccess/CertificationSuccess_gauge.vue";
import DhcpSuccess_gauge from "./AccessSuccess/DhcpSuccess_gauge.vue";
import AccessSuccess_line from "./AccessSuccess/AccessSuccess_line.vue";
import Authentication from "./AccessTime/AuthenticationTime.vue";
import DhcpTime from "./AccessTime/DhcpTime.vue";
import RelationTime from "./AccessTime/RelationTime.vue";
import AccessTime_line from "./AccessTime/AccessTime_line.vue";
import RoamSuccess from "./Roam/RoamSuccess.vue";
import RoamTime from "./Roam/RoamTime.vue";
import RoamDefence from "./Roam/RoamDefence.vue";
import Strength from "./Signal/Strength.vue";
import Interfere from "./Signal/Interfere.vue";
import SignaInterference_line from "./Signal/SignaInterference_line.vue"
export default {
  components: {
    "the-Radarmap": Radarmap,
    "the-Accrsssuccess": Accrsssuccess,
    "the-Dashboard": Dashboard,
    "the-Annular": Annular,
    "the-AccessSuccess_guape": AccessSuccess_guape,
    "the-CertificationSuccess": CertificationSuccess_gauge,
    "the-DhcpSuccess": DhcpSuccess_gauge,
    "the-AccessSuccess_line": AccessSuccess_line,
    "the-Authentication": Authentication,
    "the-DhcpTime": DhcpTime,
    "the-RelationTime": RelationTime,
    "the-AccessTime_line": AccessTime_line,
    "the-RoamSuccess": RoamSuccess,
    "the-RoamTime": RoamTime,
    "the-RoamDefence": RoamDefence,
    "the-Strength": Strength,
    "the-Interfere": Interfere,
    "the-SignaInterference_line":SignaInterference_line
  },
  name: "page",
  data() {
    return {
      //设备状态概览
      device: {
        counts: [65, 5, 186],
        names: ["设备接入总数", "有线设备", "无线设备"],
        classs: ["Device_count", "Security_count", "Wireless_count"],
      },
    };
  },
  created() {
    // this.test();
  },
  methods: {
    // test(){
    //   console.log(this.device)
    // }
  },
};
</script>
<style lang="scss" scoped>
// .bg{
//   background-color: #446bc7;
// }
.Device_count {
  width: 150px;
  border-radius: 20px;
  background-color: rgb(241, 179, 63);
  height: 138px;
  text-align: center;
}
.Device_font {
  font-size: 30px;
  color: aliceblue;
}
.Device_font_two {
  color: aliceblue;
}
.Security_count {
  width: 150px;
  border-radius: 20px;
  background-color: cornflowerblue;
  height: 138px;
  text-align: center;
}
.Wireless_count {
  width: 150px;
  border-radius: 20px;
  background-color: darkgray;
  height: 138px;
  text-align: center;
}
.Biankuang {
  padding-left: 10px;
  padding-right: 5px;
}
#bar {
  background: #182c5a;
  // background: #dddddd;
}
.Mask {
  width: 150px;
  height: 32px;
  border-radius: 10px;
  background: rgba(95, 95, 95, 0.4);
  padding-top: 7px;
  color: aliceblue;
}
i {
  padding-top: 1px;
  padding-left: 5px;
}
.test {
  border-bottom: 3px solid rgb(125, 125, 125);
}
</style>
