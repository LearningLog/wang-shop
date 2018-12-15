<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manufacturerList' }">厂商管理</el-breadcrumb-item>
      <el-breadcrumb-item>厂商编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="manufacturer" :model="manufacturer" label-width="140px" size="small" class="manufacturerForm">
      <el-col span="12">
        <el-form-item label="厂商编号">
          <el-input v-model="manufacturer.manufacturerId" disabled></el-input>
        </el-form-item>
        <el-form-item label="厂商名称" prop="manufacturerName">
          <el-input v-model="manufacturer.manufacturerName"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="manufacturer.brand"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="manufacturer.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="manufacturer.tel"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" prop="registerAddress">
          <el-input v-model="manufacturer.registerAddress"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-input v-model="manufacturer.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creater">
          <el-input v-model="manufacturer.creater" disabled></el-input>
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
  import { getManufacturerDetail, editManufacturer } from '../../api/manufacturerManage.js'
  export default {
    created () {
      this.manufacturerId = this.$route.query.id
      if (this.manufacturerId) {
        this.initData()
      }
    },
    data () {
      return {
        manufacturerId: '', // 厂商编号
        manufacturer: {// 表单数据
          manufacturerId: '', // 厂商编号,
          manufacturerName: '', // 厂商名称
          brand: '', // 品牌
          contact: '', // 联系人
          tel: '', // 联系电话
          registerAddress: '', // 注册地址
          createDate: '', // 创建时间
          creater: '' // 创建人
        },
        rules: {
          manufacturerName: [
            { required: true, message: '请输入厂商名称', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '请输入品牌', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          registerAddress: [
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      initData () {
        getManufacturerDetail(this.manufacturerId).then(res => {
          if (res.code === 1) {
            this.manufacturer = res.data
          }
        })
      },
      // 保存
      save () {
        this.$refs['manufacturer'].validate((valid) => {
          if (valid) {
            editManufacturer(this.manufacturer).then(res => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
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
        this.initData()
        this.$refs['manufacturer'].resetFields()
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
