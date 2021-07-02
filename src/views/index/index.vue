<template>
  <div class="overview">
    <!-- 状态总览 -->
    <GeneralState
    :cardMessage="card">
    </GeneralState>
    <!-- 环形卡片 -->
    <AnnularCard></AnnularCard>
    <!-- 仪表盘 -->
    
  </div>
</template>
<script>
import GeneralState from '../../components/fGeneralStateView.vue'
import AnnularCard from '../../components/fAnnularCard.vue'

import DeviceBlock from '../../components/fDeviceBlock.vue'

export default {
  components: {
    GeneralState,
    AnnularCard
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
        ip: '1.1.1.1',
        lastLogin: '2018-12-01'
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.overview {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}
.overview div{
  margin: 0 15px;
}
</style>
