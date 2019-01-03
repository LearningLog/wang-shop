<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厂商管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增厂商</el-breadcrumb-item>
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
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="manufacturer.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createMan">
          <el-input v-model="manufacturer.createMan" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="营业执照" prop="businessLicenseList">
          <!-- 图片上传 -->
          <el-upload
            limit="2"
            accept=".jpg,.png,.gif,.jepg,.jpeg"
            class="upload-demo"
            :action="uploadUrl()"
            :on-success="handleSuccess0"
            :before-remove="beforeRemove"
            :on-remove="handleRemove0"
            :on-preview="handlePreview"
            :file-list="businessLicenseList"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
            <!--<el-button size="small" type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jepg/jpeg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="经营许可证" prop="scopeBusinessList">
          <!-- 图片上传 -->
          <el-upload
            limit="2"
            accept=".jpg,.png,.gif,.jepg,.jpeg"
            class="upload-demo"
            :action="uploadUrl()"
            :on-success="handleSuccess1"
            :before-remove="beforeRemove"
            :on-remove="handleRemove1"
            :on-preview="handlePreview"
            :file-list="scopeBusinessList"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
            <!--<el-button size="small" type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jepg/jpeg文件</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="operfixed">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
  import { addManufacturer } from '../../api/manufacturerManage.js'
  import {onNumValid, validatePhone} from '../../api/util.js'
  import { uploadSingle } from '../../api/commodityManage.js'
  import { uploadInfo } from '../../api/http.js'

  export default {
    data () {
      let _this = this
      var tel = (rule, value, callback) => {
        value = parseInt(onNumValid(value, 0))
        if (value) {
          _this.manufacturer.tel = value
        } else {
          _this.manufacturer.tel = ''
        }
        if (!value) {
          return callback(new Error('请输入联系电话'))
        }
        if (!Number.isInteger(value)) {
          this.manufacturer.tel = ''
          callback(new Error('请输入数字值'))
        } else {
          if (!validatePhone(value)) {
            callback(new Error('格式不正确'))
          } else {
            callback()
          }
        }
      }
      return {
        manufacturerId: '', // 产品ID
        manufacturer: {// 表单数据
          manufacturerId: '', // 厂商编号,
          manufacturerName: '', // 厂商名称
          brand: '', // 品牌
          contact: '', // 联系人
          tel: '', // 联系电话
          registerAddress: '', // 注册地址
          businessLicense: '', // 营业执照
          scopeBusiness: '', // 经营许可证
          createTime: '', // 创建时间
          createMan: '' // 创建人
        },
        businessLicenseList: [], // 营业执照图片
        scopeBusinessList: [], // 经营许可证图片
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false, // dialog弹窗是否显示
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
            { required: true, validator: tel, trigger: 'blur' }
          ],
          registerAddress: [
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 保存
      save () {
        this.$refs['manufacturer'].validate((valid) => {
          if (valid) {
            if (!this.manufacturer.businessLicense) {
              this.$message({
                type: 'warning',
                message: '请上传营业执照图片!'
              })
              return false
            }
            if (!this.manufacturer.scopeBusiness) {
              this.$message({
                type: 'warning',
                message: '请上传经营许可证图片!'
              })
              return false
            }
            addManufacturer(this.manufacturer).then(res => {
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
        this.manufacturer = {
          manufacturerId: '', // 厂商编号,
          manufacturerName: '', // 厂商名称
          brand: '', // 品牌
          contact: '', // 联系人
          tel: '', // 联系电话
          registerAddress: '', // 注册地址
          businessLicense: '', // 营业执照
          scopeBusiness: '', // 经营许可证
          createTime: '', // 创建时间
          createMan: '' // 创建人
        }
        this.businessLicenseList = [] // 营业执照图片
        this.scopeBusinessList = [] // 经营许可证图片
        this.$refs['manufacturer'].resetFields()
      },
      // 上传路径
      uploadUrl () {
        return uploadInfo().url + '/admin/upload/uploadFile'
      },
      // 上传成功
      handleSuccess0 (response, file, fileList) {
        this.businessLicenseList = [file]
        let formData = new FormData()
        formData.append('file', file.raw)
        uploadSingle(formData).then(res => {
          if (res.data) this.manufacturer.businessLicense = res.data
        })
      },
      // 删除前处理
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除此图片吗？`, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      // 处理文件移除
      handleRemove0 (file, fileList) {
        let now = ''
        this.businessLicenseList.some((item, index) => {
          if (file.uid === item.uid) {
            now = index
            return false
          }
        })
        this.businessLicenseList.splice(now, 1)
        this.manufacturer.businessLicense = ''
      },
      // 处理预览
      handlePreview (file) {
        // 图片预览
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 上传成功
      handleSuccess1 (response, file, fileList) {
        this.scopeBusinessList = [file]
        let formData = new FormData()
        formData.append('file', file.raw)
        uploadSingle(formData).then(res => {
          if (res.data) this.manufacturer.scopeBusiness = res.data
        })
      },
      // 处理文件移除
      handleRemove1 (file, fileList) {
        let now = ''
        this.scopeBusinessList.some((item, index) => {
          if (file.uid === item.uid) {
            now = index
            return false
          }
        })
        this.scopeBusinessList.splice(now, 1)
        this.manufacturer.scopeBusiness = ''
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
  .el-input {
    width: 200px !important;
  }
  .el-select {
    width: 200px !important;
  }
</style>
