<template>
  <div class="info">
    <div class="avatar">
      <img src="../assets/avatar.jpg">
    </div>
    <el-form :rules='rules' :model='loginForm' ref='loginForm' class='container'>
      <div class="userInfo">
        <el-form-item prop="username">
          <el-input prefix-icon="myicon myicon-user" v-model='loginForm.username' placeholder='账号'></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type='password' prefix-icon="myicon myicon-key" v-model='loginForm.password' placeholder='密码'></el-input>
        </el-form-item>
        <!-- <el-checkbox>记住密码</el-checkbox> -->
        <el-form-item>
          <el-button type='primary' class='btn' @click='loginSubmit'>登录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { checkUser } from '../api/index.js'
const qs = require('querystring')
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 表单数据
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          // 调用后台接口
          checkUser(qs.stringify(params)).then(res => {
            if (res.meta.status === 200) {
              // 路由跳转
              localStorage.setItem('mytoken', res.data.token)
              this.$router.push({path: '/'})
            } else {
              // 登录失败
              this.$message({
                message: '用户名或者密码错误！',
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #2f4050;
    background-image: url(../assets/loginbg.jpg);
  }
  .container {
    box-sizing: border-box;
    margin: 180px auto 0;
    width: 500px;
    height: 340px;
    background-color: #fff;
    position: relative;
  }
  .avatar {
    position: absolute;
    left: 50%;
    top: 110px;
    width: 120px;
    height: 120px;
    border: 10px solid #FFF;
    margin-left: -70px;
    border-radius: 50%;
    box-shadow: 0 1px 5px #CCC;
    background-color: pink;
    overflow: hidden;
    z-index: 9999;
  }
  .userInfo {
    position: absolute;
    text-align: center;
    width: 400px;
    margin: 100px 50px;
  }
  .btn {
    width: 400px;
  }
</style>
