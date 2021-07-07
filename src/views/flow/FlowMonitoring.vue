<template>
  <div>
    <!--下部分-->
    <el-card id="bar">
      <el-row>
        <el-col>
          <div class="grid-content bg-purple-light flow">
            <!--时间选择器-->
            <timeSelector
              @dateStamp="handleTimeStamp"
              style="color: #fff"
            ></timeSelector>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col class="flow-access">
                <AccessSuccess></AccessSuccess>
              </el-col>
              <hr />
              <br />
              <el-col>
                <AccessTime></AccessTime>
              </el-col>
              <hr />
              <br />
              <el-col>
                <SignaInterference></SignaInterference>
              </el-col>
              <hr />
              <br />
              <el-col> <RoamDefence></RoamDefence></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import API from "../../api";
// import {mapState} from "vuex";
import AccessSuccess from "../index/AccessSuccess/AccessSuccess_line.vue";
import AccessTime from "../index/AccessTime/AccessTime_line.vue";
import RoamDefence from "../index/Roam/RoamDefence.vue";
import SignaInterference from "../index/Signal/SignaInterference_line.vue";
import timeSelector from "../../components/timeSelector.vue";
export default {
  // computed: {
  //   ...mapState(["timeFrame"]),
  // },
  // //监听父组件修改了时间，得到新的时间戳，更新到子组件的时间戳，重新发起请求
  // watch: {
  //   timeFrame: {
  //     handler(newtime, oldtime) {
  //       this.startime = newtime[0];
  //       this.endtime = newtime[1];
  //       this.getData();
  //     },
  //   },
  // },
  components: {
    AccessSuccess,
    AccessTime,
    RoamDefence,
    SignaInterference,
    timeSelector,
  },
  name: "page",
  data() {
    return {
      // Siteid:
      //   this.$store.state.siteMsg.siteId == "/"
      //     ? "857b706e-67d9-49c0-b3cd-4bd1e6963c07"
      //     : this.$store.state.siteMsg.siteId, //当前站点id
      // startime:
      //   this.$store.state.timeFrame[0] ||
      //   Date.now() - 1000 * 60 * 60 * 24 * parseInt(7),
      // endtime: this.$store.state.timeFrame[1] || Date.now(),
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    // this.$nextTick(async () => {
    //   try {
    //     const conf = API.sdn.qualityHealth(
    //       this.startime,
    //       this.endtime,
    //       1,
    //       this.Siteid
    //     );
    //     const sitedata = await this.$axios(conf);
    //     this.$store.commit("setFlowMsg",sitedata.data.data.values)
    //     if (sitedata.data.data == null) {
    //       this.$message({
    //         message: "暂无数据",
    //         type: "info",
    //       });
    //       return;
    //     }
    //     // this.$message({
    //     //   message: "获取数据成功",
    //     //   type: "success",
    //     // });
    //   } catch (error) {
    //   }
    // });
  },
  methods: {
    handleTimeStamp(e) {
      this.$store.commit("setTime", e);
    },
    // async getData(){
    //   try {
    //     const conf = API.sdn.qualityHealth(
    //       this.startime,
    //       this.endtime,
    //       1,
    //       this.Siteid
    //     );
    //     const sitedata = await this.$axios(conf);
    //     this.$store.commit("setFlowMsg",sitedata.data.data.values)
    //     if (sitedata.data.data == null) {
    //       this.$message({
    //         message: "暂无数据",
    //         type: "info",
    //       });
    //       return;
    //     }
    //     // this.$message({
    //     //   message: "获取数据成功",
    //     //   type: "success",
    //     // });
    //   } catch (error) {
    //   }
    // }
  },
};
</script>
<style lang='scss' scoped>
#bar {
  background: #182c5a;
}
</style>
