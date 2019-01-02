<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/splitAccountList'}">分账管理</el-breadcrumb-item>
  <el-breadcrumb-item>分账明细</el-breadcrumb-item>
  </el-breadcrumb>
  <!--表格-->
  <el-table
    :data="splitAccountDetailList"
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
    prop="shareBillId"
    label="销售单编号"
    align="center"
    min-width="120"
    show-overflow-tooltip>
  </el-table-column>
  <el-table-column
    prop="orderTimeStr"
    label="销售日期"
    align="center"
    min-width="160"
    show-overflow-tooltip>
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
    prop="venderId"
    align="center"
    min-width="100"
    show-overflow-tooltip
    label="商户编号">
  </el-table-column>
  <el-table-column
    prop="venderName"
    label="商户名称"
    min-width="150"
    show-overflow-tooltip
    align="center">
  </el-table-column>
  <el-table-column
    prop="shareAcount"
    header-align="cenetr"
    align="right"
    :formatter="priceFormatter"
    min-width="100"
    show-overflow-tooltip
    label="分账金额">
  </el-table-column>
  <el-table-column
    prop="shareRate"
    header-align="cenetr"
    align="right"
    :formatter="rateFormatter"
    min-width="100"
    show-overflow-tooltip
    label="分账费率">
  </el-table-column>
  <el-table-column
    prop="statusStr"
    align="center"
    min-width="100"
    show-overflow-tooltip
    label="分账状态">
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
import { getOrderFormDetailList } from '../../api/splitAccountManage.js'
const qs = require('querystring')
export default {
  created () {
    this.shareBillId = this.$route.query.shareBillId
    this.initData()
  },
  data () {
    return {
      pageSize: 10, // 每页条数
      pageNum: 1, // 当前第几页
      total: 0, // 总页数
      currentSize: 0, // 当前页数据条数
      splitAccountDetailList: [] // 产品列表
    }
  },
  methods: {
    initData () {
      if (this.shareBillId) {
        getOrderFormDetailList({shareBillId: this.shareBillId, params: qs.stringify(({pageSize: this.pageSize, pageNum: this.pageNum}))}).then(res => {
          if (res.code === 1) {
            this.splitAccountDetailList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      }
    },
    // 单价、数量格式化
    priceFormatter (row, column, cellValue, index) {
      return this.$accounting.format((cellValue / 100), '2')
    },
    rateFormatter (row, column, cellValue, index) {
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
