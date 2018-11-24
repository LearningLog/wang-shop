<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchProduct" size="mini" class="searchProduct">
      <el-form-item label="商户名称:">
        <el-input v-model="searchProduct.comTenantName" placeholder="请输入商户名称"></el-input>
      </el-form-item>
      <el-form-item label="商户编号:">
        <el-input v-model="searchProduct.comTenantNumber" placeholder="请输入商户编号"></el-input>
      </el-form-item>
      <el-form-item label="产品名称:">
        <el-input v-model="searchProduct.productName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchProduct.ProductNumber" placeholder="请输入产品编号"></el-input>
      </el-form-item>
    </el-form>
    <!--查询按钮-->
    <div class="fl">
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
      <el-button type="primary" size="mini" @click="reset">重置</el-button>
    </div>
    <!--操作按钮-->
    <div class="fr operBtn">
      <el-button type="primary" size="mini" @click="addProduct" :disabled="btnDisabled">新增</el-button>
      <el-button type="danger" size="mini" @click="deleteProduct" :disabled="btnDisabled">删除</el-button>
    </div>
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
        prop="name"
        label="商户编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品编号（SKU）"
        align="center">
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
        label="数量">
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
        label="单价">
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
  import { getProductList, deleteProduct } from '../../api/inventoryManage.js'
  export default {
    created () {
      // getProductList().then(res => {
      //   if (res.meta.status === 200) {
      //     this.productList = res.data.productList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
    },
    data () {
      return {
        searchProduct: {// 搜索数据
          comTenantName: '', // 商户名称
          comTenantNumber: '', // 商户名称
          productName: '', // 产品名称
          ProductNumber: '' // 产品编号
        },
        productList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // 产品列表
        btnDisabled: false, // 是否禁用按钮
        checkedList: [] // CheckBox选择的数据
      }
    },
    methods: {
      // 搜索
      onSearch () {
        getProductList(this.searchProduct).then(res => {
          if (res.meta.status === 200) {
            this.productList = res.data.productList
          }
        })
      },
      // 重置
      reset () {
        this.searchProduct = {
          comTenantName: '', // 商户名称
          comTenantNumber: '', // 商户名称
          productName: '', // 产品名称
          ProductNumber: '' // 产品编号
        }
        getProductList().then(res => {
          this.productList = res.data.productList
        })
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 新增
      addProduct () {
        // 到编辑页面
        this.$router.push({path: '/inventoryAdd'})
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
          deleteProduct().then(res => {
            this.productList = res.data.productList
          })
        }
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/inventoryDetail', query: {pId: row.goods_id}})
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
  .searchProduct {
    margin-top: 10px;
  }
  .operBtn {
    margin-right: 14px;
  }
</style>
