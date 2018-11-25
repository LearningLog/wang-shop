<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的孖蹦</el-breadcrumb-item>
    </el-breadcrumb>
    <h2 class="condition">最近三个月收支情况</h2>
    <el-form>
      <el-col span="8">
        <el-form-item label="余额：">
          <div>{{incomeExpenses.remainder}}</div>
        </el-form-item>
        <el-form-item label="提现：">
          <div>{{incomeExpenses.withdrawDeposit}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="收入：">
          <div>{{incomeExpenses.income}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="支出：">
          <div>{{incomeExpenses.expenses}}</div>
        </el-form-item>
      </el-col>
    </el-form>
    <!--表格-->
    <el-table
      :data="orderFormList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="业务日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label=业务金额>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="孖蹦余额">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="业务操作">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="详细说明">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getOrderFormDetail } from '../../api/accountManage.js'
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
        incomeExpenses: {
          remainder: '', // 余额
          income: '', // 收入
          expenses: '', // 支出
          withdrawDeposit: '' // 提现
        },
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
  .condition {
    text-align: center;
    font-weight: 400;
  }
</style>
