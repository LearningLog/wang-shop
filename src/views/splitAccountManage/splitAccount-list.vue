<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分账管理</el-breadcrumb-item>
      <el-breadcrumb-item>分账列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchData" size="mini" class="searchData">
      <el-form-item label="分账订单编号:">
        <el-input v-model="searchData.splitAccountCode" placeholder="请输入分账订单编号"></el-input>
      </el-form-item>
      <el-form-item label="分账类型:">
        <el-input v-model="searchData.splitAccountCode" placeholder="请输入分账类型"></el-input>
      </el-form-item>
      <el-form-item label="分账日期:">
        <el-date-picker
          class="splitAccountTime"
          v-model="searchData.splitAccountTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商户编号:">
        <el-input v-model="searchData.customerCode" placeholder="请输入商户编号"></el-input>
      </el-form-item>
      <el-form-item label="商户名称:">
        <el-input v-model="searchData.customerName" placeholder="请输入商户名称"></el-input>
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
      :data="splitAccountList"
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
        label="分账订单编号"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账日期">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账开始日期">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账结束日期">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商户编号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账类型">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账金额">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="分账费率">
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
  import { getSplitAccountList, deleteSplitAccount } from '../../api/splitAccountManage.js'
  export default {
    created () {
      // getSplitAccountList(this.searchData).then(res => {
      //   if (res.meta.status === 200) {
      //     this.splitAccountList = res.data.splitAccountList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
    },
    data () {
      return {
        searchData: { // 搜索数据
          splitAccountCode: '', // 销售订单编号
          splitAccountTime: [], // 订单日期
          businessCode: '', // 客户姓名
          customerCode: '', // 商户编号,
          customerName: '' // 商户名称
        },
        splitAccountList: [{}], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        console.log(this.searchData)
        getSplitAccountList(this.searchData).then(res => {
          if (res.meta.status === 200) {
            this.splitAccountList = res.data.splitAccountList
          }
        })
      },
      // 重置
      reset () {
        this.searchData = { // 搜索数据
          splitAccountCode: '', // 销售订单编号
          splitAccountTime: [], // 订单日期
          businessCode: '', // 客户姓名
          customerCode: '', // 商户编号,
          customerName: '' // 商户名称
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
          deleteSplitAccount(this.checkedList).then(res => {
            if (res.meta.status === 200) {
              this.splitAccountList = res.data.splitAccountList
            }
          })
        }
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        //   this.$router.push({path: '/splitAccountDetail', query: {pId: row.goods_id}})
        this.$router.push({path: '/splitAccountDetail', query: {pId: '11111'}})
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
  .splitAccountTime {
    width:220px;
  }
</style>
