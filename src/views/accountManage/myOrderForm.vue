<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的孖孖</el-breadcrumb-item>
    </el-breadcrumb>
    <el-radio-group size="mini" v-model="searchData.type" @change="typeChange">
      <el-radio-button :label="1" border>未发货订单</el-radio-button>
      <el-radio-button :label="0" border >已发货订单</el-radio-button>
    </el-radio-group>
    <el-select placeholder="请选择状态" size="mini" clearable v-model="searchData.days"  @change="daysChange">
      <el-option
        v-for="item in daysList"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-select>
    <!--表格-->
    <el-table
      :data="ziZiList"
      border
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      :span-method="arraySpanMethod"
      :row-style="rowStyle"
      style="width: 100%">
      <el-table-column
        prop="detail"
        label="订单详情"
        align="center">
        <template slot-scope="scope" align="left">
          <div v-if="scope.row.skuList">
            <span>{{scope.row.orderTimeStr}}</span><span :style="{paddingLeft: '50px'}">订单号：{{scope.row.orderId}}</span><span :style="{paddingLeft: '50px'}">订单状态：{{scope.row.state}}</span><span :style="{paddingLeft: '50px'}">收货人：{{scope.row.consignee}}</span><span :style="{paddingLeft: '50px'}">收货地址：{{scope.row.receivingAddress}}</span>
          </div>
          <span v-else>{{scope.row.detail}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="consignee"
        align="center"
        label="收货人">
      </el-table-column>
      <el-table-column
        prop="state"
        align="center"
        label=状态>
      </el-table-column>
      <el-table-column
        prop="oper"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="searchData.type === 1"
            type="primary"
            size="mini"
            @click="handleDelivery(scope.$index, scope.row)">发货</el-button>
          <el-form label-width="100px" :size="mini" v-else class="orderInfo">
            <el-form-item label="发货人：">
              <span>{{scope.row.consignee}}</span>
            </el-form-item>
            <el-form-item label="快递公司：">
              <span>{{scope.row.receivingAddress}}</span>
            </el-form-item>
            <el-form-item label="快递单号：">
              <span>{{scope.row.orderId}}</span>
            </el-form-item>
            <el-form-item label="发货时间：">
              <span>{{scope.row.orderTimeStr}}</span>
            </el-form-item>
          </el-form>
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
  import { getManufacturerZiZiList } from '../../api/accountManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        searchData: {
          type: 1, // 1-未发货 2-已发或收货
          days: null // 查询最近多少天，不传查全部
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        daysList: [{id: 30, title: '近一个月订单'}, {id: 90, title: '近三个月订单'}], // 订单日期下列数据
        ziZiList: [
          {
            'orderId': '20181125001',
            'detail': '111111111',
            'consignee': '张三',
            'receivingAddress': '北京东城区',
            'skuList': [{
              'id': null,
              'detail': '111111111',
              'consignee': '张三',
              'receivingAddress': '北京东城区',
              'state': '1',
              'skuId': 1000,
              'skuName': '水',
              'skuImage': 'water',
              'brand': '农夫山泉',
              'saleProperty': '500ML',
              'model': '瓶',
              'skuBuyPrice': 100,
              'skuBuyNum': 70,
              'amount': 7000,
              'createTimeStr': '2018-11-25 18:31:57'
            }, {
              'id': null,
              'detail': '2222',
              'consignee': '李四',
              'receivingAddress': '北京西城区',
              'state': '2',
              'skuId': 1001,
              'skuName': '水',
              'skuImage': 'water',
              'brand': '雀巢',
              'saleProperty': '500ML',
              'model': '瓶',
              'skuBuyPrice': 100,
              'skuBuyNum': 30,
              'amount': 3000,
              'createTimeStr': '2018-11-25 18:31:57'
            }],
            'orderTimeStr': '2018-11-25 18:31:57',
            'logisticsTimeStr': null
          }, {
            'id': null,
            'orderId': '20181125002',
            'detail': '222222',
            'consignee': '李四',
            'receivingAddress': '北京西城区',
            'state': '1',
            'skuList': [{
              'detail': '222222',
              'consignee': '李四',
              'receivingAddress': '北京西城区',
              'state': '1',
              'skuId': 2000,
              'skuName': '咖啡',
              'skuImage': 'coffee',
              'brand': '雀巢',
              'saleProperty': '10g',
              'model': '袋',
              'skuBuyPrice': 500,
              'skuBuyNum': 100,
              'amount': 50000,
              'createTimeStr': '2018-11-25 19:09:17'
            }],
            'orderTimeStr': '2018-11-25 19:09:17',
            'logisticsTimeStr': null
          }
        ] // 我的订单列表
      }
    },
    methods: {
      initData () {
        getManufacturerZiZiList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1) {
            let list = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
            this.ziZiList = []
            for (let i = 0, len1 = list.length; i < len1; i++) {
              let item1 = list[i]
              this.ziZiList.push(item1)
              for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
                let item2 = item1.skuList[j]
                this.ziZiList.push(item2)
              }
            }
          }
        })
        let list = this.ziZiList
        this.ziZiList = []
        for (let i = 0, len1 = list.length; i < len1; i++) {
          let item1 = list[i]
          this.ziZiList.push(item1)
          for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
            let item2 = item1.skuList[j]
            if (j === 0) {
              item2.skuListLength = len2
            }
            this.ziZiList.push(item2)
          }
        }
        console.log(this.ziZiList)
      },
      // 点击送货
      handleDelivery (index, row) {
        // debugger
      },
      // 合并单元格
      arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (row.skuList) { // 如果有 skuList ，说明当前行 为当前订单头信息，则开始 合并行
          if (columnIndex === 0) { // 从第一列开始合并行，即 columnIndex === 0 时
            return {
              rowspan: 1,
              colspan: 4
            }
          } else { // 非第一列则去掉单元格
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else if (row.skuListLength) { // 如果有 skuListLength ，说明当前行 为当前订单第一条商品
          if (columnIndex === 0) { // 第一列单元格不合并
            return {
              rowspan: 1,
              colspan: 1
            }
          } else { // 其他列单元格被合并
            return {
              rowspan: row.skuListLength,
              colspan: 1
            }
          }
        } else { // 如果有 既没有 skuList 也没有 skuListLength ，说明当前行 为当前 为非第一条商品，即是除第一列外，应当被合并的单元格
          if (columnIndex === 0) { // 第一列单元格不合并
            return {
              rowspan: 1,
              colspan: 1
            }
          } else { // 其他列单元格被合并
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      // 修改行样式
      rowStyle ({ row, column, rowIndex, columnIndex }) {
        if (row.skuList) {
          return {
            background: '#e4e4e4'
          }
        }
      },
      // 监听类型改变
      typeChange (val) {
        this.searchData.type = val
        // this.initData()
      },
      // 监听天数改变
      daysChange (val) {
        this.searchData.days = val
        this.initData()
      },
      // 数量格式化
      numFormatter (row, column, cellValue, index) {
        return this.$accounting.format(cellValue, '0')
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
</style>
