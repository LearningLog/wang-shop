<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/publishProductList'}">发布管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品发布详情</el-breadcrumb-item>
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
        <el-form-item label="规格：">
          <div>{{product.saleProperty}}</div>
        </el-form-item>
        <el-form-item label="单价：">
          <div>{{product.originalPrice}}</div>
        </el-form-item>
        <el-form-item label="发布数量">
          <div>{{product.publishNum}}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{product.createTime}}</div>
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
        <el-form-item label="创建人：">
          <div>{{product.creater}}</div>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
  import { getPublishDetail } from '../../api/publishManage.js'
  export default {
    created () {
      this.publishId = this.$route.query.publishId
      getPublishDetail(this.publishId).then(res => {
        if (res.code === 1) {
          this.product = res.data
        }
      })
    },
    data () {
      return {
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
          increaseNum: null, // 递增数量
          minPurchaseNum: null, // 起定数量
          publishNum: null, // 起定数量
          createTime: '', // 创建时间
          updateTime: '',
          publisher: '' // 发布人
        }
      }
    },
    methods: {}
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
</style>
