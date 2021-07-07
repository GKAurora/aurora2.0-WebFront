<template>
  <el-card class="dashboard-card">
        <div slot="header" class="clearfix">
          <span>设备总速率</span>
        </div>
        <div class="dashboard-card-content">
            <Dashboard
            :value="dashboardValue"
            ></Dashboard>
        </div>
    </el-card>
</template>

<script>
import Dashboard from './others/Dashboard.vue'

export default {
    components: {
        Dashboard
    },
    props: {
        dashboardValue: {
            type: Number
        }
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