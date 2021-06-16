<template>
  <div>
    <!-- 面包屑导航
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <br />
      <!--用户列表区域-->
      <el-table :data="UserList" border stripe>
        <!--索引列 type="index"-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <!--由于后台状态数据是true或false，所以需要做数据转换-->
        <el-table-column label="状态">
          <!--slot-scope="scope"作用域插槽-->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!--slot-scope="scope"：拿到点击修改行的数据-->
          <template slot-scope="scope">
            <!--修改  scope.row.id：是拿到修改行的id，通过查询，把原始数据渲染到表单中-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!--删除-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!--分配角色-->
            <el-tooltip
              effect="dark"
              content="修改权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!--添加用户的对话框-->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!--内容主题区域-->
        <!-- <el-form
          :model="addForm"
          :rules="addFromRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form> -->
        <el-row>
          <el-col :span="24">
            <el-table
              :data="master_user.tableData"
              border
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column type="index"> </el-table-column>
              <el-table-column
                v-for="(v, i) in master_user.columns"
                :key="v.label"
                :prop="v.field"
                :label="v.title"
                :width="v.width"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input
                      size="mini"
                      placeholder="请输入内容"
                      v-model="master_user.sel[v.field]"
                    >
                    </el-input>
                  </span>
                  <span v-else>{{ scope.row[v.field] }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
            prop="username"
            label="用户名"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="160" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="140" align="center">
          </el-table-column>
          <el-table-column prop="role" label="角色" width="120" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120" align="center">
          </el-table-column> -->

              <el-table-column
                fixed="right"
                label="操作"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <!--编辑-->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    style="cursor: pointer"
                    @click="pwdChange(scope.row, scope.$index, true)"
                  ></el-button>
                  <!--删除-->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    v-if="!scope.row.isSet"
                    style="cursor: pointer"
                  ></el-button>
                  <el-button
                    v-else
                    icon="el-icon-delete"
                    style="cursor: pointer"
                    @click="pwdChange(scope.row, scope.$index, false)"
                  >
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div
              class="el-table-add-row"
              style="width: 99.2%"
              @click="addMasterUser()"
            >
              <span>+ 添加</span>
            </div>
          </el-col>

          <!--底部区域-->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-row>
      </el-dialog>
      <!--修改用户对话框-->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="号码" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
 <!-- import JavaScript -->
 
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
export default {
  data() {
    //自定义邮箱校验规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    //自定义手机号码校验规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号码"));
    };
    return {
      //获取用户参数列表的对象时携带的参数
      queryInfo: {
        query: "", //搜索时传递的参数
        pagenum: 1, //页数
        pagesize: 2, //每一页的数据总数
      },
      //列表数据
      UserList: [],
      //数据总条数
      total: 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加表单的验证规则
      addFromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "用户名长度在3-10个字符之间" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "用户名长度在5-10个字符之间" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      //根据id查询到的用户信息
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      //添加用户表单数据
      // tableData: [
      //   {
      //     index: "1",
      //     username: "小屋",
      //     password: "123456",
      //     phone:'15766329736',
      //     email: "2420674058@qq.com",
      //     role: "超级管理员",
      //     state: "true",
      //   },
      // ],
      master_user: {
        sel: null, //选中行
        columns: [
          { field: "username", title: "用户名", width: 120 },
          { field: "password", title: "密码", width: 120 },
          { field: "email", title: "邮箱", width: 160 },
          { field: "phone", title: "联系方式", width: 140 },
          { field: "role", title: "角色", width: 120 },
          { field: "state", title: "状态", width: 120 },
        ],
        tableData: [],
      },
      //根据ID删除用户
      async removeUserById(id) {
        //弹窗（询问是否删除）
        const confirmResult = await this.$confirm(
          "此操作将永久删除该用户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((err) => err);
        //如果用户确认删除，返回字符串confirm
        //如果用户取消删除，返回字符串cancel
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消删除");
        }
        const { data: res } = await this.$http.delete("users/" + id);
        if (res.meta.status !== 200) {
          return this.$message.error("删除用户失败!");
        }
        this.$message.success("删除用户成功");
        this.getUserList();
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //读取表格数据
    readMasterUser() {
      //根据实际情况，自己改下啊
      this.master_user.data.map((i) => {
        i.id = generateId.get(); //模拟后台插入成功后有了id
        i.isSet = false; //给后台返回数据添加`isSet`标识
        return i;
      });
    },
    //添加账号
    addMasterUser() {
      for (let i of this.master_user.data) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      let j = {
        id: 0,
        username: "",
        password: "",
        email: "",
        phone: "",
        role: "",
        state: "",
        isSet: true,
        _temporary: true,
      };
      this.master_user.data.push(j);
      this.master_user.sel = JSON.parse(JSON.stringify(j));
    },
    //修改
    pwdChange(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.master_user.data) {
        if (i.isSet && i.id != row.id) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!this.master_user.sel.id) this.master_user.data.splice(index, 1);
        return (row.isSet = !row.isSet);
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
        (function () {
          let data = JSON.parse(JSON.stringify(this.master_user.sel));
          for (let k in data) row[k] = data[k];
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          //然后这边重新读取表格数据
          this.readMasterUser();
          row.isSet = false;
        })();
      } else {
        this.master_user.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
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
    //监听
    async userStateChange(userinfo) {
      console.log(userinfo);
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户数据失败!");
      }
      this.$message.success("更新用户状态成功!");
    },
    //监听添加用户输入框的关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //点击确定，添加新用户，并做校验
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //添加用户
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 200) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        //隐藏添加用户对话框
        this.addDialogVisible = false;
        //刷新用户列表
        this.getUserList();
      });
    },
    //修改用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status != 200) {
        return this.$message.error("查询用户失败");
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //监听修改用户对话框的显示
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //发起修改请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          { email: this.editForm.email, mobile: this.editForm.mobile }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户信息失败!");
        }
        //关闭对话框
        this.editDialogVisible = false;
        //刷新数据列表
        this.getUserList();
        //提示修改成功
        this.$message.success("更新用户数据成功！");
      });
    },
  },
};
</script>
<style lang="css" scoped>

.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
</style>