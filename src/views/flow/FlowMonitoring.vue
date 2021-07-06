<template>
  <div>
    <!--下部分-->
    <el-card id="bar">
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <!--时间选择器-->
            <timeSelector @dateStamp="handleTimeStamp" style="color:#fff"></timeSelector>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <AccessSuccess></AccessSuccess>
              </el-col>
              <hr />
              <br />
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <AccessTime></AccessTime>
              </el-col>
              <hr />
              <br />
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <SignaInterference></SignaInterference>
              </el-col>
              <hr />
              <br />
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <RoamDefence></RoamDefence
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import AccessSuccess from "../index/AccessSuccess/AccessSuccess_line.vue";
import AccessTime from "../index/AccessTime/AccessTime_line.vue";
import RoamDefence from "../index/Roam/RoamDefence.vue";
import SignaInterference from "../index/Signal/SignaInterference_line.vue";
import timeSelector from "../../components/timeSelector.vue";
export default {
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
      radio: "Shenzhen",
      SiteList: [],
      SitequeryInfo: {
        queryInfoSite_id: "/",
      },
      siteId: "857b706e-67d9-49c0-b3cd-4bd1e6963c07",
      //日期时间选择期快捷键
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    handleTimeStamp(e) {
      this.$store.commit("setTime", e);
    },
  },
};
</script>
<style lang='scss' scoped>
#bar {
  background: #182c5a;
}
</style>
