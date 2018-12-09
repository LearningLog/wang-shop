<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="goPage==false">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="goPage" :to="{ path: '/commodityList' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{nowPageTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="product" :model="product" label-width="140px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品编号（SKU）">
          <el-input v-model="product.skuId" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="skuName">
          <el-input v-model="product.skuName"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="saleProperty">
          <el-input v-model="product.saleProperty"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="originalPrice">
          <el-input v-model="product.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="分润比例" prop="fraction">
          <el-input v-model="product.fraction"></el-input>
        </el-form-item>
        <el-form-item label="起定数量" prop="minPurchaseNum">
          <el-input v-model="product.minPurchaseNum"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌" prop="brand">
          <el-input v-model="product.brand"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="manufacturerName">
          <el-select v-model="product.manufacturerName" placeholder="请选择厂家" class="manufacturerName" @change="manufacturerSelect">
            <el-option v-for="item in manufacturerNameList" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="product.model"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="salePrice">
          <el-input v-model="product.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="递增数量" prop="increaseNum">
          <el-input v-model="product.increaseNum"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="product.creater" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="skuImageList">
          <!-- 图片上传 -->
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-upload
            limit="3"
            accept=".jpg,.png,.gif,.jepg,.jpeg"
            class="upload-demo"
            :action="uploadUrl()"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :file-list="product.skuImageList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jepg/jpeg文件</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="operfixed">
      <el-button type="primary" size="small" @click="saveProduct">保存</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
  import { addProduct, updateProduct, getProductDetail, uploadSingle } from '../../api/commodityManage.js'
  import { uploadInfo } from '../../api/http.js'

  export default {
    created () {
      this.skuId = this.$route.query.skuId
      if (this.skuId) {
        this.nowPageTitle = '商品编辑'
        this.goPage = true
        getProductDetail(this.skuId).then(res => {
          if (res.code === 1) {
            this.product = res.data
            this.product.skuImageList = [{url: res.data.skuImage, name: res.data.skuId}]
          }
        })
      }
    },
    data () {
      return {
        nowPageTitle: '新增商品',  // 面包屑第三级title
        goPage: false, // 是否给商品管理配置路径
        skuId: '', // 产品ID
        product: {// 表单数据
          skuId: '', // 产品编号,
          brand: '', // 产品品牌
          skuName: '', // 产品名称
          manufacturerName: '', // 厂家
          manufacturerId: '', // 厂家ID
          saleProperty: '', // 规格
          model: '', // 型号
          originalPrice: '', // 单价
          salePrice: '', // 售价
          fraction: '', // 分润比例
          creater: '', // 创建人
          skuImageList: [], // 商品图片
          skuImage: '', // 商品图片地址
          increaseNum: null, // 递增数量
          minPurchaseNum: null, // 起定数量
          createTime: '2018-12-02 07:06:27', // 创建时间
          updateTime: '2018-12-02 07:06:30'
        },
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false, // dialog弹窗是否显示
        manufacturerNameList: [{id: 3464, title: '厂商13'}, {id: 3465, title: '厂商14'}], // 厂家数组
        rules: {
          brand: [
            { required: true, message: '请输入产品品牌', trigger: 'blur' }
          ],
          skuName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          manufacturerName: [
            { required: true, message: '请选择厂家', trigger: 'change' }
          ],
          saleProperty: [
            { required: true, message: '请输入规格', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          originalPrice: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          salePrice: [
            { required: true, message: '请输入售价', trigger: 'blur' }
          ],
          fraction: [
            { required: true, message: '请输入分润比例', trigger: 'blur' }
          ],
          increaseNum: [
            { required: true, message: '请输入定增数量', trigger: 'blur' }
          ],
          minPurchaseNum: [
            { required: true, message: '请输入起定数量', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 保存
      saveProduct () {
        this.$refs['product'].validate((valid) => {
          if (valid) {
            if (!this.product.skuImage) {
              this.$message({
                type: 'warning',
                message: '请上传商品图片!'
              })
              return false
            }
            let data = this.product
            if (this.skuId) {
              updateProduct(data).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  })
                  // 到编辑页面
                  this.$router.push({path: '/commodityList'})
                }
              })
            } else {
              addProduct(data).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  })
                  // 到编辑页面
                  this.$router.push({path: '/commodityList'})
                }
              })
            }
          } else {
            return false
          }
        })
      },
      // 重置
      reset () {
        if (this.skuId) {
          getProductDetail(this.skuId).then(res => {
            if (res.code === 1) {
              this.product = res.data
            }
          })
        } else {
          this.product = {
            skuId: '11', // 产品编号,
            brand: '', // 产品品牌
            skuName: '', // 产品名称
            manufacturerName: '', // 厂家
            manufacturerId: '', // 厂家ID
            saleProperty: '', // 规格
            model: '', // 型号
            originalPrice: '', // 单价
            salePrice: '', // 售价
            fraction: '', // 分润比例
            creater: '', // 创建人
            createTime: '', // 创建时间
            skuImageList: [], // 商品图片
            skuImage: '' // 商品图片地址
          }
        }
        this.$refs['product'].resetFields()
      },
      // 上传路径
      uploadUrl () {
        return uploadInfo().url + '/admin/upload/batchUploadFile'
      },
      // 上传成功
      handleSuccess (response, file, fileList) {
        this.product.skuImageList = [file]
        var formData = new FormData()
        formData.append('file', file.raw)
        uploadSingle(formData).then(res => {
          if (res.data) this.product.skuImage = res.data
        })
      },
      // 删除前处理
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      // 处理文件移除
      handleRemove (file, fileList) {
        let now = ''
        this.product.skuImageList.some((item, index) => {
          if (file.uid === item.uid) {
            now = index
            return false
          }
        })
        this.product.skuImageList.splice(now, 1)
        this.product.skuImage = ''
      },
      // 处理预览
      handlePreview (file) {
        // 图片预览
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 选择厂商获取ID
      manufacturerSelect (val) {
        this.product.manufacturerId = val
        let obj = {}
        obj = this.manufacturerNameList.find((item) => {
          return item.id === val
        })
        this.product.manufacturerName = obj.title
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
  .productForm {
     margin-top: 10px;
   }
  /*.productForm input {*/
    /*margin-right: 150px !important;*/
  /*}*/
  .manufacturerName {
    width: 200px;
  }
</style>
