<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div class="grid-content bg-purple">TopN应用流量</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">TopN主机流量</div
        ></el-col>
      </el-row>
    </el-card>
    <br/>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12"
          ><div class="grid-content bg-purple">TopN会话流量</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">TopN DSCP流量</div></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>

</style>