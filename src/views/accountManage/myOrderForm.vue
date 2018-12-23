<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的销售单</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="销售单编号:">
        <el-input v-model="searchData.orderId" placeholder="请输入销售单编号"></el-input>
      </el-form-item>
      <el-form-item label="销售日期:">
        <el-date-picker
          class="salesTime"
          v-model="salesTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          @change="publishTimeChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算状态:">
        <el-select v-model="searchData.shareStatus" placeholder="请选择结算状态">
          <el-option
            v-for="item in settleStatusList"
            :key="item.code"
            :label="item.desc"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <!--查询按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="salesFormList"
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
        align="center"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="skuId"
        min-width="100"
        show-overflow-tooltip
        align="center"
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
        header-align="center"
        align="right"
        min-width="100"
        :formatter="priceFormatter"
        show-overflow-tooltip
        label="销售单金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        min-width="160"
        show-overflow-tooltip
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="payTypeDesc"
        label="支付渠道"
        min-width="100"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="fraction"
        label="分润比例"
        header-align="center"
        align="right"
        :formatter="priceFormatter"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="skuBuyPrice"
        label="分润金额"
        min-width="100"
        header-align="center"
        align="right"
        :formatter="priceFormatter"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="orderItemStatusDesc"
        label="分润状态"
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
  import { getSalesFormList, getBalanceState } from '../../api/accountManage.js'
  const qs = require('querystring')
  export default {
    created () {
      getBalanceState().then(res => {
        if (res.code === 1) {
          this.settleStatusList = res.data
        }
      })
      this.iniData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          orderId: '', // 销售单编号
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          shareStatus: '' // 销售日期
        },
        salesTime: [], // 销售日期
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        salesFormList: [], // 销售单列表
        settleStatusList: [] // 结算下拉数据
      }
    },
    methods: {
      iniData () {
        getSalesFormList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify(this.searchData)}).then(res => {
          if (res.code === 1) {
            this.salesFormList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 搜索
      onSearch () {
        this.iniData()
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          orderId: '', // 销售单编号
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          shareStatus: '' // 销售日期
        }
        this.iniData()
      },
      // 获取发布时间
      publishTimeChange (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      },
      // 金额格式化
      priceFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '2')
      },
      // 数量格式化
      numFormatter (row, column, cellValue, index) {
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
  .salesTime {
    width:220px !important;
  }
</style>
