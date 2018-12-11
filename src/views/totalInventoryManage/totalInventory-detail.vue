<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>总库存明细</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="产品名称:">
        <el-input v-model="searchData.skuName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchData.skuId" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="操作时间:">
        <el-date-picker
          class="operateTime"
          v-model="operateTime"
          type="daterange"
          @change="operateTimeTimeChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型:">
        <el-select class="operateType" v-model="searchData.operateType" placeholder="请选择操作类型">
          <el-option
            v-for="item in operateTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      <el-button type="primary" size="mini" @click="reset">重置</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      style="width: 100%">
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
        header-align="center"
        align="right"
        :formatter="timeFormatter"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="skuNum"
        header-align="center"
        align="right"
        :formatter="priceFormatter"
        label="操作数量">
      </el-table-column>
      <el-table-column
        prop="operateType"
        label="操作类型"
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
  import { getDetailList } from '../../api/totalInventoryManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.searchData.skuId = this.$route.query.skuId
      this.initData()
    },
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        searchData: {// 搜索数据
          skuId: null, // 商品编号
          skuName: '' // 产品名称
          // startTime: '', // 开始时间
          // endTime: '', // 结束时间
          // operateType: '' // 操作类型
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        operateTime: [], // 发布时间
        operateTypeList: [{id: 1, title: '已发布'}, {id: 2, title: '待发布'}], // 操作类型下拉数据
        productList: [] // 产品列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getDetailList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
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
          skuId: this.searchData.skuId, // 商品编号
          skuName: '' // 产品名称
          // startTime: '', // 开始时间
          // endTime: '', // 结束时间
          // operateType: '' // 操作类型
        }
        this.onSearch()
      },
      // 获取发布时间
      operateTimeTimeChange (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
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
      // 单价、数量格式化
      priceFormatter (row, column, cellValue, index) {
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
  .searchData {
    margin-top: 10px;
  }
  .operateTime {
    width:220px;
  }
  .operateType {
    width: 180px;
  }
</style>
