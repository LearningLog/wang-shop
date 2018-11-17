<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-button @click='showAddForm' type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <el-row v-loading="loading">
      <el-col :span="24">
        <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" @deleteCate="deleteCategory" @showForm="showEditForm" @refresh="initList"></tree-grid> 
      </el-col>
    </el-row>
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
    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addCateVisible">
      <el-form ref="addCateForm" :rules="rules" :model="addCateForm" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            placeholder="默认创建一级分类"
            expand-trigger="click"
            :change-on-select="true"
            :show-all-levels="false"
            :options="pcategory"
            :props="selfDefineAttr"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog title="编辑分类" :visible.sync="editCateVisible">
      <el-form ref="editCateForm" :rules="rules" :model="editCateForm" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateVisible=false">取 消</el-button>
        <el-button type="primary" @click="editCateSubmit('addCateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TreeGrid from './TreeGrid.vue'
import { getParentCate, getCateList, addCate, deleteCate, getCateById, editCate } from '../../api/index.js'
export default {
  data () {
    return {
      total: 0,
      page: 1,
      pagesize: 10,
      loading: true,
      selfDefineAttr: {
        value: 'cat_id',
        label: 'cat_name'
      },
      pcategory: [],
      selectedOptions: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: 500
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: 100
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: 100
      }],
      dataSource: [],
      rules: {
        cat_name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      },
      addCateVisible: false,
      editCateVisible: false,
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: '0'
      },
      editCateForm: {
        cat_id: '',
        cat_name: '',
        cat_level: ''
      }
    }
  },
  methods: {
    showEditForm (cId) {
      // 编辑第一步：显示弹窗
      getParentCate().then(res => {
        // 加载父分类数据
        this.pcategory = res.data
        // 获取分类详细信息
        return getCateById({id: cId})
      }).then(res => {
        if (res.meta.status === 200) {
          // 初始化表单
          this.editCateForm.cat_id = res.data.cat_id
          this.editCateForm.cat_name = res.data.cat_name
          this.editCateForm.cat_level = res.data.cat_level
          // 显示表单窗口
          this.editCateVisible = true
        }
      })
    },
    editCateSubmit () {
      // 编辑提交
      let len = this.selectedOptions.length
      // 设置父分类
      if (len > 0) {
        this.addCateForm.cat_pid = len === 2 ? this.selectedOptions[1] : this.selectedOptions[0]
      }
      editCate(this.editCateForm).then(res => {
        if (res.meta.status === 200) {
          this.initList()
          this.editCateVisible = false
        }
      })
    },
    addCateSubmit () {
      // 添加提交
      let len = this.selectedOptions.length
      // 设置父分类
      if (len > 0) {
        this.addCateForm.cat_pid = len === 2 ? this.selectedOptions[1] : this.selectedOptions[0]
        // 设置层级
        this.addCateForm.cat_level = len === 2 ? 3 : 2
      }
      // 提交表单
      addCate(this.addCateForm).then(res => {
        if (res.meta.status === 201) {
          this.initList()
          this.addCateForm.cat_name = ''
          this.addCateForm.cat_pid = 0
          this.selectedOptions.splice(0, len)
          this.addCateVisible = false
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    hideForm () {
      // 隐藏表单
      this.addCateVisible = false
      this.selectedOptions = []
    },
    showAddForm () {
      // 添加弹窗：加载父分类数据
      getParentCate().then(res => {
        this.pcategory = res.data
      })
      this.addCateVisible = true
    },
    deleteCategory (cId) {
      // 删除分类
      deleteCate({id: cId}).then(res => {
        if (res.meta.status === 200) {
          this.initList()
        }
      })
    },
    queryData () {
      this.initList()
    },
    handleSizeChange (val) {
      this.loading = true
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.loading = true
      this.page = val
      this.initList()
    },
    initList () {
      console.log(1)
      // 初始化分类列表
      let param = {params: {pagenum: this.page, pagesize: this.pagesize}}
      getCateList(param).then(res => {
        this.dataSource = res.data.result
        this.total = res.data.total
        this.loading = false
      })
    }
  },
  components: {
    TreeGrid
  },
  created () {
    this.initList()
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
  .input-with-select {
    width: 300px;
  }
  i {
    cursor: pointer;
  }
  .page {
    background-color: #D3DCE6;
    height: 40px;
    padding-top: 5px;
  }
</style>