<template>
  <el-card class="MemoryInfo-card">
        <div slot="header" class="clearfix">
          <span>内存使用情况</span>
        </div>
        <div class="MemoryInfo-card-content">
            <MemoryInfo
            :items="MemoryInfoValue"
            ></MemoryInfo>
        </div>
    </el-card>
</template>

<script>
import MemoryInfo from './others/MemoryInfo.vue'

export default {
    components: {
        MemoryInfo
    },
    props: {
        MemoryInfoValue: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
.MemoryInfo-card {
    .MemoryInfo-card-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>