<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input v-model='query' placeholder="请输入搜索内容" class="input-with-select">
          <el-button slot="append" @click='queryData' icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click='toAddProduct' type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <el-table
      border
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index"
        :width="tabWidths[0]">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        :width="tabWidths[1]">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        :width="tabWidths[2]">
      </el-table-column>
      <el-table-column
        prop="state"
        label="商品状态"
        :width="tabWidths[3]">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        :width="tabWidths[4]">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        :width="tabWidths[5]">
      </el-table-column>
      <el-table-column label="操作" :width="tabWidths[6]">
        <template slot-scope="scope">
          <el-button plain title='编辑' type="primary" size="small" @click="toEditProduct(scope.row)" icon="el-icon-edit"></el-button>
          <el-button plain title='删除' type="danger" size="small" @click="deleteProduct(scope.row)" icon="el-icon-delete"></el-button>
          <!-- <el-button plain title='预览' type="success" size="small" @click="deleteUser(scope.row)" icon="el-icon-document"></el-button> -->
          <el-button plain title='审核' type="warning" size="small" @click="deleteUser(scope.row)" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getProducts, deleteProduct } from '../../api/index.js'
export default {
  data () {
    return {
      total: 0,
      query: '',
      page: 1,
      pagesize: 10,
      editorOption: {

      },
      dialogImageUrl: '',
      dialogVisible: false,
      addProductForm: {},
      rules: {},
      addDialogVisible: false,
      keyword: '',
      tabWidths: [50, 350, 80, 80, 100, 130, 260],
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      // 每页条数变化
      this.pagesize = val
      this.initData()
    },
    handleCurrentChange (val) {
      // 页码变化
      this.page = val
      this.initData()
    },
    deleteProduct (row) {
      this.$confirm('确定要删除商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProduct({id: row.goods_id}).then(res => {
          if (res.meta.status === 200) {
            this.initData({pagenum: 1, pagesize: 10})
          }
        })
      })
    },
    toEditProduct (row) {
      // 跳转到编辑页面
      this.$router.push({path: 'toedit', query: {pId: row.goods_id}})
    },
    toAddProduct () {
      // 跳转到添加页面
      // this.$router.push({name: 'AddProduct'})
      this.$router.push({path: 'toadd'})
    },
    initData () {
      // 初始化商品列表数据
      let param = {params: {pagenum: this.page, pagesize: this.pagesize, query: this.query}}
      getProducts(param).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.goods
          this.total = res.data.total
        }
      })
    },
    queryData () {
      // 查询操作
      this.initData()
    }
  },
  created () {
    this.initData({pagenum: 1, pagesize: 10})
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
  .el-input {
    width: 300px;
  }
  .page {
    background-color: #D3DCE6;
    height: 40px;
    padding-top: 5px;
  }
</style>