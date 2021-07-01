<template>
<div>
  <el-card>
    <div class='block_1'>
        <!-- <div class='block_1_1'><el-link class='el-icon-open' style='margin-right: 5px;' @click='hid_show()'></el-link>
          <span>关联失败：2 认证失败：0 DHCP失败：0</span>
        </div> -->
        <div class='block_1_1'>
          <img :src='views' id='img' style='width:25px; height: 15px; margin-right: 15px;' @click='hid_show()'><span>查看日志</span>
        </div>
        <div class='block_1_2' v-show='hidden_show'>
          <el-divider></el-divider>
          <el-table
    :data='tableData'
    height='450'
    border
    style='width: 100%'>
    <el-table-column
      prop='date'
      label='时间'
      width='180'>
    </el-table-column>
    <el-table-column
      prop='name'
      label='类型'
      width='180'>
    </el-table-column>
    <el-table-column
      prop='address'
      label='AP名称'>
    </el-table-column>
    <el-table-column
      prop='address'
      label='SSID'>
    </el-table-column>
    <el-table-column
      prop='address'
      label='原因'>
    </el-table-column>
          </el-table>
        </div>
    </div>
  </el-card>
</div>
</template>
<script>
import open from '../../assets/img/about/open.png'
import close from '../../assets/img/about/close.png'
export default {
  data () {
    return {
      hidden_show: false,
      views: close,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      ]
    }
  },
  methods: {
    hid_show () {
      if (this.views == close) {
        this.views = open
      } else {
        this.views = close
      }
      this.hidden_show = !this.hidden_show
    }
  }
}
</script>
<style lang='scss' scoped>
.block_1{
  box-sizing: border-box;
  box-shadow: 10px 10px 5px #bebdbd;
  border-radius: .5em;
}
</style>
