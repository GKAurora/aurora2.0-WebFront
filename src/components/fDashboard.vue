<template>
  <el-card class="dashboard-card">
        <div slot="header" class="clearfix">
          <span>设备状态概览</span>
        </div>
        <div class="dashboard-card-content">
            <Dashboard></Dashboard>
        </div>
    </el-card>
</template>

<script>
import Dashboard from './others/Dashboard.vue'

export default {
    components: {
        Dashboard
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.dashboard-card {
    .dashboard-card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>