<template>
  <div class="info">
    <div class="avatar">
      <img src="../assets/login.jpg">
    </div>
    <el-form :rules='rules' :model='loginForm' ref='loginForm' class='container'>
      <!--<div class="userInfo">-->
        <el-form-item prop="loginName">
          <el-input prefix-icon="myicon myicon-user" class="loginName" style="BACKGROUND-COLOR: transparent;" v-model='loginForm.loginName' autocomplete="off" placeholder='账号'></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type='password' prefix-icon="myicon myicon-key" class="password" style="BACKGROUND-COLOR: transparent;" v-model='loginForm.password' autocomplete="off" placeholder='密码'></el-input>
        </el-form-item>
        <el-form-item>
          <!--<div class="input-group-prepend">-->
            <!--<label class="input-group-text">身份类型</label>-->
          <!--</div>-->
          <div class="type">
            <el-select placeholder="请选择身份类型" class="userType" v-model='userType'>
              <el-option label="管理员" value="1"></el-option>
              <el-option label="厂商" value="2"></el-option>
              <el-option label="商家" value="3"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- <el-checkbox>记住密码</el-checkbox> -->
        <el-form-item>
          <button type='primary' class='btn' @click.prevent='loginSubmit'>登录</button>
        </el-form-item>
      <!--</div>-->
    </el-form>
  </div>
</template>
<script>
  import { loginAdmin, loginManufacturer, loginVender } from '../api/login.js'
  import { saveToken } from '../api/auth.js'
  const qs = require('querystring')
  export default {
    data () {
      return {
        loginForm: { // 登录表单
          loginName: '', // 用户名
          password: '' // 密码
        },
        userType: '', // 身份类型
        cooiekName: '', // cooike键名
        rules: {
          loginName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
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
            if (!this.userType) {
              this.$message({
                message: '请选择身份类型！',
                type: 'warning'
              })
            } else {
              // 调用后台接口
              if (this.userType === '1') {
                loginAdmin(qs.stringify(this.loginForm)).then(res => {
                  if (res.code === 1) {
                    // 路由跳转
                    saveToken('adminToken', res.data, 'h24')
                    saveToken('userType', 'adminToken', 'h24')
                    this.$router.push({path: '/'})
                    // 给出登陆成功的提示消息
                    this.$message({
                      type: 'success',
                      message: '登陆成功!'
                    })
                  } else {
                    // 登录失败
                    this.$message({
                      message: res.message,
                      type: 'error'
                    })
                  }
                })
              } else if (this.userType === '2') {
                loginManufacturer(qs.stringify(this.loginForm)).then(res => {
                  if (res.code === 1) {
                    // 路由跳转
                    saveToken('manufacturerToken', res.data, 'h24')
                    saveToken('userType', 'manufacturerToken', 'h24')
                    this.$router.push({path: '/'})
                    // 给出登陆成功的提示消息
                    this.$message({
                      type: 'success',
                      message: '登陆成功!'
                    })
                  } else {
                    // 登录失败
                    this.$message({
                      message: res.message,
                      type: 'error'
                    })
                  }
                })
              } else {
                loginVender(qs.stringify(this.loginForm)).then(res => {
                  if (res.code === 1) {
                    // 路由跳转
                    saveToken('venderToken', res.data, 'h24')
                    saveToken('userType', 'venderToken', 'h24')
                    this.$router.push({path: '/'})
                    // 给出登陆成功的提示消息
                    this.$message({
                      type: 'success',
                      message: '登陆成功!'
                    })
                  } else {
                    // 登录失败
                    this.$message({
                      message: res.message,
                      type: 'error'
                    })
                  }
                })
              }
            }
          }
        })
      }
    },
    watch: {
      userType: function (q, w) {
        switch (this.userType) {
          case '1':
            this.cooiekName = 'adminToken'
            break
          case '2':
            this.cooiekName = 'manufacturerToken'
            break
        }
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
    margin: 280px auto 0;
    width: 400px;
    height: 340px;
    /*background-color: #fff;*/
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
    /*z-index: 9999;*/
  }
  .avatar img {
    width: 100%;
  }
  .userInfo {
    background: rgba(255, 255, 255, 0);
    position: absolute;
    text-align: center;
    width: 300px;
    padding: 100px 50px;
  }
  .loginName, .password, .type {
    background: rgba(255, 255, 255, 0.32);
    /*margin-bottom: 1.5em;*/
    padding: 8px;
  }
  .type {
    width: 400px;
  }
  .userType {
    width: 400px;
  }
  /*.userType {*/
    /*float: left;*/
    /*margin-left: 98px;*/
    /*!*width: 310px;*!*/
  /*}*/
  .input-group-prepend {
    margin-right: -1px;
    margin-top: 9px;
    margin-left: 10px;
    display: -ms-flexbox;
    display: inline-block;
    /* background: rgba(255, 255, 255, 0.32); */
    /* padding: 8px; */
    position: absolute;
    z-index: 10;
    border-top-right-radius: 0%
  }
  .input-group-prepend label {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .input-group-text {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: .375rem .75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    /*line-height: 1.5;*/
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }
  .btn {
    width: 416px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    line-height: 44px;
    background: #ff3366;
    display: inline-block;
    /*width: 100%;*/
    outline: none;
    border: 2px solid #ff3366;
    cursor: pointer;
    text-transform: uppercase;
    border-radius: 0px;
  }
</style>
