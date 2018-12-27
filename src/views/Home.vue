<template>
  <el-container>
    <div class="logo" @click="logoGoHome"></div>
    <el-aside :style='{width:"auto"}'>
      <el-scrollbar class="asideBar" style="height: 100%;">
        <!--管理员-->
        <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened='uniqueFlag' :default-active="defaultActive" :default-openeds="currentMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-if="userType === 'adminToken'">
          <!--<el-submenu :key='item.id' :index='item.id' v-for='item in menuData'>-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span slot="title">{{item.authName}}</span>-->
          <!--</template>-->
          <!--<el-menu-item :key='tag.id' v-for='tag in item.children' :index="tag.path">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>{{tag.authName}}</span>-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--商品管理-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="/commodityList">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="/commodityAdd">
              <i class="el-icon-menu"></i>
              <span>新增商品</span>
            </el-menu-item>
          </el-submenu>
          <!--发布管理-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">发布管理</span>
            </template>
            <el-menu-item index="/publishProductList">
              <i class="el-icon-menu"></i>
              <span>商品发布列表</span>
            </el-menu-item>
            <el-menu-item index="/publishProductApprove">
              <i class="el-icon-menu"></i>
              <span>发布审核</span>
            </el-menu-item>
          </el-submenu>
          <!--总库存管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">总库存管理</span>
            </template>
            <el-menu-item index="/totalStockList">
              <i class="el-icon-menu"></i>
              <span>总库存列表</span>
            </el-menu-item>
          </el-submenu>
          <!--库存管理-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">库存管理</span>
            </template>
            <el-menu-item index="/stockList">
              <i class="el-icon-menu"></i>
              <span>库存列表</span>
            </el-menu-item>
          </el-submenu>
          <!--厂商管理-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">厂商管理</span>
            </template>
            <el-menu-item index="/manufacturerList">
              <i class="el-icon-menu"></i>
              <span>厂商列表</span>
            </el-menu-item>
            <el-menu-item index="/manufacturerAdd">
              <i class="el-icon-menu"></i>
              <span>新增厂商</span>
            </el-menu-item>
          </el-submenu>
          <!--订单管理-->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="/orderFormList">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!--销售管理-->
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">销售管理</span>
            </template>
            <el-menu-item index="/marketList">
              <i class="el-icon-menu"></i>
              <span>销售列表</span>
            </el-menu-item>
          </el-submenu>
          <!--分账管理-->
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">分账管理</span>
            </template>
            <el-menu-item index="/splitAccountList">
              <i class="el-icon-menu"></i>
              <span>分账列表</span>
            </el-menu-item>
          </el-submenu>
          <!--客户端管理-->
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">C端客户</span>
            </template>
            <el-menu-item index="/clientList">
              <i class="el-icon-menu"></i>
              <span>客户列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--厂商-->
        <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened='uniqueFlag' :default-active="defaultActive" :default-openeds="currentMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-else-if="userType === 'manufacturerToken'">
          <!--账户管理-->
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">账户管理</span>
            </template>
            <el-menu-item index="/myZiZi">
              <i class="el-icon-menu"></i>
              <span>我的孖孖</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--商家-->
        <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened='uniqueFlag' :default-active="defaultActive" :default-openeds="currentMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-else-if="userType === 'venderToken'">
          <!--账户管理-->
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">账户管理</span>
            </template>
            <el-menu-item index="/myZiZi">
              <i class="el-icon-menu"></i>
              <span>我的孖孖</span>
            </el-menu-item>
            <el-menu-item index="/myOrderForm">
              <i class="el-icon-menu"></i>
              <span>我的销售单</span>
            </el-menu-item>
            <el-menu-item index="/myCoinsList">
              <i class="el-icon-menu"></i>
              <span>我的孖蹦</span>
            </el-menu-item>
            <el-menu-item index="/myBeansList">
              <i class="el-icon-menu"></i>
              <span>我的孖豆</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <div v-model="isCollapse">
          <i @click="toggleFlag" class="myicon myicon-menu btnsize"></i>
          <div class="stitle">孖孖后台管理系统</div>
          <div class="userEdit">
            <!--<el-button class="modify" type="primary" size="mini" @click='modifyDialog = true'>修改密码</el-button>-->
            <span class="userMessage">{{userMessage}}</span>
            <el-button class="logoutbtn" type="warning" size="mini" @click='handleLogout'>退出</el-button>
          </div>
        </div>
      </el-header>
      <el-scrollbar class="mainBar" style="height: 100%;">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>


</template>

