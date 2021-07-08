<template>
  <el-card class="CpuRate-card">
        <div slot="header" class="clearfix">
          <span>CPU使用率</span>
        </div>
        <div class="CpuRate-card-content">
            <CpuRate
            :value="CpuRateValue"
            ></CpuRate>
        </div>
    </el-card>
</template>

<script>
import CpuRate from './others/CpuRate.vue'

export default {
    components: {
        CpuRate
    },
    props: {
        CpuRateValue: {
            type: Number
        }
    }
}
</script>

<style lang="scss" scoped>
.CpuRate-card {
    .CpuRate-card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>