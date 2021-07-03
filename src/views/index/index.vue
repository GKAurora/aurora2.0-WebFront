<template>
  <div class="overview">
    <!-- 状态总览 -->
    <GeneralState
    :cardMessage="card">
    </GeneralState>
    <!-- 信息卡片 -->
    <MessageCard
    :Message="serverInfo"
    ></MessageCard>
    <!-- 环形卡片 -->
    <AnnularCard></AnnularCard>
    <!-- 仪表盘 -->
    
  </div>
</template>
<script>
import GeneralState from '../../components/fGeneralStateView.vue'
import AnnularCard from '../../components/fAnnularCard.vue'
import MessageCard from '../../components/fMessageCard.vue'
import DeviceBlock from '../../components/fDeviceBlock.vue'
import API from '../../api'

export default {
  components: {
    GeneralState,
    AnnularCard,
    MessageCard
  },
  name: 'page',
  data () {
    return {
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
        ip: '127.0.0.1',
        last_login: 'xxxxxxxx'
      }
    }
  },
  methods: {
    async getLoginUserMessage() {
      const conf = API.auth.getLoginUserMsg()
      const data = await this.$axios(conf)
      if (data.status === 200) {
        delete data.data.data.type
        this.serverInfo = {...this.serverInfo, ...data.data.data}
      }

    },
    getGeneralStateMsg() {

    }
  },
  mounted() {
    this.getLoginUserMessage()
  }
}
</script>
<style scoped>
.overview {
  display: flex;
  align-content: stretch;
}
.overview div{
  margin: 0 15px;
  min-width: 400px;
}
</style>
