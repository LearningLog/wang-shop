<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库单</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchProduct" size="mini" class="searchProduct">
      <el-form-item label="产品名称:">
        <el-input v-model="searchProduct.productName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchProduct.ProductNumber" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="订单编号:">
        <el-input v-model="searchProduct.orderGoodsNumber" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="入库状态:">
        <el-select v-model="searchProduct.putStorageState" placeholder="请选择入库状态">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送编号:">
        <el-input v-model="searchProduct. dispatchNumber" placeholder="请输入配送编号"></el-input>
      </el-form-item>
      <!--查询按钮-->
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--查询按钮-->
    <!--<div class="fl">-->
      <!--<el-button type="primary" size="mini" @click="onSearch">查询</el-button>-->
      <!--<el-button type="primary" size="mini" @click="reset">重置</el-button>-->
    <!--</div>-->
    <!--操作按钮-->
    <!--<div class="fr operBtn">-->
      <!--<el-button type="primary" size="mini" @click="addProduct" :disabled="btnDisabled">添加</el-button>-->
      <!--<el-button type="danger" size="mini" @click="deleteProduct" :disabled="btnDisabled">删除</el-button>-->
    <!--</div>-->
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
        label="订单编号"
        align="center">
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
        prop="address"
        align="center"
        label="创建时间">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="cenetr"
        label="状态">
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
        searchProduct: {// 搜索数据
          productName: '', // 产品名称
          ProductNumber: '', // 产品编号
          orderGoodsNumber: '', // 订单编号
          putStorageState: '', // 入库状态
          dispatchNumber: '' // 配送编号
        },
        stateList: [{id: 1, title: '已发布'}, {id: 2, title: '待发布'}], // 状态下拉数据
        productList: [{}], // 产品列表
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
          productName: '', // 产品名称
          ProductNumber: '', // 产品编号
          orderGoodsNumber: '', // 订单编号
          putStorageState: '', // 入库状态
          dispatchNumber: '' // 配送编号
        }
        getProductList().then(res => {
          this.productList = res.data.productList
        })
      },
      // 添加
      addProduct () {
        // 到编辑页面
        this.$router.push({path: '/addPublishProduct'})
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
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
      // 修改
      handleEdit (index, row) {
        // 到编辑页面
        // this.$router.push({path: '/commodityAdd', query: {pId: row.goods_id}})
        this.$router.push({path: '/addPublishProduct', query: {pId: '1111'}})
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        // this.$router.push({path: '/commodityDetail', query: {pId: row.goods_id}})
        this.$router.push({path: '/publishProductDetail', query: {pId: '111'}})
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
  .publishTime {
    width:220px;
  }
  .operBtn {
    margin-right: 14px;
  }
</style>
