<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的孖豆</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form>
      <el-col span="8">
        <el-form-item label="余额：">
          <div>{{incomeExpenses.remainder}}</div>
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
        label="孖豆余额">
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
    <div class="page fr">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getMyBeansAmount, getMyBeansList } from '../../api/accountManage.js'
  export default {
    created () {
      getMyBeansAmount().then(res => {
        if (res.code === 1 && res.data) {
          this.productList = res.data.list
          this.total = res.data.total
          this.currentSize = res.data.size
        }
      })
      getMyBeansList().then(res => {
        if (res.code === 1 && res.data) {
          this.productList = res.data.list
          this.total = res.data.total
          this.currentSize = res.data.size
        }
      })
    },
    data () {
      return {
        incomeExpenses: {
          remainder: '', // 余额
          income: '', // 收入
          expenses: '', // 支出
          withdrawDeposit: '' // 提现
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        myBeansAmount: {}, // 我的孖豆金额
        myBeansList: [{address: '哈哈哈哈'}] // 客户销售单列表
      }
    },
    methods: {
      // 金额格式化
      priceFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '2')
      },
      // 处理分页
      handleSizeChange (val) {
        this.pageSize = val
        this.initData()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.initData()
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
</style>
