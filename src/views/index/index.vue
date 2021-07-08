<template>
  <div class="index-content">
    <div class="index-selector">
      <!-- site selector -->
      <Selector @select="handleSiteSelect"></Selector>
      <TimeSelector @dateStamp="handleTimeStamp"></TimeSelector>
    </div>

    <div class="overview">
      <!-- 状态总览 -->
      <GeneralState :cardMessage="card"> </GeneralState>
      <!-- 信息卡片 -->
      <MessageCard :Message="serverInfo"></MessageCard>
      <!-- 环形卡片 -->
      <AnnularCard
        v-if="annular.isShow != null"
        :annularData="annular.items"
      ></AnnularCard>
      <!-- 仪表盘 -->
      <Dashboard :dashboardValue="dashboardValue.value"></Dashboard>
      <Radarmap :radarMapValue="radarMapValue.values"></Radarmap>
      <!-- Api service state -->
      <CpuRate
      :CpuRateValue="apiServiceState.cpu.value"
      ></CpuRate>
      <MemoryInfo
      :MemoryInfoValue="apiServiceState.memory"
      ></MemoryInfo>
    </div>
  </div>
</template>
<script>
// site selector
// import Selector from '../../components/fSiteSelector.vue'
import Selector from "../../components/xiaotao/SiteTree.vue";
// time selector
import TimeSelector from "../../components/timeSelector.vue";
// overview
import GeneralState from "../../components/fGeneralStateView.vue";
import AnnularCard from "../../components/fAnnularCard.vue";
import MessageCard from "../../components/fMessageCard.vue";
import Dashboard from "../../components/fDashboard.vue";
import Radarmap from "../../components/fRadarmap.vue";
import CpuRate from '../../components/fCpuRate.vue'
import MemoryInfo from '../../components/fMemory.vue'
// api config
import API from "../../api";
// util
import converter from '../../utils/converter'

