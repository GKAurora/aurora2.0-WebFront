<template>
<div>
  <el-card>
    <div class='block'>
        <div class='block-content'>
          <img :src='views' id='img' style='width:25px; height: 15px; margin-right: 15px;' @click='hid_show()'><span>查看站点日志</span>
          <TimeSelector @dateStamp="handleTimeStamp"></TimeSelector>
        </div>
        <div class='block-table' v-show='hiddenshow'>
          <el-divider></el-divider>
          <el-table
    :data='tableData'
    height="600"
    border
    stripe
    v-loading = "pictLoading"
    element-loading-spinner = "el-icon-loading"
    element-loading-text = "数据正在加载中"
    style='width: 100%'>
    <el-table-column
      prop='timestamp'
      label='时间'
      width=''>
    </el-table-column>
    <el-table-column
      prop='accessTotalNum'
      label='关联总数'
      width=''>
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
import TimeSelector from '../../components/timeSelector.vue'
import { mapState } from 'vuex'
import API from '../../api'
export default {
  components: {
    TimeSelector
  },
  computed: {
    ...mapState(['timeFrame'])
  },
  data () {
    return {
      hiddenshow: false,
      views: close,
      pictLoading: false,
      // // 地区选择
      radio: 'Shenzhen',
      // // 获取站点信息携带的参数
      SitequeryInfo: {
        queryInfoSite_id: '/'
      },
      queryInfo: {
        acctype: 0,
        endtime: this.$store.state.timeFrame[1], // 结束时间
        level: 1,
        siteid: this.$store.state.siteMsg.siteId || '857b706e-67d9-49c0-b3cd-4bd1e6963c07', // 站点id
        starttime: this.$store.state.timeFrame[0] // 开始时间
      },
      currentSiteNode: this.$store.state.siteMsg.currentSiteNode.name, // 当前站点名
      // SiteList: [],
      tableData: []
    }
  },
  methods: {
    async getErr () {
      try {
        const conf1 = API.sdn.getErr(
          this.queryInfo.acctype,
          this.queryInfo.endtime,
          this.queryInfo.starttime,
          this.queryInfo.siteid,
          this.queryInfo.level
        )
        this.pictLoading = true
        const data1 = await this.$axios(conf1)
        this.pictLoading = false
        let newTabledata
        // console.log(data1)
        if (data1.data.code === 200) {
          newTabledata = data1.data.data
          for (let i = 0; i < newTabledata.length; i++) {
            let time = newTabledata[i].timestamp
            let datatime = new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
            newTabledata[i].timestamp = datatime
            this.tableData.push(newTabledata[i])
          }
          this.$message({
            message: '获取信息成功',
            type: 'success'
          })
          // return true
        }
        // return false
      } catch (error) {
        this.$message({
          message: '获取信息失败',
          type: 'error'
        })
        console.log(error)
      }
    },
    handleTimeStamp (e) {
      this.$store.commit('setTime', e)
    },
    hid_show () {
      if (this.views == close) {
        this.views = open
      } else {
        this.views = close
      }
      this.hiddenshow = !this.hiddenshow
    }
  },
  mounted () {
    this.getErr()
  },
  activated () {
    this.getErr()
    // console.log(this.tableData);
  },
  watch: {
    'timeFrame': function (newval, oldval) {
      this.queryInfo.starttime = newval[0]
      this.queryInfo.endtime = newval[1]
      this.tableData = []
      this.getErr()
    }
  }
}
</script>
<style lang='scss' scoped>
.block-content{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-around;
}
.block-content div{
  padding: 5px 20px;
}
</style>
