<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>总库存明细</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-form :inline="true" :model="searchProduct" size="mini" class="searchProduct">
      <el-form-item label="产品名称:">
        <el-input v-model="searchProduct.productName" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号:">
        <el-input v-model="searchProduct.ProductNumber" placeholder="请输入产品编号"></el-input>
      </el-form-item>
      <el-form-item label="操作时间:">
        <el-date-picker
          class="operateTime"
          v-model="searchProduct.operateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型:">
        <el-select v-model="searchProduct.operateType" placeholder="请选择操作类型">
          <el-option
            v-for="item in operateTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="productList"
      stripe
      border
      max-height="500"
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
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="right"
        label="操作时间">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="操作数量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作类型"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { searchProduct, getProductList } from '@/api/totalInventoryManage.js'
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
          operateTime: '', // 操作时间
          operateType: '' // 操作类型
        },
        operateTypeList: [{id: 1, title: '已发布'}, {id: 2, title: '待发布'}], // 操作类型下拉数据
        productList: [{}], // 产品列表
        btnDisabled: false // 是否禁用按钮
      }
    },
    methods: {
      // 搜索
      onSearch () {
        searchProduct(this.searchProduct).then(res => {
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
          operateTime: '', // 操作时间
          operateType: '' // 操作类型
        }
        getProductList().then(res => {
          this.productList = res.data.productList
        })
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
  .operateTime {
    width:220px;
  }
</style>
