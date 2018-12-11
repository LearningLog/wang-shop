<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品发布列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="产品名称:">
        <el-input v-model="searchData.skuName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchData.skuId" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="发布时间:">
        <el-date-picker
          class="publishTime"
          v-model="publishTime"
          value-format="timestamp"
          type="daterange"
          @change="publishTimeChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchData.status" placeholder="请选择状态">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!--查询按钮-->
    <div class="fl">
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      <el-button type="primary" size="mini" @click="reset">重置</el-button>
    </div>
    <!--操作按钮-->
    <div class="fr operBtn">
      <el-button type="primary" size="mini" @click="addProduct" :disabled="btnDisabled">添加</el-button>
      <el-button type="danger" size="mini" @click="deleteProduct" :disabled="btnDisabled">删除</el-button>
    </div>
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
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        :formatter="timeFormatter"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="publishNum"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="发布数量">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        :formatter="numFormatter"
        label="现存数量">
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
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getProductList, deleteProduct } from '../../api/publishManage.js'
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
          startTime: '', // 开始日期
          endTime: '', // 结束日期
          status: '' // 状态
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        publishTime: [], // 发布时间
        stateList: [{id: 1, title: '已发布'}, {id: 2, title: '待发布'}], // 状态下拉数据
        productList: [{skuId: 2000}], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      initData () {
        getProductList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1) {
            this.productList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 搜索
      onSearch () {
        this.initData()
      },
      // 重置
      reset () {
        this.searchData = {
          skuName: '', // 产品名称
          skuId: '', // 产品编号
          startTime: '', // 开始日期
          endTime: '', // 结束日期
          status: '' // 状态
        }
        this.initData()
      },
      // 获取发布时间
      publishTimeChange (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      },
      // 添加
      addProduct () {
        // 到编辑页面
        this.$router.push({path: '/addPublishProduct'})
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 删除
      deleteProduct () {
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
            let publishIdStr = this.checkedList.map(function (item) {
              return item.publishId
            })
            let len = publishIdStr.length
            publishIdStr = publishIdStr.join(',')
            deleteProduct(publishIdStr).then(res => {
              if (res.code === 1) {
                if ((this.currentSize - len) === 0) { // 如果当前页数据已删完，则去往上一页
                  this.pageNum = this.searchData.pageNum - 1
                }
                this.initData()
              }
            })
          }).catch(() => {
            // 点击取消的处理
          })
        }
      },
      // 修改
      handleEdit (index, row) {
        // 到编辑页面
        // this.$router.push({path: '/editPublishProduct', query: {publishId: row.publishId}})
        this.$router.push({path: '/editPublishProduct', query: {publishId: 2000}})
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        // this.$router.push({path: '/publishProductDetail', query: {publishId: row.publishId}})
        this.$router.push({path: '/publishProductDetail', query: {publishId: 2000}})
      }
    },
    // 时间格式化
    timeFormatter (row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD HH:mm')
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
