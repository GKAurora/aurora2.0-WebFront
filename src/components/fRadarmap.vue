<template>
  <el-card class="dashboard-card">
        <div slot="header" class="clearfix">
          <span>设备状态概览</span>
        </div>
        <div class="dashboard-card-content">
            <Radarmap></Radarmap>
        </div>
    </el-card>
</template>

<script>
import Radarmap from './others/RadarMap.vue'

export default {
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

