<template>
  <!-- <div class="annular-card">
      <Annular></Annular>
  </div> -->
  <el-card class="annular-card">
        <div slot="header" class="clearfix">
          <span>接入失败信息</span>
        </div>
        <div class="annular-card-content">
            <Annular
            :items="annularData"
            ></Annular>
        </div>
    </el-card>
</template>

<script>
import Annular from './others/Annular.vue'
export default {
    components: {
        Annular
    },
    props: {
        annularData: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
.annular-card{
    // min-width: 500px;
    // width: 100%;
    .annular-card-content{
        overflow: hidden;
    }
}
</style>