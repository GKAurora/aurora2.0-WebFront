<template>
  <div class='bg'>
    <!--下部分-->
    <el-card id='bar'>
      <el-row class='test'>
        <el-col :span='24'>
          <div class='grid-content bg-purple-light'>
            <el-row>
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  <el-row>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-AccessSuccess_guape></the-AccessSuccess_guape>
                      </div>
                    </el-col>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-CertificationSuccess></the-CertificationSuccess>
                      </div>
                    </el-col>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-DhcpSuccess></the-DhcpSuccess>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span='16'
                ><div class='grid-content bg-purple-light'>
                  <the-AccessSuccess_line></the-AccessSuccess_line></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class='test'>
        <el-col :span='24'>
          <div class='grid-content bg-purple-light'>
            <el-row>
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  <el-row>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-RelationTime></the-RelationTime>
                      </div>
                    </el-col>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-Authentication></the-Authentication>
                      </div>
                    </el-col>
                    <el-col :span='8'
                      ><div class='grid-content bg-purple'>
                        <the-DhcpTime></the-DhcpTime>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span='16'
                ><div class='grid-content bg-purple-light'>
                  <the-AccessTime_line></the-AccessTime_line></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class='test'>
        <el-col :span='24'>
          <div class='grid-content bg-purple-light'>
            <el-row>
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  <el-row>
                    <el-col :span='12'
                      ><div class='grid-content bg-purple'>
                        <the-RoamSuccess></the-RoamSuccess></div
                    ></el-col>
                    <el-col :span='12'
                      ><div class='grid-content bg-purple-light'>
                        <the-RoamTime></the-RoamTime></div
                    ></el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span='16'
                ><div class='grid-content bg-purple-light'>
                  <the-RoamDefence></the-RoamDefence></div
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row class='test'>
        <el-col :span='24'>
          <div class='grid-content bg-purple-light'>
            <el-row>
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  <el-row>
                    <el-col :span='12'
                      ><div class='grid-content bg-purple'>
                        <the-Strength></the-Strength></div
                    ></el-col>
                    <el-col :span='12'
                      ><div class='grid-content bg-purple-light'>
                        <the-Interfere></the-Interfere></div
                    ></el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span='16'
                ><div class='grid-content bg-purple-light'>
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
import AccessSuccess_guape from '../index/AccessSuccess/AccessSuccess_guape.vue';
import CertificationSuccess_gauge from '../index/AccessSuccess/CertificationSuccess_gauge.vue';
import DhcpSuccess_gauge from '../index/AccessSuccess/DhcpSuccess_gauge.vue';
import AccessSuccess_line from '../index/AccessSuccess/AccessSuccess_line.vue';
import Authentication from '../index/AccessTime/AuthenticationTime.vue';
import DhcpTime from '../index/AccessTime/DhcpTime.vue';
import RelationTime from '../index/AccessTime/RelationTime.vue';
import AccessTime_line from '../index/AccessTime/AccessTime_line.vue';
import RoamSuccess from '../index/Roam/RoamSuccess.vue';
import RoamTime from '../index/Roam/RoamTime.vue';
import RoamDefence from '../index/Roam/RoamDefence.vue';
import Strength from '../index/Signal/Strength.vue';
import Interfere from '../index/Signal/Interfere.vue';
import SignaInterference_line from '../index/Signal/SignaInterference_line.vue'
export default {
  components: {
    'the-AccessSuccess_guape': AccessSuccess_guape,
    'the-CertificationSuccess': CertificationSuccess_gauge,
    'the-DhcpSuccess': DhcpSuccess_gauge,
    'the-AccessSuccess_line': AccessSuccess_line,
    'the-Authentication': Authentication,
    'the-DhcpTime': DhcpTime,
    'the-RelationTime': RelationTime,
    'the-AccessTime_line': AccessTime_line,
    'the-RoamSuccess': RoamSuccess,
    'the-RoamTime': RoamTime,
    'the-RoamDefence': RoamDefence,
    'the-Strength': Strength,
    'the-Interfere': Interfere,
    'the-SignaInterference_line':SignaInterference_line
  },
  name: 'page',
  data() {
    return {
      //设备状态概览
      device: {
        counts: [65, 5, 186],
        names: ['设备接入总数', '有线设备', '无线设备'],
        classs: ['Device_count', 'Security_count', 'Wireless_count'],
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
<style lang='scss' scoped>
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
