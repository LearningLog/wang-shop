<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="source === 1" :to="{ path: '/publishProductList' }">商品发布</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="source === 2" :to="{ path: '/publishProductApprove' }">发布审核</el-breadcrumb-item>
      <el-breadcrumb-item v-else :to="{ path: '/publishProductList' }">发布管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="product" status-icon :model="product" label-width="140px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品名称">
          <el-input v-model="product.skuName" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品编号（SKU）">
          <el-input v-model="product.skuId" disabled></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="product.saleProperty" disabled></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="product.originalPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布数量" prop="publishNum">
          <el-input v-model="product.publishNum" @blur="numBlur(product.publishNum, 0, 'publishNum')"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="product.createTime" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌">
          <el-input v-model="product.brand" disabled></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model="product.manufacturerName" disabled></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="product.model" disabled></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="product.salePrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="product.publisher" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class='operfixed'>
      <el-button type="primary" size="small" @click="publishProduct('product')">发布</el-button>
      <el-button type="warning" size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
  import { getPublishDetail, publishProductEdit } from '../../api/publishManage.js'
  import {onNumValid} from '../../api/util.js'
  export default {
    created () {
      this.publishId = this.$route.query.publishId
      this.source = this.$route.query.source
      this.initData()
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
        },
        source: null, // 来源 1 发布列表 2审核列表
        rules: {
          publishNum: [
            { required: true, message: '请输入发布数量', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      initData () {
        if (this.publishId) {
          getPublishDetail(this.publishId).then(res => {
            if (res.code === 1) {
              this.product = res.data
              this.product.publishNum = this.$accounting.format(this.product.publishNum, 0)
              this.product.originalPrice = this.$accounting.format((this.product.originalPrice / 100), 2)
              this.product.salePrice = this.$accounting.format((this.product.salePrice / 100), 2)
            }
          })
        }
      },
      // 发布
      publishProduct () {
        this.$refs['product'].validate((valid) => {
          if (valid) {
            if (this.publishId) { // 修改
              let data = this.product
              data.originalPrice = parseInt(data.originalPrice.toString().replace(/,/g, ''))
              data.salePrice = parseInt(data.salePrice.toString().replace(/,/g, ''))
              data.publishNum = parseInt(data.publishNum.toString().replace(/,/g, ''))
              publishProductEdit(data).then(res => {
                if (res.code === 1) {
                  // 到列表页面
                  this.$router.push({path: '/publishProductList'})
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
        this.initData()
        this.$refs['product'].resetFields()
      },
      // 数字输入框失去焦点时
      numBlur (value, num, name) {
        value = onNumValid(value, num)
        this.product[name] = value || value === 0 ? this.$accounting.format(value, num) : ''
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
  .el-input {
    width: 200px !important;
  }
  .el-select {
    width: 200px !important;
  }
</style>
