<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分账管理</el-breadcrumb-item>
      <el-breadcrumb-item>分账列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="分账订单编号:">
        <el-input v-model="searchData.shareBillId" placeholder="请输入分账订单编号"></el-input>
      </el-form-item>
      <el-form-item label="分账类型:">
        <el-select v-model="searchData.shareType" placeholder="请选择分账类型">
          <el-option
            v-for="item in shareTypeList"
            :key="item.code"
            :label="item.desc"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分账日期:">
        <el-date-picker
          class="splitAccountTime"
          v-model="splitAccountTime"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="timeChange"
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
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="splitAccountList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      style="width: 100%">
      <el-table-column
        prop="shareBillId"
        label="分账订单编号"
        align="center"
        min-width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="shareTimeStr"
        align="center"
        min-width="160"
        show-overflow-tooltip
        label="分账日期">
      </el-table-column>
      <el-table-column
        prop="venderId"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="商户编号">
      </el-table-column>
      <el-table-column
        prop="venderName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="shareTypeStr"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="分账类型">
      </el-table-column>
      <el-table-column
        prop="shareAccount"
        header-align="cenetr"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="分账金额">
      </el-table-column>
      <el-table-column
        prop="shareRate"
        header-align="cenetr"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
        label="分账费率">
      </el-table-column>
      <el-table-column
        prop="statusStr"
        align="center"
        min-width="100"
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
  import { getSplitAccountList, getSplitAccountType } from '../../api/splitAccountManage.js'
  const qs = require('querystring')
  export default {
    created () {
      getSplitAccountType().then(res => {
        if (res.code === 1) {
          this.shareTypeList = res.data
        }
      })
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          shareBillId: '', // 销售订单编号
          shareType: '', // 分账类型,
          startShareTime: '', // 分账开始日期
          endShareTime: '', // 分账截止日期
          venderName: '', // 客户姓名
          venderId: '' // 商户编号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        shareTypeList: [], // 分账类型
        splitAccountTime: [], // 分账日期
        splitAccountList: [] // 产品列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getSplitAccountList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1 && res.data) {
            this.splitAccountList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          shareBillId: '', // 销售订单编号
          shareType: '', // 分账类型,
          startShareTime: '', // 分账开始日期
          endShareTime: '', // 分账截止日期
          venderName: '', // 客户姓名
          venderId: '' // 商户编号
        }
        this.splitAccountTime = []
        this.pageNum = 1
        this.onSearch()
      },
      // 获取发布时间
      timeChange (date) {
        this.searchData.startShareTime = date[0]
        this.searchData.endShareTime = date[1]
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/splitAccountDetail', query: {shareBillId: row.shareBillId}})
      },
      // 单价格式化
      priceFormatter (row, column, cellValue, index) {
        return this.$accounting.format((cellValue / 100), '2')
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
  .splitAccountTime {
    width:220px !important;
  }
</style>
