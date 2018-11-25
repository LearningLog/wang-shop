<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="销售订单编号:">
        <el-input v-model="searchData.orderFormCode" placeholder="请输入销售订单编号"></el-input>
      </el-form-item>
      <el-form-item label="订单日期:">
        <el-date-picker
          class="orderFormTime"
          v-model="searchData.orderFormTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户姓名:">
        <el-input v-model="searchData.customerName" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="searchData.customerPhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
    <!--查询按钮-->
    <div class="fl">
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      <el-button type="primary" size="mini" @click="reset">重置</el-button>
    </div>
    <!--操作按钮-->
    <div class="fr operBtn">
      <!--<el-button type="primary" size="mini" @click="add" :disabled="btnDisabled">添加</el-button>-->
      <el-button type="danger" size="mini" @click="remove" :disabled="btnDisabled">删除</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="orderFormList"
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
        label="销售订单编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="销售金额">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品数量">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
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
  </div>
</template>
<script>
  import { getOrderFormList, deleteOrderForm } from '../../api/marketManage.js'
  export default {
    created () {
      // getOrderFormList(this.searchData).then(res => {
      //   if (res.meta.status === 200) {
      //     this.orderFormList = res.data.orderFormList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
    },
    data () {
      return {
        searchData: { // 搜索数据
          orderFormCode: '', // 销售订单编号
          orderFormTime: [], // 订单日期
          businessCode: '', // 客户姓名
          customerName: '', // 商户名称
          customerPhone: '' // 手机号
        },
        orderFormList: [{}], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        console.log(this.searchData)
        getOrderFormList(this.searchData).then(res => {
          if (res.meta.status === 200) {
            this.orderFormList = res.data.orderFormList
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          orderFormCode: '', // 销售订单编号
          orderFormTime: [], // 订单日期
          businessCode: '', // 客户姓名
          customerName: '', // 商户名称
          customerPhone: '' // 手机号
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
          deleteOrderForm(this.checkedList).then(res => {
            if (res.meta.status === 200) {
              this.orderFormList = res.data.orderFormList
            }
          })
        }
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        //   this.$router.push({path: '/marketDetail', query: {pId: row.goods_id}})
        this.$router.push({path: '/marketDetail', query: {pId: '11111'}})
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
  .orderFormTime {
    width:220px;
  }
</style>
