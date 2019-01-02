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
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="产品品牌"
        min-width="150"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号"
        align="center"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="产品名称"
        align="center"
        min-width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="skuBuyNum"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        min-width="100"
        show-overflow-tooltip
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="产品单价">
      </el-table-column>
      <el-table-column
        prop="saleProperty"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="产品规格">
      </el-table-column>
      <el-table-column
        prop="model"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="产品型号">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="订单金额">
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
  import { getOrderFormDetailList } from '../../api/orderFormManage.js'
  export default {
    created () {
      this.orderId = this.$route.query.orderId
      this.initData()
    },
    data () {
      return {
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        orderFormList: [] // 产品列表
      }
    },
    methods: {
      initData () {
        if (this.orderId) {
          getOrderFormDetailList(this.orderId).then(res => {
            if (res.code === 1) {
              this.orderFormList = res.data
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
