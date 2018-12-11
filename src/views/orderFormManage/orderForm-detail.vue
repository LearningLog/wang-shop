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
        prop="brand"
        label="产品品牌"
        align="center">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="产品名称"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="skuBuyNum"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="产品单价">
      </el-table-column>
      <el-table-column
        prop="saleProperty"
        align="center"
        label="产品规格">
      </el-table-column>
      <el-table-column
        prop="model"
        align="center"
        label="产品型号">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        :formatter="numFormatter"
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
      if (this.orderId) {
        getOrderFormDetailList(this.orderId).then(res => {
          if (res.code === 1) {
            this.orderFormList = res.data
          }
        })
      }
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
    menthod: {
      // 单价、数量格式化
      numFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '2')
      },
      // 时间格式化
      timeFormatter (row, column, cellValue, index) {
        return this.$moment(cellValue).format('YYYY-MM-DD HH:mm')
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
