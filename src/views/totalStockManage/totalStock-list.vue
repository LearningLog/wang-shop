<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>总库存列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="产品名称:">
        <el-input v-model="searchData.skuName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchData.skuId" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="厂家:">
        <el-select v-model="searchData.manufacturerId" @change="manufacturerChange" placeholder="请选择厂家">
          <el-option
            v-for="item in manufacturerList"
            :key="item.code"
            :label="item.desc"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌:">
        <el-input v-model="searchData.brand" placeholder="请输入品牌"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </el-form>
    <el-table
      :data="productList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      ref="checkedList"
      style="width: 100%">
      <el-table-column
        prop="skuId"
        label="产品编号(SKU)"
        align="center"
        width="120">
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
        min-width="100"
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
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="priceFormatter"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="totalStock"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
        label="库存数量">
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
  import { getTotalList } from '../../api/totalStockManage.js'
  const qs = require('querystring')

  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: {// 搜索数据
          skuName: '', // 产品名称
          skuId: '', // 产品编号
          manufacturerId: '', // 厂商编号
          // manufacturerName: '', // 厂商名称
          brand: '' // 品牌
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        manufacturerList: [{code: 3464, desc: '厂商13'}, {code: 3465, desc: '厂商14'}], // 厂家
        productList: [] // 产品列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getTotalList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
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
          manufacturerId: '', // 厂商编号
          // manufacturerName: '', // 厂商名称
          brand: '' // 品牌
        }
        this.pageNum = 1
        this.onSearch()
      },
      // 监听厂家改变
      manufacturerChange (val) {
        let obj = {}
        obj = this.manufacturerList.find((item) => {
          return item.code === val
        })
        this.searchData.manufacturerName = obj.desc
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/totalStockDetail', query: {skuId: row.skuId}})
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
</style>
