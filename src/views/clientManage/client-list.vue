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
        <el-input v-model="searchData.customerCode" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="客户标识:">
        <el-input v-model="searchData.customerIdentif" placeholder="请输入客户标识"></el-input>
      </el-form-item>
      <!--查询按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--操作按钮-->
    <div class="fr operBtn">
      <!--<el-button type="primary" size="mini" @click="add" :disabled="btnDisabled">添加</el-button>-->
      <el-button type="danger" size="mini" @click="remove" :disabled="btnDisabled">删除</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="customerList"
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
        prop="name"
        label="客户编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="渠道">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="唯一标识">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="address"
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
  </div>
</template>
<script>
  import { getCustomerList, deleteCustomer } from '../../api/clientManage.js'
  export default {
    created () {
      // getCustomerList(this.searchData).then(res => {
      //   if (res.meta.status === 200) {
      //     this.customerList = res.data.customerList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
    },
    data () {
      return {
        searchData: { // 搜索数据
          customerCode: '', // 客户编号
          customerIdentif: '' // 客户标识
        },
        customerList: [{}], // 客户列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        console.log(this.searchData)
        getCustomerList(this.searchData).then(res => {
          if (res.meta.status === 200) {
            this.customerList = res.data.customerList
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          customerCode: '', // 客户编号
          customerIdentif: '' // 客户标识
        }
        this.onSearch()
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
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
          deleteCustomer(this.checkedList).then(res => {
            if (res.meta.status === 200) {
              this.customerList = res.data.customerList
            }
          })
        }
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        //   this.$router.push({path: '/customerSalesOrderDetail', query: {pId: row.goods_id}})
        this.$router.push({path: '/customerSalesOrderDetail', query: {pId: '11111'}})
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
