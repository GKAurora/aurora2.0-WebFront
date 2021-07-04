<template>
  <div class='page'>
    <div class='login-box'>
      <el-form
        :model='ruleForm'
        :rules='rules'
        ref='ruleForm'
        label-position='left'
        label-width='0px'
        class='demo-ruleForm login-container'
        status-icon
      >
        <h3 class='title'>注册</h3>
        <el-form-item prop='account'>
          <el-input
            type='text'
            v-model='ruleForm.account'
            auto-complete='off'
            placeholder='账号'
            id='loginEmail'
            prefix-icon='el-icon-user-solid'
          ></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            type='password'
            v-model='ruleForm.password'
            auto-complete='off'
            placeholder='密码'
            id='loginPassword'
            prefix-icon='el-icon-key'
          ></el-input>
        </el-form-item>
        <el-form-item prop='checkPass'>
          <el-input
            type='password'
            v-model='ruleForm.checkPass'
            auto-complete='off'
            placeholder='重复密码'
            id='loginCheckPass'
            prefix-icon='el-icon-key'
          ></el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item>
          <el-input
            type='email'
            v-model='ruleForm.email'
            auto-complete='off'
            placeholder='邮箱'
            prefix-icon='el-icon-postcard'
          ></el-input>
        </el-form-item>

        <el-form-item style='width: 100%'>
          <el-button
            type='primary'
            style='width: 100%'
            @click.native.prevent='handleSubmit'
            :loading='logining'
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item style='width: 100%'>
          <router-link to='/login'>
            <el-button style='width: 100%'> 登录 </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from '../../api'

export default {
  name: 'app-login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      ruleForm: {
        account: 'admin123',
        password: 'admin123',
        checkPass: 'admin123',
        email: 'admin123@admin.com'
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async handleSubmit (ev) {
      if (this.ruleForm.password != this.ruleForm.checkPass) {
        return
      }
      const conf = API.auth.reg(
        this.ruleForm.account,
        this.ruleForm.password,
        this.ruleForm.email
      )
      const data = await this.$axios(conf)
      if (data.status === 200) {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        // 跳转
        this.$router.push('/login')
        return
      }
      this.$message({
        message: `${data.data.message}`,
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
  color: rgba(132, 213, 245, 0.719);
}

.page {
  /* background: url('../../assets/img/about/bg.gif') no-repeat; */
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
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
  font-family: 'Source Sans Pro', sans-serif;
}

.login-box .svgContainer {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 1em;
  border-radius: 50%;
  pointer-events: none;
}
</style>
