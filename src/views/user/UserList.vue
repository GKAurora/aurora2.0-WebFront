<template>
  <div>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row>
        <el-col :span='7'>
          <div :data='SiteList'>
            <el-radio-group
              v-model='radio'
              v-for='(site, index) in SiteList'
              :key='site.id'
              size='medium'
            >
              <el-radio-button
                :label='site.name'
                :key='site.id'
                @click.native='getSer(site.id, index)'
              ></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span='4'>
          <div class='block'>
            <el-date-picker
              v-model='value1'
              align='right'
              type='date'
              placeholder='选择日期'
              :picker-options='pickerOptions'
              editable
              value-format='timestamp'
            >
            </el-date-picker>
            <!-- <span>时间戳:{{value1}}</span> -->
          </div>
        </el-col>
        <el-col :span='7'>
          <div>
            <el-time-picker
              is-range
              v-model='value'
              range-separator='至'
              start-placeholder='开始时间'
              end-placeholder='结束时间'
              placeholder='选择时间范围'
              value-format='timestamp'
            >
            </el-time-picker>
            <!-- <span>时间戳：{{value}}</span> -->
          </div>
        </el-col>
        <el-col :span='3'>
          <el-dropdown>
            <el-button type='primary'>
              用户类型<i class='el-icon-arrow-down el-icon--right'></i>
            </el-button>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item @click.native='getUser()'
                >所有用户</el-dropdown-item
              >
              <el-dropdown-item @click.native='getNull()'
                >有线用户</el-dropdown-item
              >
              <el-dropdown-item @click.native='getUser()'
                >无线用户</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span='3'>
          <el-button type='primary' @click='editDialogVisible = true'
            >详细信息</el-button
          >
        </el-col>
      </el-row>
      <br />
      <!--用户列表区域-->
      <el-table :data='UserList' border stripe>
        <!--索引列 type='index'-->
        <el-table-column
          type='index'
          label='序号'
          width='70px'
          align='center'
        ></el-table-column>
        <el-table-column
          label='用户名'
          prop='userName'
          align='center'
        ></el-table-column>
        <el-table-column
          label='MAC地址'
          prop='userMac'
          align='center'
        ></el-table-column>
        <el-table-column
          label='设备厂商'
          prop='vendor'
          align='center'
        ></el-table-column>
        <el-table-column
          label='接入总次数'
          prop='joinTotalTimes'
          align='center'
        >
        </el-table-column>
        <el-table-column label='接入类型' prop='accessType' align='center'>
          <template slot-scope='scope'>
            <span v-if='scope.row.accessType === 1'>无线用户</span>
            <span v-else>有线用户</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :page-sizes='[5, 10, 20, 40, 100]'
        :current-page='queryInfo.page'
        :page-size='queryInfo.page_size'
        layout='total, sizes, prev, pager, next, jumper'
        :total='total'
      >
      </el-pagination>
      <!--详细信息-->
      <el-dialog
        title='用户详细信息'
        :visible.sync='editDialogVisible'
        width='50%'
      >
        <el-card class='box-card'>
          <div
            style='font-size: 16px; padding: 12px'
            :data='UserList'
            v-for='name in UserList'
            :key='name.userMac'
          >
            <el-row>
              <el-col :span='7'
                ><div class='grid-content bg-purple'>
                  用户名：<span v-text='name.userName'>10</span>
                </div></el-col
              >
              <el-col :span='9'
                ><div class='grid-content bg-purple-light'>
                  用户 MAC：<span v-text='name.userMac'>12</span>
                </div></el-col
              >
              <el-col :span='4'
                ><div class='grid-content bg-purple'>
                  VIP用户：<span v-text='name.vipType == 0 ? "否" : "是"'
                    >12</span
                  >
                </div></el-col
              >
            </el-row>
            <br />
            <el-row>
              <el-col :span='16' style='text-algin: center'
                ><div class='grid-content bg-purple'>
                  设备厂商：<span v-text='name.vendor'>12</span>
                </div></el-col
              >
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  接入时间：<span
                    v-text='
                      new Date(parseInt(name.accTime))
                        .toLocaleString()
                        .replace(/:\d{1,2}$/, " ")
                    '
                    >12</span
                  >
                </div></el-col
              >
            </el-row>
            <br />
            <el-row>
              <el-col :span='7'
                ><div class='grid-content bg-purple'>
                  总接入次数：<span v-text='name.joinTotalTimes'>12</span>
                </div></el-col
              >
              <el-col :span='8'
                ><div class='grid-content bg-purple-light'>
                  接入失败次数：<span v-text='name.joinFailTimes'>12</span>
                </div></el-col
              >
              <el-col :span='9'
                ><div class='grid-content bg-purple-light'>
                  第一次接入时间：<span
                    v-text='
                      new Date(parseInt(name.minAccTime))
                        .toLocaleString()
                        .replace(/:\d{1,2}$/, " ")
                    '
                    >12</span
                  >
                </div></el-col
              >
            </el-row>
            <br />
            <el-row>
              <el-col :span='7'
                ><div class='grid-content bg-purple'>
                  总体验时长：<span v-text='name.totalTimes'>12</span>
                </div></el-col
              >
              <el-col :span='9'
                ><div class='grid-content bg-purple-light'>
                  最近接入：<span v-text='name.lastJoinRes'>12</span>
                </div></el-col
              >
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  平均接入耗时：<span v-text='name.joinCostTimeAvg'>12</span>
                </div></el-col
              >
            </el-row>
            <br />
            <el-row>
              <el-col :span='7'
                ><div class='grid-content bg-purple'>
                  平均RSSI：<span v-text='name.rssiAvg'>12</span>
                </div></el-col
              >
              <el-col :span='9'
                ><div class='grid-content bg-purple-light'>
                  平均速率：<span v-text='name.rateAvg'>12</span>
                </div></el-col
              >
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  平均信噪比：<span v-text='name.snrAvg'>12</span>
                </div></el-col
              >
            </el-row>
            <br />
            <el-row>
              <el-col :span='7'
                ><div class='grid-content bg-purple'>
                  总流量：<span v-text='name.totalBytes'>12</span>
                </div></el-col
              >
              <el-col :span='9'
                ><div class='grid-content bg-purple-light'>
                  时延：<span v-text='name.latency'>12</span>
                </div></el-col
              >
              <el-col :span='8'
                ><div class='grid-content bg-purple'>
                  丢包率：<span v-text='name.packetloss'>12</span>%
                </div></el-col
              >
            </el-row>
            <br />
            <hr />
          </div>
        </el-card>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import API from '../../api';
