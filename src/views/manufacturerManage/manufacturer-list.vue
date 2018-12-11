<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>厂商管理</el-breadcrumb-item>
      <el-breadcrumb-item>厂商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="厂商名称:">
        <el-input v-model="searchData.name" placeholder="请输入厂商名称"></el-input>
      </el-form-item>
      <el-form-item label="厂商编号:">
        <el-input v-model="searchData.id" placeholder="请输入厂商编号"></el-input>
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
        prop="manufacturerId"
        label="厂商编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="manufacturerName"
        align="center"
        label="厂商名称">
      </el-table-column>
      <el-table-column
        prop="brand"
        align="center"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="registerAddress"
        align="center"
        label="注册地址">
      </el-table-column>
      <el-table-column
        prop="tel"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="contact"
        align="center"
        label="联系人">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
  import { getManufacturerList, deleteManufacturers } from '../../api/manufacturerManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: { // 搜索数据
          name: '', // 厂商名称
          id: '' // 厂商编号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        productList: [], // 产品列表
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        this.initData()
      },
      initData () {
        getManufacturerList({pageSize: this.pageSize, pageNum: this.pageNum, venderId: this.venderId, params: qs.stringify((this.searchData))}).then(res => {
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
          name: '', // 厂商名称
          id: '' // 厂商编号
        }
        this.onSearch()
      },
      // 添加
      add () {
        // 到新增页面
        this.$router.push({path: '/manufacturerAdd'})
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 删除
      remove () {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请选择至少一个供应商！',
            type: 'warning'
          })
          return false
        } else {
          this.$confirm('确认删除吗吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { // 点击确认执行 resolve 函数
            let ids = this.checkedList.map(function (item) {
              return item.id
            })
            let len = ids.length
            ids = ids.join(',')
            deleteManufacturers(ids).then(res => {
              if (res.code === 1) {
                if ((this.currentSize - len) === 0) { // 如果当前页数据已删完，则去往上一页
                  this.pageNum = this.pageNum - 1
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
        this.$router.push({path: '/manufacturerEdit', query: {id: row.id}})
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
</style>
