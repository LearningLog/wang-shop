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
        <el-input v-model="searchData.salesFormCode" placeholder="请输入销售单编号"></el-input>
      </el-form-item>
      <el-form-item label="销售日期:">
        <el-date-picker
          class="salesTime"
          v-model="searchData.salesTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算状态:">
        <el-select v-model="searchData.status" placeholder="请选择结算状态">
          <el-option
            v-for="item in settleStatusList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
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
        prop="name"
        label="销售单编号"
        align="center"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="address"
        min-width="100"
        show-overflow-tooltip
        align="center"
        label="产品编码">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="销售单金额">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="支付渠道"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分润比例"
        min-width="100"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分润金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分润状态"
        min-width="100"
        show-overflow-tooltip
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  // import { getSalesFormList, deleteSalesForm } from '../../api/accountManage.js'
  export default {
    created () {
      // getSalesFormList(this.searchData).then(res => {
      //   if (res.meta.status === 200) {
      //     this.salesFormList = res.data.salesFormList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
    },
    data () {
      return {
        searchData: { // 搜索数据
          salesFormCode: '', // 销售单编号
          salesTime: [], // 销售日期
          status: '' // 销售日期
        },
        salesFormList: [{address: '哈哈哈哈哈'}], // 销售单列表
        btnDisabled: false, // 是否禁用按钮
        settleStatusList: [{title: '已结算', id: 1}] // 结算下拉数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        console.log(this.searchData)
        // getSalesFormList(this.searchData).then(res => {
        //   if (res.meta.status === 200) {
        //     this.salesFormList = res.data.salesFormList
        //   }
        // })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          salesFormCode: '', // 销售单编号
          salesTime: [], // 销售日期
          status: '' // 销售日期
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
          // deleteSalesForm(this.checkedList).then(res => {
          //   if (res.meta.status === 200) {
          //     this.salesFormList = res.data.salesFormList
          //   }
          // })
        }
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        //   this.$router.push({path: '/salesFormSalesOrderDetail', query: {pId: row.goods_id}})
        this.$router.push({path: '/salesFormSalesOrderDetail', query: {pId: '11111'}})
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
    width:220px;
  }
</style>
