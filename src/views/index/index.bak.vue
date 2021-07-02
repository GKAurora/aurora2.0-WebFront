<template>
  <div class="bg">
    <!--上部分-->
    <el-card style="height: 450px" id="bar">
      <el-row>
        <!--设备概览-->
        <el-col :span="10" class="general-view">
          <span class="general-view-title">设备状态概览</span>
          <div class="grid-content bg-purple general-view-card" >
            <el-row :gutter="12">
              <DeviceBlock
              :cardData="card.device"
              ></DeviceBlock>
              <DeviceBlock
              :cardData="card.apMessage"
              ></DeviceBlock>
              <!-- <el-col :span="8" :xs="24" :sm="24" :lg="8"
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
              ></el-col> -->
              <!-- <el-col :span="8" :xs="24" :sm="24" :lg="8"
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
              </el-col> -->
              <!-- echat -->
              <!-- <el-row>
                <el-col :span="24">
                  图表
                  <div class="grid-content bg-purple">
                    <the-Annular></the-Annular>
                  </div>
                </el-col>
              </el-row> -->
            </el-row>
            </div>
        </el-col>
        <!--仪表盘-->
        <!-- <el-col :span="14" style="padding-left: 50px">
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
                  <p>用户名：<span>{{ this.serverInfo.username }}</span></p>
                  <p>用户邮箱：<span>{{ this.serverInfo.email }}</span></p>
                  <p>上一次登录ip：<span>{{ this.serverInfo.ip }}</span></p>
                  <p>最后登录时间：<span>{{ this.serverInfo.lastLogin }}</span></p>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-Radarmap></the-Radarmap></div
              ></el-col>
            </el-row>
          </div>
        </el-col> -->
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
                  <the-TotalRate></the-TotalRate>
                </div>
              </el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <the-Trend></the-Trend></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
    </el-card>
  </div>
</template>
<script>
import Radarmap from './RadarMap'
import Dashboard from './Dashboard.vue'
import Annular from './Annular.vue'
import TotalRate from './HealthTrend/TotalRate.vue'
import Trend from './HealthTrend/Trend.vue'
import API from '../../api/index'

import DeviceBlock from '../../components/fDeviceBlock.vue'

export default {
  components: {
    'the-Radarmap': Radarmap,
    'the-Dashboard': Dashboard,
    'the-Annular': Annular,
    'the-TotalRate': TotalRate,
    'the-Trend': Trend,
    DeviceBlock
  },
  name: 'page',
  data () {
    return {
      // device: ,
      card: {
        device: {
          total: 233,
          title: '设备数量',
          style: {
            backgroundColor: 'rgb(241, 179, 63)'
          }
        },
        apMessage: {
          total: 123,
          title: 'AP数量',
          style: {
            backgroundColor: 'cornflowerblue'
          }
        }
      },
      serverInfo: {
        username: 'admin',
        email: 'admin@c4.com',
        ip: '1.1.1.1',
        lastLogin: '2018-12-01'
      }
    }
  },
  created () {
    // this.test();
  },
  mounted() {
    console.log(this.card)
  },
  methods: {
    // test(){
    //   console.log(this.device)
    // }
  }
}
</script>
<style lang="scss" scoped>
// .bg{
//   background-color: #446bc7;
// }
.general-view-title {
  padding-left: 10px;
  padding-right: 5px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #f5f3f3;
}

.general-view-card{
  margin: 15px 0 0;
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

#bar {
  background: #182c5a;
  // background: #dddddd;
}

i {
  padding-top: 1px;
  padding-left: 5px;
}
.test {
  border-bottom: 3px solid rgb(125, 125, 125);
}


</style>
