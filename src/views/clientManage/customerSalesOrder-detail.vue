<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/clientList'}">C端客户</el-breadcrumb-item>
      <el-breadcrumb-item>客户销售单</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表格-->
    <el-table
      :data="sealsList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="销售单编号"
        min-width="100"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="userId"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="客户编号">
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="venderName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="商家名称">
      </el-table-column>
      <el-table-column
        prop="skuId"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="产品编码">
      </el-table-column>
      <el-table-column
        prop="skuName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="skuBuyNum"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        align="center"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="销售单金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="销售日期"
        min-width="150"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="支付渠道"
        min-width="100"
        show-overflow-tooltip
        align="center">
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
  import { getSalesList } from '../../api/clientManage.js'
  const qs = require('querystring')

  export default {
    created () {
      this.userId = this.$route.query.userId
      this.initData()
    },
    data () {
      return {
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        userId: null, // C用户编号
        sealsList: [] // 客户销售单列表
      }
    },
    methods: {
      initData () {
        if (this.userId) {
          getSalesList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify({userId: this.userId})}).then(res => {
            if (res.code === 1) {
              this.sealsList = res.data.list ? res.data.list : []
              this.total = res.data.total
              this.currentSize = res.data.size
            }
          })
        }
      },
      // 数量格式化
      numFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '0')
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
</style>
