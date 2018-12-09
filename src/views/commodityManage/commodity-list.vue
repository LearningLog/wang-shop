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
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" @click="add" :disabled="btnDisabled">添加</el-button>
    <el-button type="danger" size="mini" @click="remove" :disabled="btnDisabled">删除</el-button>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      ref="checkedList"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        label="选择"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号（SKU）"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="skuName"
        align="center"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="brand"
        align="center"
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="saleProperty"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="model"
        align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="manufacturerName"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        header-align="center"
        align="right"
        :formatter="unitPriceFormatter"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        :formatter="createTimeFormatter"
        width="140"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        :formatter="statusFormatter"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
        :page-size="searchData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getProductList, deleteProduct } from '../../api/commodityManage.js'
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          pageSize: 10, // 每页条数
          pageNum: 1, // 当前第几页
          skuName: '', // 产品名称
          skuId: '' // 产品编号
        },
        productList: [], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [], // CheckBox选择的数据
        total: 0, // 总页数
        currentSize: 0 // 当前页数据条数
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getProductList(this.searchData).then(res => {
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
          pageSize: 10,
          pageNum: 1,
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
          let skuIdList = this.checkedList.map(function (item) {
            return item.skuId
          })
          let len = skuIdList.length
          skuIdList = skuIdList.join(',')
          deleteProduct(skuIdList).then(res => {
            if (res.code === 1) {
              if ((this.currentSize - len) === 0) { // 如果当前页数据已删完，则去往上一页
                this.searchData.pageNum = this.searchData.pageNum - 1
              }
              this.initData()
            }
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
        this.$router.push({path: '/commodityAdd', query: {skuId: row.skuId}})
      },
      // 明细
      handleDetail (index, row) {
      // 到详情页面
        this.$router.push({path: '/commodityDetail', query: {skuId: row.skuId}})
      },
      // 单价格式化
      unitPriceFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '2')
      },
      // 创建时间格式化
      createTimeFormatter (row, column, cellValue, index) {
        return this.$moment(cellValue).format('YYYY-MM-DD HH:mm')
      },
      statusFormatter (row, column, cellValue, index) {
        switch (cellValue) {
          case 0:
            return '待审核'
          case 1:
            return '上架'
          case 2:
            return '下架'
        }
      },
      // 处理分页
      handleSizeChange (val) {
        this.searchData.pageSize = val
        this.initData()
      },
      handleCurrentChange (val) {
        this.searchData.pageNum = val
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
