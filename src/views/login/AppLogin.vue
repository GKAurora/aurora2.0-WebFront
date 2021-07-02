<template>
  <div class="page">
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
        status-icon
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            auto-complete="off"
            placeholder="账号"
            id="loginEmail"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            auto-complete="off"
            placeholder="密码"
            id="loginPassword"
            prefix-icon="el-icon-key"
            @keyup.enter='handleSubmit'
          ></el-input>
          <!-- <label id='showPasswordToggle'>
            <el-checkbox v-model='checked' id='showPasswordCheck'>显示密码</el-checkbox>
          </label>
          <router-link to='/' style='float: right; color: #bbbbbb'>忘记密码？</router-link> -->
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleSubmit"
            :loading="logining"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item style="width: 100%">
          <router-link to="/register">
            <el-button style="width: 100%"> 注册 </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import sha256 from 'crypto-js/sha256'
import { requestLogin } from "@/api/user";
import API from "../../api";

export default {
  name: "app-login",
  data() {
    return {
      logining: false,
      fromUrl: "/",
      ruleForm: {
        account: "admin",
        checkPass: "admin",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
    };
  },
  methods: {
    async handleSubmit() {
      
      try {
        const conf = API.auth.login(this.ruleForm.account, this.ruleForm.checkPass);
        const data = await this.$axios(conf)
        if (data.status === 200) {
          // 存储token
          localStorage.setItem('user-token', data.data.data.token)
          this.$message({
            message: "登录成功",
            type: "success",
          });
          // 跳转路由
          this.$router.push(this.fromUrl)
          return
        }
        this.$message({
            message: `${data.data.message}`,
            type: "error",
          });
      } catch (error) {
        console.log('err', error)
        this.$message({
          message: "登录失败",
          type: "error",
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.fullPath !== "/register" && !from.meta.errorPage) {
        vm.fromUrl = from.fullPath;
      }
    });
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
  color: rgba(132, 213, 245, 0.719);
}

.page {
  /* background: url("../../assets/img/about/bg.gif") no-repeat; */
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  box-shadow: 10px 10px 5px #2a2a2a;
  border-radius: 0.5em;
  font-family: "Source Sans Pro", sans-serif;
}
</style>
