<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/marketList'}">销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售明细</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表格-->
    <el-table
      :data="list"
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
        prop="skuId"
        label="产品编号"
        align="center"
        min-width="100">
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
        prop="brand"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="saleProperty"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="规格">
      </el-table-column>
      <el-table-column
        prop="model"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="型号">
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        header-align="center"
        align="right"
        :formatter="priceFormatter"
        min-width="100"
        show-overflow-tooltip
        label="价格">
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
  import { getOrderFormDetailList } from '../../api/marketManage.js'
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
        list: [] // 列表
      }
    },
    methods: {
      initData () {
        if (this.orderId) {
          getOrderFormDetailList({pageSize: this.pageSize, pageNum: this.pageNum, params: this.orderId}).then(res => {
            if (res.code === 1) {
              this.list = res.data.list
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
