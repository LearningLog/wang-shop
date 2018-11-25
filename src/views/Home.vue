<template>
  <el-container>
    <el-aside :style='{width:"auto"}'>
      <div class="logo"></div>
      <el-menu router default-active="12" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened='uniqueFlag' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu :key='item.id' :index='item.id' v-for='item in menuData'>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.authName}}</span>
          </template>
          <el-menu-item :key='tag.id' v-for='tag in item.children' :index="tag.path">
            <i class="el-icon-menu"></i>
            <span>{{tag.authName}}</span>
          </el-menu-item>
        </el-submenu>
        <!--商品管理-->
        <el-submenu index="6">
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
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">发布管理</span>
          </template>
          <el-menu-item index="/publishProductList">
            <i class="el-icon-menu"></i>
            <span>商品发布列表</span>
          </el-menu-item>
          <el-menu-item index="/addPublishProduct">
            <i class="el-icon-menu"></i>
            <span>新增发布</span>
          </el-menu-item>
          <el-menu-item index="/publishProductApprove">
            <i class="el-icon-menu"></i>
            <span>发布审核</span>
          </el-menu-item>
        </el-submenu>
        <!--总库存管理-->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">总库存管理</span>
          </template>
          <el-menu-item index="/totalInventoryList">
            <i class="el-icon-menu"></i>
            <span>总库存列表</span>
          </el-menu-item>
          <el-menu-item index="/totalInventoryDetail">
            <i class="el-icon-menu"></i>
            <span>总库存明细</span>
          </el-menu-item>
        </el-submenu>
        <!--库存管理-->
        <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">库存管理</span>
          </template>
          <el-menu-item index="/inventoryList">
            <i class="el-icon-menu"></i>
            <span>库存列表</span>
          </el-menu-item>
          <el-menu-item index="/inventoryAdd">
            <i class="el-icon-menu"></i>
            <span>新增库存</span>
          </el-menu-item>
          <el-menu-item index="/godownEntry">
            <i class="el-icon-menu"></i>
            <span>入库单</span>
          </el-menu-item>
        </el-submenu>
        <!--库存管理-->
        <el-submenu index="10">
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
        <el-submenu index="11">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="/orderFormList">
            <i class="el-icon-menu"></i>
            <span>订单列表</span>
          </el-menu-item>
          <el-menu-item index="/orderFormDetail">
            <i class="el-icon-menu"></i>
            <span>订单明细</span>
          </el-menu-item>
        </el-submenu>
        <!--销售管理-->
        <el-submenu index="12">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">销售管理</span>
          </template>
          <el-menu-item index="/marketList">
            <i class="el-icon-menu"></i>
            <span>销售列表</span>
          </el-menu-item>
          <el-menu-item index="/marketDetail">
            <i class="el-icon-menu"></i>
            <span>销售明细</span>
          </el-menu-item>
        </el-submenu>
        <!--分账管理-->
        <el-submenu index="13">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">分账管理</span>
          </template>
          <el-menu-item index="/splitAccountList">
            <i class="el-icon-menu"></i>
            <span>分账列表</span>
          </el-menu-item>
          <el-menu-item index="/splitAccountDetail">
            <i class="el-icon-menu"></i>
            <span>分账明细</span>
          </el-menu-item>
        </el-submenu>
        <!--<el-submenu index="2">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span slot="title">权限管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/role">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">角色列表</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/auth">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">权限列表</span>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="3">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span slot="title">商品管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/product">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">商品列表</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/category">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">商品分类</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/param">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">商品参数</span>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="4">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span slot="title">订单管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/order">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">订单列表</span>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="5">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span slot="title">数据统计</span>-->
          <!--</template>-->
          <!--<el-menu-item index="/report">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">数据报表</span>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div v-model="isCollapse">
          <i @click="toggleFlag" class="myicon myicon-menu btnsize"></i>
          <div class="stitle">孖孖后台管理系统</div>
          <div class="userEdit">
            <el-button class="modify" type="primary" size="mini" @click='modifyDialog = true'>修改密码</el-button>
            <el-button class="logoutbtn" type="warning" size="mini" @click='handleLogout'>退出</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="modifyDialog" append-to-body>
    <el-form ref="userInfo" :rules="rules" :model="userInfo" label-width="110px">
      <el-form-item label="原密码" prop="formerPsd">
        <el-input v-model="userInfo.formerPsd"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="secondNowPsd">
        <el-input v-model="userInfo.secondNowPsd"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelModifyDialog">取 消</el-button>
        <el-button type="primary" @click="modify('userInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { getMenus } from '../api/index.js'
import {removeUserInfo} from '../api/auth.js'
import { modifyPassword } from '../api/login.js'
export default {
  data () {
    return {
      isCollapse: false,
      uniqueFlag: true,
      menuData: [], // 菜单
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
    cancelModifyDialog () {
      this.modifyDialog = false
      this.userInfo = {
        formerPsd: '', // 原密码
        password: '', // 密码
        secondNowPsd: '' // 第二次输入密码
      }
    },
    // 退出
    handleLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确认执行 resolve 函数
        // 1. 删除本地存储中的用户登陆信息
        // 清除token
        localStorage.removeItem('mytoken')
        // 跳转到登录页面
        this.$router.push({path: 'login'})
        removeUserInfo()
        // 提示用户退出成功
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // 点击取消的处理
      })
    },
    toggleFlag () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    getMenus().then(res => {
      if (res.meta.status === 200) {
        console.log(res)
        this.menuData = res.data
      }
    })
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
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
    display: block;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    overflow: '';
  }
  .userEdit {
    position: absolute;
    top: 0px;
    right: 10px;
  }
  .el-header {
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.jpg);
    background-size:contain;
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
</style>
