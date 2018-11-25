<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="goPage==false">厂商管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="goPage" :to="{ path: '/manufacturerList' }">厂商管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{nowPageTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="manufacturer" :model="manufacturer" label-width="140px" size="small" class="manufacturerForm">
      <el-col span="12">
        <el-form-item label="厂商编号">
          <el-input v-model="manufacturer.manufacturerCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="厂商名称" prop="manufacturerName">
          <el-input v-model="manufacturer.manufacturerName"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="manufacturer.brand"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="manufacturer.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="manufacturer.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" prop="registeredAddress">
          <el-input v-model="manufacturer.registeredAddress"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="manufacturer.createTime"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createMan">
          <el-input v-model="manufacturer.createMan" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="operfixed">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
  import { saveManufacturer, getManufacturerDetail } from '../../api/manufacturerManage.js'
  export default {
    created () {
      this.manufacturerId = this.$route.query.pId
      if (this.manufacturerId) {
        this.nowPageTitle = '厂商编辑'
        this.goPage = true
        getManufacturerDetail(this.manufacturerId).then(res => {
          if (res.meta.status === 200) {
            this.manufacturerList = res.data.manufacturerList
            this.btnDisabled = res.data.btnDisabled
          }
        })
      }
    },
    data () {
      return {
        nowPageTitle: '新增厂商',  // 面包屑第三级title
        goPage: false, // 是否给商品管理配置路径
        manufacturerId: '', // 产品ID
        manufacturer: {// 表单数据
          manufacturerCode: '', // 厂商编号,
          manufacturerName: '', // 厂商名称
          brand: '', // 品牌
          contacts: '', // 联系人
          contactPhone: '', // 联系电话
          registeredAddress: '', // 注册地址
          createTime: '', // 创建时间
          createMan: '' // 创建人
        },
        rules: {
          manufacturerName: [
            { required: true, message: '请输入厂商名称', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请输入品牌', trigger: 'blur' }
          ],
          contacts: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          registeredAddress: [
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '请输入创建时间', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 保存
      save () {
        this.$refs['manufacturer'].validate((valid) => {
          if (valid) {
            saveManufacturer(this.manufacturer).then(res => {
              if (res.meta.status === 200) {
                this.manufacturerList = res.data.manufacturerList
                // 到列表页
                this.$router.push({path: '/manufacturerList'})
              }
            })
          } else {
            return false
          }
        })
      },
      // 重置
      reset () {
        this.manufacturer = {
          manufacturerCode: '', // 厂商编号,
          manufacturerName: '', // 厂商名称
          brand: '', // 品牌
          contacts: '', // 联系人
          contactPhone: '', // 联系电话
          registeredAddress: '', // 注册地址
          createTime: '', // 创建时间
          createMan: '' // 创建人
        }
      }
    }
  }
</script>
<style scoped>
  .el-breadcrumb {
    background-color: #D3DCE6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }
  .manufacturerForm {
    margin-top: 10px;
  }
  .vender {
    width: 200px;
  }
</style>
