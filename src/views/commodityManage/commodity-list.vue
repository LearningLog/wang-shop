<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" size="mini" class="searchData">
      <el-form-item label="产品名称:">
        <el-input v-model="searchData.skuName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchData.skuId" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" @click="add" :disabled="btnDisabled">添加</el-button>
    <el-button type="danger" size="mini" @click="remove" :disabled="btnDisabled">删除</el-button>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      ref="checkedList"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        fixed="left"
        type="selection"
        label="选择"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号(SKU)"
        align="center"
        min-width="120"
        show-overflow-tooltip>
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
        prop="createTime"
        align="center"
        min-width="160"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="statusDesc"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="220">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">明细</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handlePublish(scope.$index, scope.row)">发布</el-button>
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
  import { getProductList, deleteProduct } from '../../api/commodityManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          skuName: '', // 产品名称
          skuId: '' // 产品编号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        productList: [], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getProductList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
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
          skuId: '' // 产品编号
        }
        this.onSearch()
      },
      // 添加
      add () {
        // 到新增页面
        this.$router.push({path: '/commodityAdd'})
      },
      // 删除
      remove () {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请选择至少一项产品记录！',
            type: 'warning'
          })
          return false
        } else {
          this.$confirm('确认删除吗吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { // 点击确认执行 resolve 函数
            let skuIdList = this.checkedList.map(function (item) {
              return item.skuId
            })
            let len = skuIdList.length
            skuIdList = skuIdList.join(',')
            deleteProduct(skuIdList).then(res => {
              if (res.code === 1) {
                if ((this.currentSize - len) === 0) { // 如果当前页数据已删完，则去往上一页
                  this.pageNum -= 1
                }
                this.initData()
              }
            })
          }).catch(() => {
            // 点击取消的处理
          })
        }
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 修改
      handleEdit (index, row) {
      // 到编辑页面
        this.$router.push({path: '/commodityEdit', query: {skuId: row.skuId}})
      },
      // 明细
      handleDetail (index, row) {
      // 到详情页面
        this.$router.push({path: '/commodityDetail', query: {skuId: row.skuId}})
      },
      // 发布
      handlePublish (index, row) {
        // 到发布商品页面
        this.$router.push({path: '/addPublishProduct', query: {skuId: row.skuId}})
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
</style>
