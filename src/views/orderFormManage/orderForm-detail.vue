<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/orderFormList'}">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单明细</el-breadcrumb-item>
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
        label="产品品牌"
        align="center">
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
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品单价">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品规格">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品型号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        label="订单金额">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getOrderFormDetail } from '../../api/orderFormManage.js'
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
