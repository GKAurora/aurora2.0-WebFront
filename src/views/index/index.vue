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
      <Dashboard
      :dashboardValue="dashboardValue.value"
      ></Dashboard>
      <Radarmap></Radarmap>
    </div>
  </div>
</template>
<script>
// site selector
// import Selector from '../../components/fSiteSelector.vue'
import Selector from '../../components/xiaotao/SiteTree.vue'
// time selector
import TimeSelector from '../../components/timeSelector.vue'
// overview
import GeneralState from '../../components/fGeneralStateView.vue'
import AnnularCard from '../../components/fAnnularCard.vue'
import MessageCard from '../../components/fMessageCard.vue'
import Dashboard from '../../components/fDashboard.vue'
import Radarmap from '../../components/fRadarmap.vue'
// api config
import API from '../../api'

export default {
  components: {
    Selector,
    TimeSelector,
    GeneralState,
    AnnularCard,
    MessageCard,
    Dashboard,
    Radarmap
  },
  name: 'page',
  data () {
    return {
      card: {
        device: {
          total: -1,
          title: '设备数量',
          style: {
            backgroundColor: 'rgb(241, 179, 63)'
          }
        },
        apMessage: {
          total: -1,
          title: 'AP数量',
          style: {
            backgroundColor: 'cornflowerblue'
          }
        },
        totalDevice: {
          total: -1,
          title: '历史接入数量',
          style: {
            backgroundColor: 'rgb(241, 179, 63)'
          }
        }
      },
      serverInfo: {
        username: 'admin',
        email: 'admin@c4.com',
        ip: '127.0.0.1',
        last_login: 'xxxxxxxx'
      },
      annular: {
        isShow: null,
        items: [{
            value: null,
            name: '关联失败数',
            nickName: 'associateFailNum',
          },{
            value: 0,
            name: '关联成功数',
            nickName: 'associateSuccNum',
          },{
            value: 0,
            name: '认证失败数',
            nickName: 'authFailNum'
          },{
            value: 0,
            name: '认证成功数',
            nickName: 'authSuccNum'
          },{
            value: 0,
            name: 'Dhcp失败数',
            nickName: 'dhcpFailNum'
          },{
            value: 0,
            name: 'Dhcp成功数',
            nickName: 'dhcpSuccNum'
          }]
      },
      dashboardValue: {
        isShow: false,
        value: 0
      }
    }
  },
  methods: {
    /**
     * 站点选择器
     */
    handleSiteSelect(e) {
      this.$store.commit('setSiteNode', e)
      this.$store.commit('setSiteId', e.id)
      setTimeout(() => {
        this.getDashboardData()
      }, 1000)
    },
    handleTimeStamp(e){
      this.$store.commit('setTime', e)
    },
    /**
     * 登录信息、用户信息、信息框
     */
    async getLoginUserMessage() {
      const conf = API.auth.getLoginUserMsg()
      const data = await this.$axios(conf)
      if (data.status === 200) {
        delete data.data.data.type
        this.serverInfo = {...this.serverInfo, ...data.data.data}
      }
    },
    /**
     * 获取状态框信息
     */
    getGeneralStateMsg() {
      this.totalUserDevice()
      this.totalFloorDevice()
      this.totalSDNDevice()
    },
    async totalUserDevice() {
      const conf = API.sdn.getUserLocation()
      const users = await this.$axios(conf)
      if (users.status !== 200){
        return 
      }
      const arr = Object.keys(users.data.data)
      this.card.device.total = arr.length
      return arr.length
    },
    async totalFloorDevice() {
      const conf = API.sdn.getFloorDevice('857b706e-67d9-49c0-b3cd-4bd1e6963c07', 1)
      const apis = await this.$axios(conf)
      if (apis.status !== 200){
        return 
      }
      const total = apis.data.data.apList.AP.length
      this.card.apMessage.total = total
      return total
    },
    async totalSDNDevice() {
      const conf = API.sdn.getUserList()
      const users = await this.$axios(conf)
      if (users.status !== 200){
        return 
      }
      this.card.totalDevice.total = users.data.data.totalSize
      return users.data.data.totalSize
    },
    /**
     * 获取Annular组件数据
     */
    async getAnnularData() {
      const conf = API.sdn.getErr(0, 1597826900000, 1597766400000,
                                              this.$store.state.siteMsg.siteId, 0)
      const data = (await this.$axios(conf)).data.data
      if (data == null){
        this.annular.isShow = false
        return 
      }
      let t2 = data.reduce((total, n) => {
        Object.keys(n).forEach(k => {
          total[k] += n[k]
        })
        return total
      })

      this.annular.items.forEach((item) => {
        item.value = t2[item.nickName]
      })
      this.annular.isShow = true
    },
    async getDashboardData() {
      const conf = API.sdn.getDeviceTotalMsg(this.$store.state.timeFrame[0], this.$store.state.timeFrame[1],
                  0, this.$store.state.siteMsg.siteId)
      const total = (await this.$axios(conf)).data
      console.log(total)
      const totalRate = total.data.totalRate
      if((typeof totalRate) === 'undefined'){
        this.dashboardValue.value = 0
        this.dashboardValue.isShow = false
      }
      this.dashboardValue.value = totalRate
      // console.log(totalRate, typeof totalRate)
      // const totalDevice = this.card.device.total
      // let r = totalRate / totalDevice
      // this.dashboard.value = totalRate
    }
  },
  mounted() {
    this.getGeneralStateMsg()
    this.getLoginUserMessage()
    this.getAnnularData()
    this.getDashboardData()
    // this.getDashboardData()
  }
}
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
