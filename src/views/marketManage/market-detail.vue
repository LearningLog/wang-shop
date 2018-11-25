<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/marketList'}">销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售明细</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表格-->
    <el-table
      :data="orderFormList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商户编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商户名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="价格">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getOrderFormDetail } from '../../api/marketManage.js'
  export default {
    created () {
      this.productId = this.$route.query.pId
      if (this.productId) {
        getOrderFormDetail(this.productId).then(res => {
          if (res.meta.status === 200) {
            this.productList = res.data.productList
          }
        })
      }
    },
    data () {
      return {
        orderFormList: [{}] // 产品列表
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
