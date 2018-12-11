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
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商户编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商户名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
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
      if (this.orderId) {
        getOrderFormDetailList(this.orderId).then(res => {
          if (res.code === 1) {
            this.list = res.data.list
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
        list: [] // 列表
      }
    },
    method: {
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
