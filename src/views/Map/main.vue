<template>
<div>
  <el-tabs :tab-position='tabPosition' style='height: auto;' type='border-card' tab-remove>
    <el-tab-pane label='店铺信息'><map-location></map-location></el-tab-pane>
    <el-tab-pane label='店铺流量'>配置管理</el-tab-pane>
    <!-- <el-tab-pane label='角色管理'>角色管理</el-tab-pane>
    <el-tab-pane label='定时任务补偿'>定时任务补偿</el-tab-pane> -->
  </el-tabs>
  </div>
</template>
<script>
import mapLocation from './index'
export default {
  name: 'MapMain',
  data () {
    return {
      tabPosition: 'right'
    }
  },
  components: {
    'map-location': mapLocation
  }
}
</script>