export default {
  data() {
    return {
      name: '',
      index: 2,
      //地区选择
      radio: 'Shenzhen',
      //时间选择
      value: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() - 6,
          new Date().getMinutes()
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes()
        ),
      ],
      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', date);
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      value1: new Date(),
      //控制详细信息对话框的显示与隐藏
      editDialogVisible: false,
      //获取站点信息携带的参数
      SitequeryInfo: {
        queryInfoSite_id: '/',
      },
      //获取用户参数列表的对象时携带的参数
      queryInfo: {
        level: 1,
        page: 1, //页数
        page_size: 10, //每一页的数据总数
        site_id: '857b706e-67d9-49c0-b3cd-4bd1e6963c07', //站点id
      },
      //存储站点信息
      SiteList: [],
      //存储用户列表数据
      UserList: [],
      //数据总条数
      total: 0,
    };
  },
  mounted() {
    this.getSitesMessage();
    this.getUserList();
  },
  methods: {
    //获取站点信息
    async getSitesMessage() {
      try {
        const conf = API.sdn.getSitesMessage(
          this.SitequeryInfo.queryInfoSite_id
        );
        const data = await this.$axios(conf);
        if (data.status === 200) {
          this.SiteList = data.data.data;
          return true;
        }
        return false;
      } catch (error) {
        this.$message({
          message: '获取站点信息失败',
          type: 'error',
        });
      }
    },
    //获取用户列表数据
    async getUserList() {
      try {
        const conf = API.sdn.getUserList(
          this.queryInfo.level,
          this.queryInfo.site_id,
          this.queryInfo.page,
          this.queryInfo.page_size
        );
        const data = await this.$axios(conf);
        if (data.status === 200) {
          //存储用户列表数据
          this.UserList = data.data.data.tableData;
          //存储用户列表列数
          this.total = data.data.data.totalSize;
        }
      } catch (error) {
        this.$message({
          message: '获取用户数据失败',
          type: 'error',
        });
      }
    },
    //选择不同地区，展示不同用户列表
    getSer(site_id, index) {
      //记录当前选中状态
      this.index = index;
      this.queryInfo.site_id = site_id;
      var flag = this.getUserList();
      if (flag) {
        this.$message({
          message: '查询成功',
          type: 'success',
        });
      } else {
        this.$message({
          message: '暂无数据',
          type: 'error',
        });
      }
    },
    //全部用户、无线用户()
    getUser() {
      //判断当前是否为深圳站点（这种解决方法需要优化）
      if (this.index == 2) {
        this.getSer('857b706e-67d9-49c0-b3cd-4bd1e6963c07', 2);
      } else {
        this.$message({
          message: '暂无数据',
          type: 'info',
        });
      }
    },
    //有线用户
    getNull() {
      this.$message({
        message: '暂无数据',
        type: 'info',
      });
      this.UserList = [];
      this.total = 0;
    },
    //监听page_size改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.page_size = newSize;
      this.getUserList();
    },
    //监听页面值的改变
    handleCurrentChange(newSize) {
      this.queryInfo.page = newSize;
      this.getUserList();
    },
  },
};
</script>
<style lang='scss' scoped>
.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 40px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
