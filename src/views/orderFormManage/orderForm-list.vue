<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="订单编号:">
        <el-input v-model="searchData.orderId" placeholder="请输入订单编号"></el-input>
      </el-form-item>
      <el-form-item label="订单日期:">
        <el-date-picker
          class="orderFormTime"
          v-model="orderFormTime"
          @change="orderFormTimeChange"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商户编号:">
        <el-input v-model="searchData.venderId" placeholder="请输入商户编号"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="searchData.venderName" placeholder="请输入商户名称"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称:">
        <el-input v-model="searchData.manufacturerName" placeholder="请输入厂商名称"></el-input>
      </el-form-item>
      <el-form-item label="厂商编号:">
        <el-input v-model="searchData.manufacturerId" placeholder="请输入厂商编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
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
        prop="orderId"
        label="订单编号"
        align="center"
        min-width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderTimeStr"
        align="center"
        min-width="160"
        show-overflow-tooltip
        label="订单日期">
      </el-table-column>
      <el-table-column
        prop="manufacturerId"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="商户编号">
      </el-table-column>
      <el-table-column
        prop="manufacturerName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="venderId"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="厂商编号">
      </el-table-column>
      <el-table-column
        prop="venderName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="厂商名称">
      </el-table-column>
      <el-table-column
        prop="orderFeeAmount"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="订单金额">
      </el-table-column>
      <el-table-column
        prop="buynum"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="orderStatusStr"
        align="center"
        min-width="80"
        show-overflow-tooltip
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">明细</el-button>
        </template>
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
  import { getOrderFormList } from '../../api/orderFormManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          orderId: '', // 订单编号
          venderId: '', // 商户编号
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          venderName: '', // 商户名称
          manufacturerName: '', // 厂商名称
          manufacturerId: '' // 厂商编号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        orderFormTime: [], // 订单日期
        orderFormList: [] // 产品列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getOrderFormList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1 && res.data) {
            this.orderFormList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          orderId: '', // 订单编号
          venderId: '', // 商户编号
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          venderName: '', // 商户名称
          manufacturerName: '', // 厂商名称
          manufacturerId: '' // 厂商编号
        }
        this.orderFormTime = [] // 订单日期
        this.pageNum = 1
        this.onSearch()
      },
      // 获取订单时间
      orderFormTimeChange (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/orderFormDetail', query: {orderId: row.orderId}})
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
  .searchData {
    margin-top: 10px;
  }
  .orderFormTime {
    width:220px !important;
  }
</style>
