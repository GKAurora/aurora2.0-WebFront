<template>
<div>
  <el-card>
    <div class='block_1'>
        <div class='block_1_1'>
          <img :src='views' id='img' style='width:25px; height: 15px; margin-right: 15px;' @click='hid_show()'><span>查看日志</span>
          <div :data="SiteList" class="SiteList">
            <el-radio-group
              v-model="radio"
              v-for="(site, index) in SiteList"
              :key="site.id"
              size="medium"
            >
              <el-radio-button
                :label="site.name"
                :key="site.id"
                @click.native="getSer(site.id, index)"
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class='block_1_2' v-show='hidden_show'>
          <el-divider></el-divider>
          <el-table
    :data='tableData'
    height='450'
    border
    style='width: 100%'>
    <el-table-column
      prop='timestamp'
      label='时间'
      width='180'>
    </el-table-column>
    <el-table-column
      prop='accessTotalNum'
      label='关联总数'
      width='180'>
    </el-table-column>
    <el-table-column
      prop='associateSuccNum'
      label='关联成功数'>
    </el-table-column>
    <el-table-column
      prop='associateFailNum'
      label='关联失败数'>
    </el-table-column>
    <el-table-column
      prop='authSuccNum'
      label='认证通过数'>
    </el-table-column>
    <el-table-column
      prop='authFailNum'
      label='认证失败数'>
    </el-table-column>
    <el-table-column
      prop='dhcpSuccNum'
      label='DHCP成功数'>
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
import API from '../../api'
export default {
  data () {
    return {
      hidden_show: false,
      views: close,
      name: '',
      index: 2,
      // 地区选择
      radio: 'Shenzhen',
      // 获取站点信息携带的参数
      SitequeryInfo: {
        queryInfoSite_id: '/'
      },
      queryInfo: {
        acc_type: 0,
        end_time: Date.now(), // 结束时间
        level: 1,
        site_id: '857b706e-67d9-49c0-b3cd-4bd1e6963c07', // 站点id
        start_time: Date.now() - 1000 * 60 * 60 * 24 * parseInt(7) // 前七天的时间
      },
      SiteList: [],
      tableData: []
    }
  },
  mounted () {
    this.getSitesMessage()
    this.getErr()
  },
  methods: {
    async getSitesMessage () {
      try {
        const conf = API.sdn.getSitesMessage(this.queryInfoSite_id)
        const data = await this.$axios(conf)
        if (data.data.code === 200) {
          this.SiteList = data.data.data
          console.log(data.data.data)
          return true
        }
        return false
      } catch (error) {
        this.$message({
          message: '获取站点信息失败',
          type: 'error'
        })
      }
    },
    async getErr () {
      try {
        const conf1 = API.sdn.getErr(
          this.queryInfo.acc_type,
          this.queryInfo.end_time,
          this.queryInfo.start_time,
          this.queryInfo.site_id,
          this.queryInfo.level
        )
        const data1 = await this.$axios(conf1)
        // console.log(data1)
        if (data1.data.code === 200) {
          this.tableData = data1.data.data
          for (let i = 0; i < this.tableData.length; i++) {
            let time = this.tableData[i].timestamp
            let data_time = new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
            this.tableData[i].timestamp = data_time
          }
          return true
        }
        return false
      } catch (error) {
        this.$message({
          message: '获取信息失败',
          type: 'error'
        })
        console.log(error)
      }
    },
    getSer (site_id, index) {
      // 记录当前选中状态
      this.index = index
      this.queryInfo.site_id = site_id
      var flag = this.getErr()
      if (flag) {
        this.$message({
          message: '查询成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '暂无数据',
          type: 'error'
        })
      }
    },
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
  // box-sizing: border-box;
  // box-shadow: 10px 10px 5px #bebdbd;
  // border-radius: .5em;
}
.SiteList {
  float: right;
}
</style>