<script>
// import { getMenus } from '../api/index.js'
  import {getToken, removeToken} from '../api/auth.js'
  import { logoutAdmin, logoutManufacturer, logoutVender, modifyPassword, getUserInfo } from '../api/login.js'
  import { getActiveMenu } from '../api/leftMenuConfig.js'
  export default {
    created () {
      // getMenus().then(res => {
      //   debugger
      //   if (res.meta.status === 200) {
      //     console.log(res)
      //     this.menuData = res.data
      //   }
      // })
      getUserInfo(getToken('userType')).then(res => {
        if (res.code === 1) {
          this.userType = getToken('userType')
          if (this.userType === 'adminToken') {
            this.userMessage = `你好管理员，${res.data.userName}`
          }
          if (this.userType === 'manufacturerToken') {
            this.userMessage = `你好厂商，${res.data.manufacturerName}`
          }
          if (this.userType === 'venderToken') {
            this.userMessage = `你好商家，${res.data.venderName}`
          }
        }
      })
    },
    mounted () {
      this.showActiveLeftMenu(this.$route.path)
    },
    data () {
      return {
        userMessage: '', // 头部用户信息
        currentMenu: [], // 当前打开的 sub-menu 的 index 的数组
        defaultActive: '', // 当前激活菜单的 index
        isCollapse: false, // 是否关闭菜单
        uniqueFlag: true,
        menuData: [], // 菜单
        userType: '', // 登录身份类型
        modifyDialog: false, // 是否显示修改密码对话框
        userInfo: {
          formerPsd: '', // 原密码
          password: '', // 密码
          secondNowPsd: '' // 第二次输入密码
        },
        rules: {
          formerPsd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          secondNowPsd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 打开当前所在菜单
      showActiveLeftMenu (path) {
        let list = getActiveMenu(path)
        let len = list.length
        if (len > 0) { // 得到的数组的长度大于0，说明找到了对应的菜单，应跳转菜单；如果长度为0，说明没有找到对应的菜单，则不跳菜单
          this.currentMenu = list // default-openeds 默认打开的全菜单的index数组
          this.defaultActive = len ? path : '' // default-active 默认激活的当前index菜单（或子菜单）
        }
      },
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      },
      // 确定 修改密码
      modify (userInfo) {
        // 添加角色
        this.$refs[userInfo].validate(valid => {
          if (valid) {
            modifyPassword(this.userInfo).then(res => {
              if (res.meta.status === 201) {
                this.initData()
                this.modifyDialog = false
                this.$message({
                  type: 'success',
                  message: '添加角色成功!'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '添加角色失败!'
                })
              }
            })
          }
        })
      },
      // 取消 修改密码
      closeModifyDialog () {
        this.modifyDialog = false
        this.userInfo = {
          formerPsd: '', // 原密码
          password: '', // 密码
          secondNowPsd: '' // 第二次输入密码
        }
        // 点击取消 数据重置
        this.$refs['userInfo'].resetFields()
      },
      // 关闭dialog
      closeDialog () {
        // 点击取消 数据重置
        this.$refs['userInfo'].resetFields()
      },
      // 退出
      handleLogout () {
        this.$confirm('确认退出吗?', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 点击确认执行 resolve 函数
          // 调用后台退出接口
          if (getToken('userType') === 'adminToken') {
            logoutAdmin({adminToken: getToken('adminToken')}).then(res => {
              if (res.code === 1) {
                // 1. 删除本地存储中的用户登陆信息
                // 清除token
                removeToken('adminToken')
                removeToken('userType')
                // 跳转到登录页面
                this.$router.push({path: 'login'})
                // 提示用户退出成功
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '退出失败!'
                })
              }
            })
          } else if (getToken('userType') === 'manufacturerToken') {
            logoutManufacturer({manufacturerToken: getToken('manufacturerToken')}).then(res => {
              if (res.code === 1) {
                // 1. 删除本地存储中的用户登陆信息
                // 清除token
                removeToken('manufacturerToken')
                removeToken('userType')
                // 跳转到登录页面
                this.$router.push({path: 'login'})
                // 提示用户退出成功
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '退出失败!'
                })
              }
            })
          } else {
            logoutVender({venderToken: getToken('venderToken')}).then(res => {
              if (res.code === 1) {
                // 1. 删除本地存储中的用户登陆信息
                // 清除token
                removeToken('venderToken')
                removeToken('userType')
                // 跳转到登录页面
                this.$router.push({path: 'login'})
                // 提示用户退出成功
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '退出失败!'
                })
              }
            })
          }
        }).catch(() => {
          // 点击取消的处理
        })
      },
      toggleFlag () {
        this.isCollapse = !this.isCollapse
      },
      // 点击logo去到主页
      logoGoHome () {
        this.$router.push({path: '/'})
      }
    },
    watch: {
      // 监听,当路由发生变化的时候执行
      $route: {
        handler: function (val, oldVal) {
          this.showActiveLeftMenu(val.path)
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>

<style scoped>
  .btnsize {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-header {
    float: right;
    z-index: 3;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
    display: block;
    overflow-x: hidden;
    overflow-y: hidden;
    box-sizing: border-box;
    margin-top: 60px;
    z-index: 1;
  }
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    cursor: pointer;
    height: 60px;
    width: 200px;
    z-index: 2;
    background: url(../assets/logo_1.jpg);
    background-size:contain;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  .userEdit {
    position: absolute;
    top: 0px;
    right: 10px;
  }
  .el-header {
    background-color: #545c64;
  }
  .stitle {
    position: absolute;
    font-size: 28px;
    overflow: hidden;
    width: 300px;
    color: #fff;
    left: 600px;
    top: 0px;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .mainBar {
    background-color: #E9EEF3;
  }
  .userMessage {
    color: #fff;
    margin-right: 10px;
  }
</style>
