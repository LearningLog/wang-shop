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
          <el-input v-model="product.productNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="product.productName"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="standard">
          <el-input v-model="product.standard"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="product.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="分润比例" prop="wettingRatio">
          <el-input v-model="product.wettingRatio"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="creater">
          <el-input v-model="product.creater"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌" prop="brand">
          <el-input v-model="product.brand"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="vender">
          <el-select v-model="product.vender" placeholder="请选择厂家" class="vender">
            <el-option v-for="item in venderList" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="product.model"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="product.price"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="product.creater" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="fileList">
          <!-- 图片上传 -->
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-upload
            multiple
            limit="3"
            :on-exceed="handleExceed"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :file-list="product.fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
  import { saveProduct, uploadInfo } from '../../api/commodityManage.js'
  // import { productDetail } from '@/api/commodityManage.js'
  export default {
    created () {
      this.productId = this.$route.query.pId
      if (this.productId) {
        this.nowPageTitle = '商品编辑'
        this.goPage = true
        // getProductDetail(this.productId).then(res => {
        //   if (res.meta.status === 200) {
        //     this.productList = res.data.productList
        //     this.btnDisabled = res.data.btnDisabled
        //   }
        // })
      }
    },
    data () {
      return {
        nowPageTitle: '新增商品',  // 面包屑第三级title
        goPage: false, // 是否给商品管理配置路径
        productId: '', // 产品ID
        product: {// 表单数据
          productNumber: '', // 产品编号,
          brand: '', // 产品品牌
          productName: '', // 产品名称
          vender: '', // 厂家
          standard: '', // 规格
          model: '', // 型号
          unitPrice: '', // 单价
          price: '', // 售价
          wettingRatio: '', // 分润比例
          creater: '', // 创建人
          createTime: '', // 创建时间
          fileList: [] // 商品图片
        },
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false, // dialog弹窗是否显示
        venderList: [{id: 1, title: '厂家一'}, {id: 2, title: '厂家二'}], // 厂家数组
        rules: {
          brand: [
            { required: true, message: '请输入产品品牌', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          vender: [
            { required: true, message: '请选择厂家', trigger: 'change' }
          ],
          standard: [
            { required: true, message: '请输入规格', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          unitPrice: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入售价', trigger: 'blur' }
          ],
          wettingRatio: [
            { required: true, message: '请输入分润比例', trigger: 'blur' }
          ],
          fileList: [
            { required: true, message: '请上传商品图片', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      // 保存
      saveProduct () {
        this.$refs['product'].validate((valid) => {
          if (valid) {
            saveProduct(this.product).then(res => {
              if (res.meta.status === 200) {
                this.productList = res.data.productList
                // 到编辑页面
                this.$router.push({path: '/commodityList'})
              }
            })
          } else {
            return false
          }
        })
      },
      // 重置
      reset () {
        this.product = {
          ProductNumber: '', // 产品编号,
          brand: '', // 产品品牌
          productName: '', // 产品名称
          vender: '', // 厂家
          standard: '', // 规格
          model: '', // 型号
          unitPrice: '', // 单价
          price: '', // 售价
          wettingRatio: '', // 分润比例
          creater: '', // 创建人
          createTime: '', // 创建时间
          picture: '' // 商品图片
        }
      },
      // 上传路径
      uploadUrl () {
        return uploadInfo()
      },
      // 处理预览
      handlePreview (file) {
        // 图片预览
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleSuccess (response, file, fileList) {
        this.product.fileList.push({pic: response.data.tmp_path})
      },
      // 处理文件移除
      handleRemove (file, fileList) {
        let now = ''
        this.product.fileList.some((item, index) => {
          if (file.response.data.tmp_path === item.pic) {
            now = index
            return false
          }
        })
        this.product.fileList.splice(now, 1)
      },
      // 限制上传文件的个数和定义超出限制时的行为
      handleExceed (files, fileList) {
        console.log(files)
        console.log(fileList)
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // 删除前处理
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
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
  .vender {
    width: 200px;
  }
</style>
