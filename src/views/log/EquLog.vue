<template>
  <div class='test'>
    <el-tabs :tab-position='tabPosition'>
      <el-tab-pane>
        <span slot='label'><i class='el-icon-tickets'></i> 设备日志</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot='label'><i class='el-icon-document'></i> 用户日志</span>
      </el-tab-pane>
    </el-tabs>
    <p>Hello World</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: 'bottom',
    };
  },
};
</script>
<style lang='scss' scoped>
.test {
  // border: 1px solid red;
  margin-left: 250px;
}
</style>