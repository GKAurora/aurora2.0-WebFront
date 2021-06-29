<template>
  <div>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row>
        <el-col :span="6">
          <div>
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="6">
          
          <div class="block">
            <el-date-picker
              v-model="value1"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              editable
              value-format="timestamp"
            >
            </el-date-picker>
            <span>时间戳:{{value1}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            
            <el-time-picker
              is-range
              v-model="value"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="timestamp"
            >
            </el-time-picker>
            <span>时间戳：{{value}}</span>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <br />
      <!--用户列表区域-->
      <el-table :data="UserList" border stripe>
        <!--索引列 type="index"-->
        <el-table-column
          type="index"
          label="序号"
          width="70px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          prop="userName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="MAC地址"
          prop="userMac"
          align="center"
        ></el-table-column>
        <el-table-column
          label="所属区域"
          prop="reGion"
          align="center"
        ></el-table-column>
        <el-table-column
          label="接入类型"
          prop="accessType"
          align="center"
        ></el-table-column>
        <el-table-column
          label="接入时间"
          prop="accessTime"
          align="center"
        ></el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 5, 8, 10]"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //地区选择
      radio: "上海",
      //时间选择
      value: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours()-6,
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
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", date);
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1:new Date(),
      //获取用户参数列表的对象时携带的参数
      queryInfo: {
        query: "", //搜索时传递的参数
        pagenum: 1, //页数
        pagesize: 2, //每一页的数据总数
      },
      //列表数据
      UserList: [
        {
          index: "1",
          userName: "小屋",
          userMac: "cc-bb-fe-1e-18-e0",
          reGion: "深圳",
          accessType: "无线接入",
          accessTime: "2021-6-11",
          state: true,
        },
        {
          index: "2",
          userName: "小九",
          userMac: "cc-bb-fe-1e-18-e0",
          reGion: "广州",
          accessType: "有线接入",
          accessTime: "2021-5-01",
          state: true,
        },
      ],
      //数据总条数
      total: 0,
    };
  },
  created() {
  },
  methods: {
    //获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.UserList = res.data.users;
      this.total = res.data.total;
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页面值的改变
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.getUserList();
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
