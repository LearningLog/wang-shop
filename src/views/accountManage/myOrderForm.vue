<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的孖孖</el-breadcrumb-item>
    </el-breadcrumb>
    <el-radio-group v-model="isSendGoods" size="mini">
      <el-radio :label="0" border>未发货订单</el-radio>
      <el-radio :label="1" border>已发货订单</el-radio>
    </el-radio-group>
    <el-select placeholder="请选择状态" v-model="orderDate" size="mini">
      <el-option
        v-for="item in orderDateList"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-select>
    <!--表格-->
    <el-table
      :data="orderFormList"
      border
      :span-method="arraySpanMethod"
      :row-style="rowStyle"
      style="width: 100%">
      <el-table-column
        :formatter="rowFormatter"
        prop="receiveAddrInfoaa"
        label="订单详情"
        align="center">
      </el-table-column>
      <el-table-column
        prop="receiveAddrInfo"
        align="center"
        label="收货人">
      </el-table-column>
      <el-table-column
        prop="orde11rStatus"
        align="center"
        label=状态>
      </el-table-column>
      <el-table-column
        prop="addr11ess"
        align="center"
        label="操作">
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
  import { getMyBeansAmount } from '../../api/accountManage.js'
  export default {
    created () {
      this.productId = this.$route.query.pId
      if (this.productId) {
        getMyBeansAmount(this.productId).then(res => {
          if (res.code === 1) {
            this.orderFormList = []
            // let list = res.data.list
            let list = [{
              'id': null,
              'orderId': '20181125001',
              'venderId': null,
              'venderName': null,
              'orderClinetIp': null,
              'orderServerIp': null,
              'orderTime': 1543141917000,
              'orderCreateTime': null,
              'orderType': null,
              'orderDesc': null,
              'orderStatus': 1,
              'orderOrigin': null,
              'orderFeeAmount': null,
              'orderRemark': null,
              'receiveAddrId': null,
              'receiveAddrInfo': '北京',
              'deliveryType': null,
              'logisticsCompany': '',
              'logisticsNo': null,
              'freightFeeAmount': null,
              'properties': null,
              'yn': null,
              'createTime': null,
              'updateTime': null,
              'receiverName': null,
              'senderName': null,
              'logisticsTime': null,
              'manufacturerId': null,
              'manufacturerName': null,
              'buynum': null,
              'skuList': [{
                'id': null,
                'venderOrderId': null,
                'venderId': null,
                'venderName': null,
                'orderSubId': null,
                'orderItemStatus': null,
                'manufacturerId': null,
                'manufacturerName': null,
                'receiveAddrInfo': '北京',
                'skuId': 1000,
                'skuName': '水',
                'skuImage': 'water',
                'brand': '农夫山泉',
                'saleProperty': '500ML',
                'model': '瓶',
                'skuBuyPrice': 100,
                'skuBuyNum': 70,
                'yn': null,
                'createTime': null,
                'updateTime': null,
                'index': null,
                'amount': 7000,
                'orderStatus': null,
                'logisticsNo': null,
                'createTimeStr': null
              }, {
                'id': null,
                'venderOrderId': null,
                'venderId': null,
                'venderName': null,
                'orderSubId': null,
                'orderItemStatus': null,
                'manufacturerId': null,
                'manufacturerName': null,
                'receiveAddrInfo': '北京',
                'skuId': 1001,
                'skuName': '水',
                'skuImage': 'water',
                'brand': '雀巢',
                'saleProperty': '500ML',
                'model': '瓶',
                'skuBuyPrice': 100,
                'skuBuyNum': 30,
                'yn': null,
                'createTime': null,
                'updateTime': null,
                'index': null,
                'amount': 3000,
                'orderStatus': null,
                'logisticsNo': null,
                'createTimeStr': null
              }],
              'orderTimeStr': '2018-11-25 18:31:57',
              'logisticsTimeStr': null
            }, {
              'id': null,
              'orderId': '20181125002',
              'venderId': null,
              'venderName': null,
              'orderClinetIp': null,
              'orderServerIp': null,
              'orderTime': 1543144157000,
              'orderCreateTime': null,
              'orderType': null,
              'orderDesc': null,
              'orderStatus': 1,
              'orderOrigin': null,
              'orderFeeAmount': null,
              'orderRemark': null,
              'receiveAddrId': null,
              'receiveAddrInfo': 'china',
              'deliveryType': null,
              'logisticsCompany': null,
              'logisticsNo': null,
              'freightFeeAmount': null,
              'properties': null,
              'yn': null,
              'createTime': null,
              'updateTime': null,
              'receiverName': null,
              'senderName': null,
              'logisticsTime': null,
              'manufacturerId': null,
              'manufacturerName': null,
              'buynum': null,
              'skuList': [{
                'id': null,
                'venderOrderId': null,
                'venderId': null,
                'venderName': null,
                'orderSubId': null,
                'orderItemStatus': null,
                'manufacturerId': null,
                'manufacturerName': null,
                'receiveAddrInfo': '北京',
                'skuId': 2000,
                'skuName': '咖啡',
                'skuImage': 'coffee',
                'brand': '雀巢',
                'saleProperty': '10g',
                'model': '袋',
                'skuBuyPrice': 500,
                'skuBuyNum': 100,
                'yn': null,
                'createTime': null,
                'updateTime': null,
                'index': null,
                'amount': 50000,
                'orderStatus': null,
                'logisticsNo': null,
                'createTimeStr': null
              }],
              'orderTimeStr': '2018-11-25 19:09:17',
              'logisticsTimeStr': null
            }]
            for (let i = 0, len1 = list.length; i < len1; i++) {
              let item1 = list[i]
              this.orderFormList.push(item1)
              for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
                let item2 = item1.skuList[j]
                this.orderFormList.push(item2)
              }
            }
          }
        })
      }
      this.orderFormList = []
      let list = [{
        'id': null,
        'orderId': '20181125001',
        'venderId': null,
        'venderName': null,
        'orderClinetIp': null,
        'orderServerIp': null,
        'orderTime': 1543141917000,
        'orderCreateTime': null,
        'orderType': null,
        'orderDesc': null,
        'orderStatus': 1,
        'orderOrigin': null,
        'orderFeeAmount': null,
        'orderRemark': null,
        'receiveAddrId': null,
        'receiveAddrInfo': '北京',
        'deliveryType': null,
        'logisticsCompany': '',
        'logisticsNo': null,
        'freightFeeAmount': null,
        'properties': null,
        'yn': null,
        'createTime': null,
        'updateTime': null,
        'receiverName': null,
        'senderName': null,
        'logisticsTime': null,
        'manufacturerId': null,
        'manufacturerName': null,
        'buynum': null,
        'skuList': [{
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1000,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '农夫山泉',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 70,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 7000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }, {
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1001,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '雀巢',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 30,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 3000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }],
        'orderTimeStr': '2018-11-25 18:31:57',
        'logisticsTimeStr': null
      }, {
        'id': null,
        'orderId': '20181125002',
        'venderId': null,
        'venderName': null,
        'orderClinetIp': null,
        'orderServerIp': null,
        'orderTime': 1543144157000,
        'orderCreateTime': null,
        'orderType': null,
        'orderDesc': null,
        'orderStatus': 1,
        'orderOrigin': null,
        'orderFeeAmount': null,
        'orderRemark': null,
        'receiveAddrId': null,
        'receiveAddrInfo': 'china',
        'deliveryType': null,
        'logisticsCompany': null,
        'logisticsNo': null,
        'freightFeeAmount': null,
        'properties': null,
        'yn': null,
        'createTime': null,
        'updateTime': null,
        'receiverName': null,
        'senderName': null,
        'logisticsTime': null,
        'manufacturerId': null,
        'manufacturerName': null,
        'buynum': null,
        'skuList': [{
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 2000,
          'skuName': '咖啡',
          'skuImage': 'coffee',
          'brand': '雀巢',
          'saleProperty': '10g',
          'model': '袋',
          'skuBuyPrice': 500,
          'skuBuyNum': 100,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 50000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }],
        'orderTimeStr': '2018-11-25 19:09:17',
        'logisticsTimeStr': null
      }, {
        'id': null,
        'orderId': '20181125001',
        'venderId': null,
        'venderName': null,
        'orderClinetIp': null,
        'orderServerIp': null,
        'orderTime': 1543141917000,
        'orderCreateTime': null,
        'orderType': null,
        'orderDesc': null,
        'orderStatus': 1,
        'orderOrigin': null,
        'orderFeeAmount': null,
        'orderRemark': null,
        'receiveAddrId': null,
        'receiveAddrInfo': '北京',
        'deliveryType': null,
        'logisticsCompany': '',
        'logisticsNo': null,
        'freightFeeAmount': null,
        'properties': null,
        'yn': null,
        'createTime': null,
        'updateTime': null,
        'receiverName': null,
        'senderName': null,
        'logisticsTime': null,
        'manufacturerId': null,
        'manufacturerName': null,
        'buynum': null,
        'skuList': [{
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1000,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '农夫山泉',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 70,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 7000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }, {
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1001,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '雀巢',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 30,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 3000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }],
        'orderTimeStr': '2018-11-25 18:31:57',
        'logisticsTimeStr': null
      }, {
        'id': null,
        'orderId': '20181125001',
        'venderId': null,
        'venderName': null,
        'orderClinetIp': null,
        'orderServerIp': null,
        'orderTime': 1543141917000,
        'orderCreateTime': null,
        'orderType': null,
        'orderDesc': null,
        'orderStatus': 1,
        'orderOrigin': null,
        'orderFeeAmount': null,
        'orderRemark': null,
        'receiveAddrId': null,
        'receiveAddrInfo': '北京',
        'deliveryType': null,
        'logisticsCompany': '',
        'logisticsNo': null,
        'freightFeeAmount': null,
        'properties': null,
        'yn': null,
        'createTime': null,
        'updateTime': null,
        'receiverName': null,
        'senderName': null,
        'logisticsTime': null,
        'manufacturerId': null,
        'manufacturerName': null,
        'buynum': null,
        'skuList': [{
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1000,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '农夫山泉',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 70,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 7000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }, {
          'id': null,
          'venderOrderId': null,
          'venderId': null,
          'venderName': null,
          'orderSubId': null,
          'orderItemStatus': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'receiveAddrInfo': '北京',
          'skuId': 1001,
          'skuName': '水',
          'skuImage': 'water',
          'brand': '雀巢',
          'saleProperty': '500ML',
          'model': '瓶',
          'skuBuyPrice': 100,
          'skuBuyNum': 30,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'index': null,
          'amount': 3000,
          'orderStatus': null,
          'logisticsNo': null,
          'createTimeStr': null
        }],
        'orderTimeStr': '2018-11-25 18:31:57',
        'logisticsTimeStr': null
      }]
      for (let i = 0, len1 = list.length; i < len1; i++) {
        let item1 = list[i]
        this.orderFormList.push(item1)
        for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
          let item2 = item1.skuList[j]
          this.orderFormList.push(item2)
        }
      }
      console.log(this.orderFormList)
    },
    data () {
      return {
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        isSendGoods: 0, // 是否已发货 1：已发货 0：未发货
        orderDate: 1, // 订单日期
        orderDateList: [{id: 1, title: '近一个月订单'}, {id: 2, title: '近三个月订单'}], // 订单日期下列数据
        orderFormList: [{
          'id': null,
          'orderId': '20181125001',
          'venderId': null,
          'venderName': null,
          'orderClinetIp': null,
          'orderServerIp': null,
          'orderTime': 1543141917000,
          'orderCreateTime': null,
          'orderType': null,
          'orderDesc': null,
          'orderStatus': 1,
          'orderOrigin': null,
          'orderFeeAmount': null,
          'orderRemark': null,
          'receiveAddrId': null,
          'receiveAddrInfo': '北京',
          'deliveryType': null,
          'logisticsCompany': '',
          'logisticsNo': null,
          'freightFeeAmount': null,
          'properties': null,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'receiverName': null,
          'senderName': null,
          'logisticsTime': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'buynum': null,
          'skuList': [{
            'id': null,
            'venderOrderId': null,
            'venderId': null,
            'venderName': null,
            'orderSubId': null,
            'orderItemStatus': null,
            'manufacturerId': null,
            'manufacturerName': null,
            'receiveAddrInfo': '北京',
            'skuId': 1000,
            'skuName': '水',
            'skuImage': 'water',
            'brand': '农夫山泉',
            'saleProperty': '500ML',
            'model': '瓶',
            'skuBuyPrice': 100,
            'skuBuyNum': 70,
            'yn': null,
            'createTime': null,
            'updateTime': null,
            'index': null,
            'amount': 7000,
            'orderStatus': null,
            'logisticsNo': null,
            'createTimeStr': null
          }, {
            'id': null,
            'venderOrderId': null,
            'venderId': null,
            'venderName': null,
            'orderSubId': null,
            'orderItemStatus': null,
            'manufacturerId': null,
            'manufacturerName': null,
            'receiveAddrInfo': '北京',
            'skuId': 1001,
            'skuName': '水',
            'skuImage': 'water',
            'brand': '雀巢',
            'saleProperty': '500ML',
            'model': '瓶',
            'skuBuyPrice': 100,
            'skuBuyNum': 30,
            'yn': null,
            'createTime': null,
            'updateTime': null,
            'index': null,
            'amount': 3000,
            'orderStatus': null,
            'logisticsNo': null,
            'createTimeStr': null
          }],
          'orderTimeStr': '2018-11-25 18:31:57',
          'logisticsTimeStr': null
        }, {
          'id': null,
          'orderId': '20181125002',
          'venderId': null,
          'venderName': null,
          'orderClinetIp': null,
          'orderServerIp': null,
          'orderTime': 1543144157000,
          'orderCreateTime': null,
          'orderType': null,
          'orderDesc': null,
          'orderStatus': 1,
          'orderOrigin': null,
          'orderFeeAmount': null,
          'orderRemark': null,
          'receiveAddrId': null,
          'receiveAddrInfo': 'china',
          'deliveryType': null,
          'logisticsCompany': null,
          'logisticsNo': null,
          'freightFeeAmount': null,
          'properties': null,
          'yn': null,
          'createTime': null,
          'updateTime': null,
          'receiverName': null,
          'senderName': null,
          'logisticsTime': null,
          'manufacturerId': null,
          'manufacturerName': null,
          'buynum': null,
          'skuList': [{
            'id': null,
            'venderOrderId': null,
            'venderId': null,
            'venderName': null,
            'orderSubId': null,
            'orderItemStatus': null,
            'manufacturerId': null,
            'manufacturerName': null,
            'receiveAddrInfo': '北京',
            'skuId': 2000,
            'skuName': '咖啡',
            'skuImage': 'coffee',
            'brand': '雀巢',
            'saleProperty': '10g',
            'model': '袋',
            'skuBuyPrice': 500,
            'skuBuyNum': 100,
            'yn': null,
            'createTime': null,
            'updateTime': null,
            'index': null,
            'amount': 50000,
            'orderStatus': null,
            'logisticsNo': null,
            'createTimeStr': null
          }],
          'orderTimeStr': '2018-11-25 19:09:17',
          'logisticsTimeStr': null
        }] // 我的订单列表
      }
    },
    methods: {
      arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (row.skuList) {
          return {
            rowspan: 1,
            colspan: 4
          }
        }
      },
      rowStyle ({ row, column, rowIndex, columnIndex }) {
        if (row.skuList) {
          return {
            background: '#e4e4e4',
            height: '30px'
          }
        }
      },
      rowFormatter (row, column, cellValue, index) {
        if (row.skuList) {
          return '<div>`row.receiveAddrInfo`</div><h3>`row.receiveAddrInfo`</h3>'
        }
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
  .condition {
    text-align: center;
    font-weight: 400;
  }
</style>
