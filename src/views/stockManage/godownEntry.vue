<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/stockList' }">库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库单</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="产品名称:">
        <el-input v-model="searchData.skuName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchData.skuId" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="订单编号:">
        <el-input v-model="searchData.orderId" placeholder="请输入订单编号"></el-input>
      </el-form-item>
      <el-form-item label="入库状态:">
        <el-select v-model="searchData.orderStatus" placeholder="请选择入库状态">
          <el-option
            v-for="item in stateList"
            :key="item.code"
            :label="item.desc"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送编号:">
        <el-input v-model="searchData.logisticsNo" placeholder="请输入配送编号"></el-input>
      </el-form-item>
      <!--查询按钮-->
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      style="width: 100%">
      <el-table-column
        prop="venderOrderId"
        label="订单编号"
        min-width="130"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号(SKU)"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="skuName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品名称">
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
        prop="manufacturerName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        align="center"
        min-width="160"
        show-overflow-tooltip
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="orderStatusStr"
        header-align="center"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="状态">
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
  import { getGodownEntryList, getGodownEntryState } from '../../api/stockManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.venderId = this.$route.query.venderId
      getGodownEntryState().then(res => {
        if (res.code === 1) {
          this.stateList = res.data
        }
      })
      this.initData()
    },
    data () {
      return {
        searchData: {// 搜索数据
          skuName: '', // 产品名称
          skuId: '', // 产品编号
          orderId: '', // 订单编号
          orderStatus: '', // 入库状态
          logisticsNo: '' // 配送编号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        venderId: null, // 商家id
        stateList: [], // 状态下拉数据
        productList: [] // 产品列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getGodownEntryList({pageSize: this.pageSize, pageNum: this.pageNum, venderId: this.venderId, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1 && res.data) {
            this.productList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          skuName: '', // 产品名称
          skuId: '', // 产品编号
          orderId: '', // 订单编号
          orderStatus: '', // 入库状态
          logisticsNo: '' // 配送编号
        }
        this.pageNum = 1
        this.onSearch()
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
  .searchData {
    margin-top: 10px;
  }
  .publishTime {
    width:220px;
  }
  .operBtn {
    margin-right: 14px;
  }
</style>
