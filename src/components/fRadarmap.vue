<template>
  <el-card class="dashboard-card">
        <div slot="header" class="clearfix">
          <span>设备状态概览</span>
        </div>
        <div class="dashboard-card-content">
            <Radarmap
            :value="radarMapValue"
            ></Radarmap>
        </div>
    </el-card>
</template>

<script>
import Radarmap from './others/RadarMap.vue'

export default {
    props: ['radarMapValue'],
    components: {
        Radarmap
    }
}
</script>

<style lang="scss" scoped>
.dashboard-card {
    .dashboard-card-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

