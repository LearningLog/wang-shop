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
      :header-cell-style="{
        'background-color': '#fafafa',
        'color': 'rgb(103, 194, 58)',
        'border-bottom': '1px rgb(103, 194, 58) solid'}"
      ref="checkedList"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        fixed="lefr"
        type="selection"
        label="选择"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="skuId"
        label="产品编号(SKU)"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="skuName"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="brand"
        align="center"
        min-width="150"
        show-overflow-tooltip
        label="产品品牌">
      </el-table-column>
      <el-table-column
        prop="saleProperty"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="规格">
      </el-table-column>
      <el-table-column
        prop="model"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="型号">
      </el-table-column>
      <el-table-column
        prop="manufacturerName"
        align="center"
        min-width="100"
        show-overflow-tooltip
        label="厂家">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="right"
        min-width="160"
        show-overflow-tooltip
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="publishNum"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
        label="发布数量">
      </el-table-column>
      <el-table-column
        prop="usableStock"
        header-align="center"
        align="right"
        min-width="100"
        show-overflow-tooltip
        :formatter="numFormatter"
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
    <el-dialog
      title="发布审核"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>是否通过审核？</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" @click="noAgree">不通过</el-button>
    <el-button type="primary" size="small" @click="agree">通 过</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getPublishList, approve } from '../../api/publishManage.js'
  const qs = require('querystring')
  export default {
    created () {
      this.initData()
    },
    data () {
      return {
        pageSize: 10, // 每页条数
        pageNum: 1, // 当前第几页
        total: 0, // 总页数
        currentSize: 0, // 当前页数据条数
        productList: [], // 产品列表
        checkedList: [], // CheckBox选择的数据
        status: null, // 状态 1 通过 2 未通过
        approveIdList: [], // 发布编号数组
        approveIdListLength: null, // 发布编号数组长度,
        dialogVisible: false // 弹出框是否显示
      }
    },
    methods: {
      initData () {
        getPublishList({pageSize: this.pageSize, pageNum: this.pageNum, params: qs.stringify((this.searchData))}).then(res => {
          if (res.code === 1) {
            this.productList = res.data.list
            this.total = res.data.total
            this.currentSize = res.data.size
          }
        })
      },
      // 选中数据
      handleSelectionChange (row) {
        this.checkedList = row
      },
      // 批量审批
      volumeApprove () {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请选择至少一项产品记录！',
            type: 'warning'
          })
          return false
        } else {
          this.approveIdList = this.checkedList.map(function (item) {
            return item.publishId
          })
          this.approveIdListLength = this.approveIdList.length
          this.approveIdList = JSON.stringify(this.approveIdList)
          this.dialogVisible = true
        }
      },
      approve (data) {
        approve(data).then(res => {
          if (res.code === 1) {
            if ((this.currentSize - this.approveIdListLength) === 0) { // 如果当前页数据已删完，则去往上一页
              this.pageNum = this.searchData.pageNum - 1
            }
            this.initData()
          }
        })
      },
      noAgree () {
        this.status = 2
        this.dialogVisible = false
        approve(qs.stringify({publishIds: this.approveIdList, status: this.status}))
      },
      agree () {
        this.status = 1
        this.dialogVisible = false
        approve(qs.stringify({publishIds: this.approveIdList, status: this.status}))
      },
      // 修改
      handleEdit (index, row) {
        // 到编辑页面
        this.$router.push({path: '/editPublishProduct', query: {publishId: row.publishId}})
      },
      // 明细
      handleDetail (index, row) {
        // 到详情页面
        this.$router.push({path: '/publishProductDetail', query: {publishId: row.publishId}})
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
