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
          <div>{{myCoinsAmount.balance}}</div>
        </el-form-item>
        <el-form-item label="提现：">
          <div>{{myCoinsAmount.withdrawDeposit}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="收入：">
          <div>{{myCoinsAmount.income}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="支出：">
          <div>{{myCoinsAmount.payOut}}</div>
        </el-form-item>
      </el-col>
    </el-form>
    <!--表格-->
    <el-table
      :data="myCoinsList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      style="width: 100%">
      <el-table-column
        prop="businessTime"
        label="业务日期"
        min-width="160"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="businessTypeDesc"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="balance"
        header-align="center"
        align="right"
        min-width="100"
        :formatter="priceFormatter"
        show-overflow-tooltip
        label=业务金额>
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="right"
        min-width="100"
        :formatter="priceFormatter"
        show-overflow-tooltip
        label="孖蹦余额">
      </el-table-column>
      <el-table-column
        prop="operateTypeDesc"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="业务操作">
      </el-table-column>
      <el-table-column
        prop="remark"
        align="left"
        header-align="center"
        min-width="200"
        show-overflow-tooltip
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
  import { getMyCoinsAmount, getMyCoinsList } from '../../api/accountManage.js'

  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        myCoinsAmount: {
          balance: '', // 余额
          income: '', // 收入
          payOut: '', // 支出
          withdrawDeposit: '' // 提现
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        myCoinsList: [{address: '哈哈哈哈'}] // 客户销售单列表
      }
    },
    methods: {
      initData () {
        getMyCoinsAmount().then(res => {
          if (res.code === 1) {
            this.myCoinsAmount = res.data
          }
        })
        getMyCoinsList({
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then(res => {
          if (res.code === 1 && res.data) {
            this.myCoinsList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
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
  .condition {
    text-align: center;
    font-weight: 400;
  }
</style>
