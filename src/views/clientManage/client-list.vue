<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>C端客户</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="客户编号:">
        <el-input v-model="searchData.userId" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="客户标识:">
        <el-input v-model="searchData.unique" placeholder="请输入客户标识"></el-input>
      </el-form-item>
      <!--查询按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="customerList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="userId"
        label="客户编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="channel"
        align="center"
        label="渠道">
      </el-table-column>
      <el-table-column
        prop="unique"
        align="center"
        label="唯一标识">
      </el-table-column>
      <el-table-column
        prop="tel"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="venderName"
        align="center"
        label="商户名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">销售单</el-button>
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
  import { getclientList } from '../../api/clientManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          userId: '', // 客户编号
          unique: '' // 客户标识
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        customerList: [] // 客户列表
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getclientList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1 && res.data) {
            this.customerList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          userId: '', // 客户编号
          unique: '' // 客户标识
        }
        this.onSearch()
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/customerSalesOrderDetail', query: {userId: row.userId}})
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
  .customerTime {
    width:220px;
  }
</style>
