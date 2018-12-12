<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="销售订单编号:">
        <el-input v-model="searchData.orderId" placeholder="请输入销售订单编号"></el-input>
      </el-form-item>
      <el-form-item label="订单日期:">
        <el-date-picker
          class="orderFormTime"
          v-model="orderFormTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户姓名:">
        <el-input v-model="searchData.userName" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="searchData.userPhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
    <!--查询按钮-->
    <div class="fl">
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      <el-button type="primary" size="mini" @click="reset">重置</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="orderFormList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="销售订单编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="orderCreateTime"
        align="center"
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="orderFeeAmount"
        header-align="center"
        align="right"
        :formatter="priceFormatter"
        label="销售金额">
      </el-table-column>
      <el-table-column
        prop="skuBuyNum"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        align="center"
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
  import { getOrderFormList } from '../../api/marketManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          // orderId: '', // 销售订单编号
          orderStartTime: '', // 订单开始时间
          orderEndTime: '', // 订单结束时间
          userName: '', // 客户姓名
          userPhone: '' // 手机号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        orderFormTime: [], // 订单日期
        orderFormList: [] // 订单列表
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
          orderId: '', // 销售订单编号
          orderStartTime: '', // 订单开始时间
          orderEndTime: '', // 订单结束时间
          userName: '', // 客户姓名
          userPhone: '' // 手机号
        }
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
        this.$router.push({path: '/marketDetail', query: {orderId: row.orderId}})
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
  .searchData {
    margin-top: 10px;
  }
  .orderFormTime {
    width:220px;
  }
</style>
