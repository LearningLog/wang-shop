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
          <div>{{myBeansAmount.balance}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="收入：">
          <div>{{myBeansAmount.income}}</div>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="支出：">
          <div>{{myBeansAmount.payOut}}</div>
        </el-form-item>
      </el-col>
    </el-form>
    <!--表格-->
    <el-table
      :data="myBeansList"
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
        prop="amount"
        header-align="center"
        align="right"
        min-width="100"
        :formatter="priceFormatter"
        show-overflow-tooltip
        label=业务金额>
      </el-table-column>
      <el-table-column
        prop="balance"
        header-align="center"
        align="right"
        min-width="100"
        :formatter="priceFormatter"
        show-overflow-tooltip
        label="孖豆余额">
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
  import { getMyBeansAmount, getMyBeansList } from '../../api/accountManage.js'
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        venderId: null, // 商家编号
        myBeansAmount: {
          balance: '', // 余额
          income: '', // 收入
          payOut: '' // 支出
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        myBeansList: [] // 孖豆列表
      }
    },
    methods: {
      initData () {
        getMyBeansAmount().then(res => {
          if (res.code === 1 && res.data) {
            this.myBeansAmount = res.data
            this.myBeansAmount.balance = this.$accounting.format((this.myBeansAmount.balance / 100), '2')
            this.myBeansAmount.income = this.$accounting.format((this.myBeansAmount.income / 100), '2')
            this.myBeansAmount.payOut = this.$accounting.format((this.myBeansAmount.payOut / 100), '2')
          }
        })
        getMyBeansList({pageSize: this.pageSize, pageNum: this.pageNum}).then(res => {
          if (res.code === 1 && res.data) {
            this.myBeansList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 金额格式化
      priceFormatter (row, column, cellValue, index) {
        return this.$accounting.format((cellValue / 100), '2')
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
