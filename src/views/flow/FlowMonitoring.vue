<template>
  <div>
    <!--下部分-->
    <el-card id="bar">
      <el-row class="test">
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <el-row>
              <div :data="SiteList">
                  <el-radio-group
                    v-model="radio"
                    v-for="site in SiteList"
                    :key="site.id"
                    size="medium"
                  >
                    <el-radio-button
                      :label="site.name"
                      :key="site.id"
                      @click.native="getSer(site.id)"
                    ></el-radio-button>
                  </el-radio-group>
                </div>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">              
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <the-AccessSuccess_line></the-AccessSuccess_line>
              </el-col>
              <hr>
              <br>
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <the-AccessTime_line></the-AccessTime_line>
              </el-col>
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <the-RoamDefence></the-RoamDefence
              ></el-col>
              <el-col :span="24" :lg="24" :md="12" :xs="24">
                <the-SignaInterference_line></the-SignaInterference_line
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import AccessSuccess_line from "../index/AccessSuccess/AccessSuccess_line.vue";
import AccessTime_line from "../index/AccessTime/AccessTime_line.vue";
import RoamDefence from "../index/Roam/RoamDefence.vue";
import SignaInterference_line from "../index/Signal/SignaInterference_line.vue";
import API from "../../api"
export default {
  components: {
    "the-AccessSuccess_line": AccessSuccess_line,
    "the-AccessTime_line": AccessTime_line,
    "the-RoamDefence": RoamDefence,
    "the-SignaInterference_line": SignaInterference_line,
  },
  name: "page",
  data() {
    return {
      radio:'Shenzhen',
      SiteList:[],
      SitequeryInfo: {
        queryInfoSite_id: "/",
      },
      siteId:'857b706e-67d9-49c0-b3cd-4bd1e6963c07'
    };
  },
  mounted() {
    this.getSitesMessage()
  },
  methods: {
    //获取站点信息
    async getSitesMessage(){
      try {
        const conf = API.sdn.getSitesMessage(
          this.SitequeryInfo.queryInfoSite_id
        );
        const data = await this.$axios(conf);
        if (data.status === 200) {
          this.SiteList = data.data.data;
          return true;
        }
        return false;
      } catch (error) {
        this.$message({
          message: "获取站点信息失败",
          type: "error",
        });
      }
    },
    //选择不同地区，展示不同用户列表
    getSer(site_id) {
      //记录当前选中状态
      this.siteId = site_id;
      this.$store.commit('setSiteId',this.siteId)
    }
  },
};
</script>
<style lang='scss' scoped>
#bar {
  background: #182c5a;
  // background: #dddddd;
}
</style>
