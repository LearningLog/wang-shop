<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/inventoryList'}">库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form label-width="140px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品编号（SKU）：">
          <div>{{product.productNumber}}</div>
        </el-form-item>
        <el-form-item label="产品名称：">
          <div>{{product.productName}}</div>
        </el-form-item>
        <el-form-item label="规格：">
          <div>{{product.standard}}</div>
        </el-form-item>
        <el-form-item label="单价：">
          <div>{{product.unitPrice}}</div>
        </el-form-item>
        <el-form-item label="分润比例：">
          <div>{{product.wettingRatio}}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{product.creater}}</div>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌：">
          <div>{{product.brand}}</div>
        </el-form-item>
        <el-form-item label="厂家：">
          <div>{{product.vender}}</div>
        </el-form-item>
        <el-form-item label="型号：">
          <div>{{product.model}}</div>
        </el-form-item>
        <el-form-item label="售价：">
          <div>{{product.price}}</div>
        </el-form-item>
        <el-form-item label="创建人：">
          <div>{{product.creater}}</div>
        </el-form-item>
        <el-form-item label="商品图片：">
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
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
  // import { productDetail } from '../../api/stockManage.js'
  export default {
    created () {
      this.productId = this.$route.query.pId
      if (this.productId) {
        // productDetail(this.productId).then(res => {
        //   if (res.meta.status === 200) {
        //     this.productList = res.data.productList
        //   }
        // })
      }
    },
    data () {
      return {
        product: {// 表单数据
          productNumber: '11111', // 产品编号,
          brand: '2222', // 产品品牌
          productName: '222222', // 产品名称
          vender: '333333', // 厂家
          standard: '444444', // 规格
          model: '55555555', // 型号
          unitPrice: '66666666', // 单价
          price: '777777', // 售价
          wettingRatio: '', // 分润比例
          creater: '88888888', // 创建人
          createTime: '999999999', // 创建时间
          fileList: [] // 商品图片
        },
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false // dialog弹窗是否显示
      }
    },
    methods: {
      // 处理预览
      handlePreview (file) {
        // 图片预览
        this.dialogImageUrl = file.url
        this.dialogVisible = true
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
