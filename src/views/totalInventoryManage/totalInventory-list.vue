<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>总库存列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchProduct" size="mini" class="searchProduct">
      <el-form-item label="产品名称:">
        <el-input v-model="searchProduct.productName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchProduct.ProductNumber" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="厂家:">
        <el-input v-model="searchProduct.vender" placeholder="请输入厂家"></el-input>
      </el-form-item>
      <el-form-item label="品牌:">
        <el-input v-model="searchProduct.brand" placeholder="请输入品牌"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="reset">重置</el-button>
      </div>
    </el-form>
    <el-table
      :data="productList"
      stripe
      border
      ref="checkedList"
      style="width: 100%">
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
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="库存数量">
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
  import { getProductList } from '../../api/totalInventoryManage.js'
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
          productName: '', // 产品名称
          ProductNumber: '', // 产品编号
          vender: '', // 厂家
          brand: '' // 品牌
        },
        productList: [{}], // 产品列表
        btnDisabled: false // 是否禁用按钮
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
          productName: '', // 产品名称
          ProductNumber: '', // 产品编号
          vender: '', // 厂家
          brand: '' // 品牌
        }
        getProductList().then(res => {
          this.productList = res.data.productList
        })
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/totalInventoryDetail', query: {pId: row.goods_id}})
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
</style>
