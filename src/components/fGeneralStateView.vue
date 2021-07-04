<template>
    <el-card class='general-state-view-card'>
        <div slot='header' class='clearfix'>
          <span>设备状态概览</span>
        </div>
        <div class='general-state-view-content'>
        <MessageCard
          class='general-state-view-item'
          v-for='(value, index) in cardMessage'
          :key='index'
          :cardData='value'
        ></MessageCard>
        </div>
    </el-card>
</template>

<script>
import MessageCard from './fDeviceBlock.vue'
export default {
  components: {
    MessageCard,
  },
  props: ['cardMessage']
}
</script>

<style lang='scss' scoped>
.general-state-view-card{
  margin: 15px 0 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  .general-state-view-title {
    border-bottom: 1px solid #999;
  }
  .general-state-view-content {
    display: flex;
    padding: 20px 10px;
    .general-state-view-item {
      padding: 0 15px;
      overflow: hidden;
    }
  }
}
</style>