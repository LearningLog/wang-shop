<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" size="mini" @click="volumeApprove" class="volumeApprove" :disabled="btnDisabled">批量审核</el-button>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      ref="checkedList"
      @selection-change="handleSelectionChange"
      max-height="500"
      style="width: 100%">
      <el-table-column
        type="selection"
        label="选择"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品编号（SKU）"
        align="center"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="发布数量">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
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
  </div>
</template>
<script>
  // import { searchProduct, getProductList } from '@/api/publishManage.js'
  export default {
    data () {
      return {
        productList: [{name: 'SKU'}], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 批量审批
      volumeApprove () {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请选择至少一项产品记录！',
            type: 'warning'
          })
          return false
        } else {
          console.log(this.checkedList)
        }
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 修改
      handleEdit (index, row) {
        // 到编辑页面
        this.$router.push({path: '/commodityAdd', query: {pId: row.goods_id}})
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/commodityDetail', query: {pId: row.goods_id}})
      }
    },
    components: {

    },
    created () {
      // getProductList().then(res => {
      //   if (res.meta.status === 200) {
      //     this.productList = res.data.productList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
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
  .searchProduct {
    margin-top: 10px;
  }
  .publishTime {
    width:220px;
  }
  .volumeApprove {
    margin-top: 10px;
  }
</style>
