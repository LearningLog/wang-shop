<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/commodityList'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form label-width="140px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品编号（SKU）：">
          <div>{{product.skuId}}</div>
        </el-form-item>
        <el-form-item label="产品名称：">
          <div>{{product.skuName}}</div>
        </el-form-item>
        <el-form-item label="条形码：">
          <div>{{product.barCode}}</div>
        </el-form-item>
        <el-form-item label="规格：">
          <div>{{product.saleProperty}}</div>
        </el-form-item>
        <el-form-item label="单价：">
          <div>{{product.originalPrice}}</div>
        </el-form-item>
        <el-form-item label="分润比例：">
          <div>{{product.fraction}}</div>
        </el-form-item>
        <el-form-item label="起定数量">
          <div>{{product.minPurchaseNum}}</div>
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
          <div>{{product.manufacturerName}}</div>
        </el-form-item>
        <el-form-item label="型号：">
          <div>{{product.model}}</div>
        </el-form-item>
        <el-form-item label="售价：">
          <div>{{product.salePrice}}</div>
        </el-form-item>
        <el-form-item label="递增数量">
          <div>{{product.increaseNum}}</div>
        </el-form-item>
        <el-form-item label="创建人：">
          <div>{{product.creater}}</div>
        </el-form-item>
        <el-form-item label="商品图片：">
          <!-- 图片上传 -->
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <a class="skuImageDiv" @click="visible" v-show="product.skuImage">
            <img :src="product.skuImage" alt="" class=skuImage>
          </a>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
  import { getProductDetail } from '../../api/commodityManage.js'
  export default {
    created () {
      this.skuId = this.$route.query.skuId
      getProductDetail(this.skuId).then(res => {
        if (res.code === 1 && res.data) {
          this.product = res.data
          this.product.originalPrice = this.$accounting.format((this.product.originalPrice / 100), 2)
          this.product.salePrice = this.$accounting.format((this.product.salePrice / 100), 2)
          this.product.increaseNum = this.$accounting.format(this.product.increaseNum, 0)
          this.product.minPurchaseNum = this.$accounting.format(this.product.minPurchaseNum, 0)
          this.product.fraction = this.$accounting.format(this.product.fraction, 2)
          this.dialogImageUrl = res.data.skuImage
        }
      })
    },
    data () {
      return {
        product: {}, // 表单数据
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
      },
      visible () {
        if (this.product.skuImage) {
          this.dialogVisible = true
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
  .productForm {
    margin-top: 10px;
  }
  .skuImageDiv {
    display: inline-block;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 122px;
  }
  .skuImage {
    vertical-align: middle;
    display: inline-block;
    width: 100px;
    height: 100px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px;
  }
</style>