export default {
  components: {
    Selector,
    TimeSelector,
    GeneralState,
    AnnularCard,
    MessageCard,
    Dashboard,
    Radarmap,
    CpuRate,
    MemoryInfo
  },
  name: "page",
  data() {
    return {
      card: {
        device: {
          total: -1,
          title: "设备数量",
          style: {
            backgroundColor: "rgb(241, 179, 63)",
          },
          route: '/index'
        },
        apMessage: {
          total: -1,
          title: "AP数量",
          style: {
            backgroundColor: "cornflowerblue",
          },
          route: '/index'
        },
        totalDevice: {
          total: -1,
          title: "历史接入数量",
          style: {
            backgroundColor: "rgb(241, 179, 63)",
          },
          route: '/user'
        },
      },
      serverInfo: {
        username: "admin",
        email: "admin@c4.com",
        ip: "127.0.0.1",
        last_login: "xxxxxxxx",
      },
      annular: {
        isShow: false,
        items: [
          {
            value: null,
            name: "关联失败数",
            nickName: "associateFailNum",
          },
          {
            value: 0,
            name: "关联成功数",
            nickName: "associateSuccNum",
          },
          {
            value: 0,
            name: "认证失败数",
            nickName: "authFailNum",
          },
          {
            value: 0,
            name: "认证成功数",
            nickName: "authSuccNum",
          },
          {
            value: 0,
            name: "Dhcp失败数",
            nickName: "dhcpFailNum",
          },
          {
            value: 0,
            name: "Dhcp成功数",
            nickName: "dhcpSuccNum",
          },
        ],
      },
      dashboardValue: {
        isShow: false,
        value: 0,
      },
      /** 接入成功率, 吞吐达标率, 容量健康度, 信号和干扰, 漫游达标率, 接入耗时 */
      radarMapValue: {
        template: [
          { text: "接入成功率", nickName: 'successCon'}, // 
          { text: "吞吐达标率", nickName: 'throughput'}, // 
          { text: "容量健康度", nickName: 'capacity'}, //
          { text: "信号和干扰", nickName: 'coverage'}, //
          { text: "漫游达标率", nickName: 'roaming'}, //
          { text: "接入耗时", nickName: 'timeCon'}, //
        ],
        values: [],
      },
      apiServiceState: {
        cpu: {
          isloading: false,
          value: 0
        },
        memory:[
          {value: 0, name: '已经使用', nickName: 'used'},
          {value: 0, name: '空闲', nickName: 'free'}
        ],
        memoryIsloading: false,
        swapMemory: {
          "free": 0,
          "percent": 0,
          "total": 0,
          "used": 0
        }
      }
    };
  },
  methods: {
    /**
     * 站点选择器
     */
    handleSiteSelect(e) {
      this.$store.commit("setSiteNode", e);
      this.$store.commit("setSiteId", e.id);
      this.handleChange()
    },
    handleTimeStamp(e) {
      console.log('timeStamp')
      this.$store.commit("setTime", e);
      this.handleChange()
    },
    handleChange() {
      // state message
      this.getGeneralStateMsg();
      // 接入失败信息
      this.getAnnularData();
      // 改仪表盘数据
      this.getDashboardData();
      // 改变六角形数据
      this.getRadarMapData();
    },
    /**
     * 登录信息、用户信息、信息框
     */
    async getLoginUserMessage() {
      const conf = API.auth.getLoginUserMsg();
      const data = await this.$axios(conf);
      if (data.status === 200) {
        delete data.data.data.type;
        this.serverInfo = { ...this.serverInfo, ...data.data.data };
      }
    },
    /**
     * 获取状态框信息
     */
    getGeneralStateMsg() {
      this.totalUserDevice();
      this.totalFloorDevice();
      this.totalSDNDevice();
    },
    async totalUserDevice() {
      const conf = API.sdn.getUserLocation();
      const users = await this.$axios(conf);
      if (users.status !== 200) {
        return;
      }
      const arr = Object.keys(users.data.data);
      this.card.device.total = arr.length;
      return arr.length;
    },
    async totalFloorDevice() {
      const conf = API.sdn.getFloorDevice(
        this.$store.state.siteMsg.siteId,
        this.$store.state.siteMsg.currentSiteNode.tree_level || 1
      );
      const apis = await this.$axios(conf);
      if (apis.status !== 200) {
        return;
      }
      const total = apis.data.data.apList.AP.length;
      this.card.apMessage.total = total;
      return total;
    },
    async totalSDNDevice() {
      const conf = API.sdn.getUserList();
      const users = await this.$axios(conf);
      if (users.status !== 200) {
        return;
      }
      this.card.totalDevice.total = users.data.data.totalSize;
      return users.data.data.totalSize;
    },
    /**
     * 获取Annular组件数据
     */
    async getAnnularData() {
      const conf = API.sdn.getErr(
        0,
        this.$store.state.timeFrame[1],
        this.$store.state.timeFrame[0],
        this.$store.state.siteMsg.siteId,
        this.$store.state.siteMsg.currentSiteNode.tree_level
      );
      const data = (await this.$axios(conf)).data.data;
      if (data == null) {
        this.annular.isShow = false;
        return;
      }
      let t2 = data.reduce((total, n) => {
        Object.keys(n).forEach((k) => {
          total[k] += n[k];
        });
        return total;
      });
      this.annular.items.forEach((item) => {
        item.value = t2[item.nickName];
      });
      // console.log('items', this.annular.items)
      // this.annular.items = items
      this.annular.isShow = true;
    },
    /** 获取两个组件公共数据 */
    async getTotalData() {
      const conf = API.sdn.getDeviceTotalMsg(
        this.$store.state.timeFrame[0],
        this.$store.state.timeFrame[1],
        1,
        this.$store.state.siteMsg.siteId
      );
      const total = (await this.$axios(conf)).data;
      console.log('total->', total)
      if (total.data == null) {
        return;
      }
      return total;
    },
    async getDashboardData() {
      const total = await this.getTotalData();
      if (total == null) {
        return;
      }
      const totalRate = total.data.totalRate;
      if (typeof totalRate === "undefined") {
        // this.dashboardValue.value = 0;
        this.dashboardValue.isShow = false;
        return 
      }
      this.dashboardValue.value = totalRate;
      this.dashboardValue.isShow = true;
    },
    /** 获取RadarMap组件数据 */
    async getRadarMapData() {
      const total = await this.getTotalData();
      console.log('map', total)
      if (total == null) {
        return;
      }
      const values = total.data.values;
      this.radarMapValue.template.forEach(e=> {
        Object.keys(values).forEach(item => {
          if(e.nickName == item){
            this.radarMapValue.values.push(values[item])
          }
        })
      })
    },
    /** 获取api service数据 */
    async getServiceCpuInfo() {
      if(this.apiServiceState.cpu.isloading) return ;
      this.apiServiceState.cpu.isloading = true
      const conf = API.sys.getCpuMsg(false)
      const cpuData = (await this.$axios(conf)).data
      this.apiServiceState.cpu.value = cpuData.data
      this.apiServiceState.cpu.isloading = false
    },
    async getServiceMemoryInfo() {
      if(this.apiServiceState.memoryIsloading) return;
      this.apiServiceState.memoryIsloading = true
      const conf = API.sys.getRamMsg(false)
      const memoryData = (await this.$axios(conf)).data
      this.apiServiceState.memory.forEach(item => {
          item.value = converter(memoryData.data[item.nickName])
      })
      this.apiServiceState.memoryIsloading = false
    }
  },
  mounted() {
    // this.getGeneralStateMsg();
    this.getLoginUserMessage();
    this.$nextTick(()=> {
      // this.handleChange()
      // setInterval(() => {
      //   this.getServiceCpuInfo()
      //   this.getServiceMemoryInfo()
      // }, 2000);
    })

    console.log('mount')
  },
};
</script>
<style scoped>
.index-content {
  display: flex;
  flex-direction: column;
}
.index-selector {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-around;
}
.index-selector div {
  padding: 5px 10px;
}

.overview {
  display: flex;
  align-content: stretch;
  flex-wrap: wrap;
}
.overview div {
  margin: 10px 15px;
  min-width: 400px;
  flex-grow: 1;
}
</style>
