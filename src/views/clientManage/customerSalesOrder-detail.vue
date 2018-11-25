<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/clientList'}">C端客户</el-breadcrumb-item>
      <el-breadcrumb-item>客户销售单</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表格-->
    <el-table
      :data="orderFormList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="销售单编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="客户编号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商家名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品编码">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="销售单金额">
      </el-table-column>
      <el-table-column
        prop="address"
        label="销售日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="支付渠道"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getOrderFormDetail } from '../../api/clientManage.js'
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
        orderFormList: [{address: '哈哈哈哈'}] // 客户销售单列表
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
