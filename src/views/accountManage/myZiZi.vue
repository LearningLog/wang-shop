<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的孖孖</el-breadcrumb-item>
    </el-breadcrumb>
    <span class="zizilogo"></span>
    <h2 class="condition">我的孖孖</h2>
    <el-form v-if="userType === 'manufacturer'">
      <el-col span="7">
        <el-form-item label="">
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item label="我的孖豆：">
          <div>{{integration}}</div>
        </el-form-item>
      </el-col>
      <el-col span="9">
        <el-form-item label="我的孖蹦：">
          <div>{{balance}}</div>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="myZiZiMain" :style='{marginTop: myZiZiMainMarginTop}'>
      <el-radio-group size="mini" v-model="searchData.type" @change="typeChange" v-if="userType === 'manufacturer'">
        <el-radio-button :label="1" border>未发货订单</el-radio-button>
        <el-radio-button :label="2" border >已发货订单</el-radio-button>
      </el-radio-group>
      <el-radio-group size="mini" v-model="searchData.type" @change="typeChange" v-else>
        <el-radio-button :label="3" border>已发货订单</el-radio-button>
        <el-radio-button :label="4" border >已收货订单</el-radio-button>
      </el-radio-group>
      <el-select placeholder="请选择状态" size="mini" clearable v-model="searchData.days"  @change="daysChange">
        <el-option
          v-for="item in daysList"
          :key="item.code"
          :label="item.desc"
          :value="item.code">
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
          prop="brand"
          label="订单详情"
          align="center">
          <template slot-scope="scope" align="left">
            <div v-if="scope.row.skuList">
              <span>{{scope.row.orderTimeStr}}</span><span :style="{paddingLeft: '50px'}">订单号：{{scope.row.orderId}}</span><span :style="{paddingLeft: '50px'}">订单状态：{{scope.row.orderStatusStr}}</span><span :style="{paddingLeft: '50px'}">收货人：{{scope.row.receiverName}}</span><span :style="{paddingLeft: '50px'}">收货地址：{{scope.row.receiveAddrInfo}}</span>
            </div>
            <div v-else>
              <el-tooltip content="点击查看商品图片" placement="top">
                <img ref="skuImage" class="skuImage" :src="scope.row.skuImage" alt="商品图片" :style='{marginRight:"10px"}' @click="visible">
              </el-tooltip><span>{{scope.row.brand}}</span><span :style='{display:"inline-block",width:"100px",align:"right"}'>X {{scope.row.skuBuyNum}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiverName"
          align="center"
          label="收货人">
        </el-table-column>
        <el-table-column
          prop="orderStatusStr"
          align="center"
          label=状态>
        </el-table-column>
        <el-table-column
          prop="oper"
          align="center"
          min-width="100"
          show-overflow-tooltip
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="searchData.type === 1 || searchData.type === 3"
              type="primary"
              size="mini"
              @click="handleDelivery(scope.$index, scope.row)">{{userTypeStr}}</el-button>
            <el-form label-width="100px" :size="mini" v-else class="orderInfo">
              <el-form-item label="发货人：">
                <span>{{scope.row.senderName}}</span>
              </el-form-item>
              <el-form-item label="快递公司：">
                <span>{{scope.row.logisticsCompany}}</span>
              </el-form-item>
              <el-form-item label="快递单号：">
                <span>{{scope.row.orderId}}</span>
              </el-form-item>
              <el-form-item label="发货时间：">
                <span>{{scope.row.logisticsTimeStr}}</span>
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
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog title="物流信息"
               :visible.sync="logisticsDialog"
               append-to-body width="40%"
               :close-on-click-modal="false"
               @close="closeDialog"
    >
      <el-form ref="logisticsInfo" :model="logisticsInfo" label-width="110px">
        <el-form-item label="物流公司" prop="manufacturerName">
          <el-select v-model="logisticsInfo.logisticsCompany" placeholder="请选择物流公司" class="logisticsCompany" @change="logisticsCompanySelect">
            <el-option v-for="item in logisticsCompanyList" :label="item.logisticsCompanyName" :value="item.logisticsCompanyId" :key="item.logisticsCompanyId"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="物流公司">
          <el-input v-model="logisticsInfo.logisticsCompany" style="width:86%"></el-input>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="logisticsInfo.logisticsNo" style="width:86%"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="consignment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getManufacturerZiZiList, getVenderZiZiList, getMyCoinsBeans, takeDelivery, consignment, getLogisticsCompanylist } from '../../api/accountManage.js'
  import {getToken} from '../../api/auth.js'
  const qs = require('querystring')
  export default {
    created () {
      this.userTypeToken = getToken('userType')
      if (this.userTypeToken === 'venderToken') {
        this.searchData.type = 1
      } else {
        this.searchData.type = 3
      }
      this.initData()
    },
    data () {
      return {
        userTypeToken: '', // 当前登录用户
        searchData: {
          type: null, // 1-未发货 2-已发或收货
          days: null // 查询最近多少天，不传查全部
        },
        logisticsInfo: {
          orderId: '', // 订单号
          logisticsCompany: '', // 物流公司
          // logisticsCompanyName: '', // 物流公司
          // logisticsCompanyId: '', // 物流公司ID
          logisticsNo: '' // 物流单号
        },
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        userType: '', // 身份类型
        userTypeStr: '', // 身份类型Str
        integration: '', // 我的孖豆
        logisticsCompanyList: [], // 物流公司
        balance: '', // 我的孖蹦
        myZiZiMainMarginTop: '', // 我的孖孖marginTop
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false, // dialog弹窗是否显示
        logisticsDialog: false, // dialog弹窗是否显示
        daysList: [{code: 7, desc: '近一周订单'}, {code: 30, desc: '近一个月订单'}, {code: 90, desc: '近三个月订单'}], // 订单日期下列数据
        ziZiList: [] // 我的订单列表
      }
    },
    methods: {
      initData () {
        if (this.userTypeToken === 'manufacturerToken') {
          this.myZiZiMainMarginTop = '82px'
          getLogisticsCompanylist().then(res => {
            if (res.code === 1) {
              this.logisticsCompanyList = res.data
            }
          })
          getManufacturerZiZiList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
            if (res.code === 1) {
              this.userType = 'vender'
              this.userTypeStr = '发货'
              let list = res.data.list
              this.total = res.data.total
              this.currentSize = res.data.size
              this.ziZiList = []
              for (let i = 0, len1 = list.length; i < len1; i++) {
                let item1 = list[i]
                this.ziZiList.push(item1)
                for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
                  let item2 = item1.skuList[j]
                  if (j === 0) {
                    item2.skuListLength = len2
                  }
                  item2.orderStatus = item1.orderStatus
                  item2.orderStatusStr = item1.orderStatusStr
                  item2.receiverName = item1.receiverName
                  item2.orderId = item1.orderId
                  item2.logisticsTimeStr = item1.logisticsTimeStr
                  this.ziZiList.push(item2)
                }
              }
            } else {
              this.ziZiList = []
              this.total = 0
              this.currentSize = 0
            }
          })
        }
        if (this.userTypeToken === 'venderToken') {
          this.myZiZiMainMarginTop = '0px'
          getMyCoinsBeans().then(res => {
            if (res.code === 1) {
              this.balance = this.$accounting.format((res.data.balance / 100), '2')
              this.integration = this.$accounting.format((res.data.integration / 100), '2')
            }
          })
          getVenderZiZiList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
            if (res.code === 1) {
              this.userType = 'manufacturer'
              this.userTypeStr = '收货'
              let list = res.data.list
              this.total = res.data.total
              this.currentSize = res.data.size
              this.ziZiList = []
              for (let i = 0, len1 = list.length; i < len1; i++) {
                let item1 = list[i]
                this.ziZiList.push(item1)
                for (let j = 0, len2 = item1.skuList.length; j < len2; j++) {
                  let item2 = item1.skuList[j]
                  if (j === 0) {
                    item2.skuListLength = len2
                  }
                  item2.orderStatus = item1.orderStatus
                  item2.orderStatusStr = item1.orderStatusStr
                  item2.receiverName = item1.receiverName
                  item2.orderId = item1.orderId
                  item2.logisticsTimeStr = item1.logisticsTimeStr
                  this.ziZiList.push(item2)
                }
              }
            } else {
              this.ziZiList = []
              this.total = 0
              this.currentSize = 0
            }
          })
        }
      },
      // 点击收货
      handleDelivery (index, row) {
        if (this.userType === 'vender') {
          this.logisticsInfo.orderId = row.orderId
          this.logisticsDialog = true
        } else {
          this.$confirm('确认收货吗?', '收货提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { // 点击确认执行 resolve 函数
            // 调用后台退出接口
            takeDelivery({orderId: row.orderId}).then(res => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: '收货成功!'
                })
                this.initData()
              }
            })
          }).catch(() => {
            // 点击取消的处理
          })
        }
      },
      // 点击确定 ->发货
      consignment () {
        consignment(this.logisticsInfo).then(res => {
          if (res.code === 1) {
            this.logisticsDialog = false
            this.$message({
              type: 'success',
              message: '发货成功!'
            })
            this.initData()
          }
        })
      },
      // 选择物流公司获取ID
      // logisticsCompanySelect (val) {
      //   this.logisticsInfo.logisticsCompanyId = val
      //   let obj = {}
      //   obj = this.logisticsCompanyList.find((item) => {
      //     return item.logisticsCompanyId === val
      //   })
      //   this.logisticsInfo.logisticsCompanyName = obj.logisticsCompanyName
      // },
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
        this.initData()
      },
      // 监听天数改变
      daysChange (val) {
        this.searchData.days = val
        this.initData()
      },
      // 处理预览
      visible () {
        this.dialogImageUrl = this.$refs['skuImage'].src
        this.dialogVisible = true
      },
      // 关闭dialog
      closeDialog () {
        // 点击取消 数据重置
        this.logisticsDialog = false
        this.logisticsInfo.orderId = '' // 订单号
        this.logisticsInfo.logisticsCompany = '' // 物流公司
        this.logisticsInfo.logisticsNo = '' // 物流单号
        this.$refs['logisticsInfo'].resetFields()
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
  .skuImage:hover {
    cursor: pointer;
  }
  .condition {
    text-align: center;
    font-weight: 400;
  }
  .el-main>div {
    position: relative;
  }
  .zizilogo {
    position: absolute;
    left: 0;
    top: 48px;
    display: inline-block;
    width: 130px;
    height: 128px;
    background-size: cover;
    background: url(../../assets/logo.jpg);
    border-radius: 50%;
  }
</style>
