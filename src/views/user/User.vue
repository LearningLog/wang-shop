<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div>
          <el-input v-model='query' placeholder="请输入搜索内容" class="input-with-select">
          <el-button slot="append" @click='queryData' icon="el-icon-search"></el-button>
          </el-input>
          <el-button @click='addDialogVisible = true' type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style='width:100%'
      border=border
      v-loading="loading"
      >
      <el-table-column
        type='index'
        label="#"
        :width="twidth[0]">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        :width="twidth[1]">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        :width="twidth[2]">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话" :width="twidth[3]">
      </el-table-column>
      <el-table-column
        prop="email"
        label="用户状态"
        :width="twidth[4]">
        <template slot-scope="scope">
          <el-switch
            @change='changeState(scope.row)'
            v-model="scope.row.mg_state">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="twidth[5]">
        <template slot-scope="scope">
          <el-button plain title="编辑用户" type="primary" size="small" @click="showEditUserForm(scope.row)" icon="el-icon-edit"></el-button>
          <el-button plain title="删除用户" type="danger" size="small" @click="deleteUser(scope.row)" icon="el-icon-delete"></el-button>
          <el-button plain title="分配角色" type="warning" size="small" @click="grantUser(scope.row)" icon="el-icon-check"></el-button>
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
    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮  箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电  话" prop="mobile">
          <el-input v-model.number="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹窗 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible">
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮  箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电  话" prop="mobile">
          <el-input v-model.number="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色弹窗 -->
    <el-dialog
      title="分配角色"
      :visible.sync="grantDialogVisible">
      <div class="nowuser">
        <span>当前的用户：</span>
        <span>{{currentUser.username}}</span>
      </div>
      <div>
        <span>请选择角色：</span>
        <el-select v-model="currentRole" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { editUserState, getUsers, addUser, getUserById, editUser, deleteUser, getRoles, grantUser } from '../../api/index.js'
export default {
  data () {
    return {
      userFlag: 1,
      roleList: [],
      currentRole: '',
      currentUser: '',
      tableData: [],
      total: 0,
      query: '',
      page: 1,
      pagesize: 10,
      twidth: [50, 160, 300, 300, 80, 200],
      border: true,
      loading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      grantDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  methods: {
    changeState (row) {
      // 用户状态变化
      editUserState({id: row.id, state: row.mg_state}).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    grantUserSubmit () {
      // 用户角色分配-提交表单
      if (!this.currentRole) {
        this.$message({
          type: 'warning',
          message: '请选择角色'
        })
        return
      }
      grantUser(this.currentUser.id, {rid: this.currentRole}).then(res => {
        if (res.meta.status === 200) {
          this.initData()
          this.grantDialogVisible = false
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    grantUser (row) {
      // 用户授权弹窗
      this.currentUser = row
      getRoles().then(res => {
        if (res.meta.status === 200) {
          this.roleList = res.data
          this.grantDialogVisible = true
        }
      })
    },
    deleteUser (row) {
      // 删除用户
      this.$confirm('确定要删除用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认删除
        deleteUser({id: row.id}).then(res => {
          if (res.meta.status === 200) {
            this.initData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showEditUserForm (row) {
      // 编辑用户-根据id查询用户信息
      getUserById({id: row.id}).then(res => {
        if (res.meta.status === 200) {
          // 填充表单
          this.editForm.id = res.data.id
          this.editForm.username = res.data.username
          this.editForm.mobile = res.data.mobile
          this.editForm.email = res.data.email
          // 显示弹窗
          this.editDialogVisible = true
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    editUserSubmit (formName) {
      // 编辑数据提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用接口，提交数据
          editUser(this.editForm).then(res => {
            console.log(res.meta.status === '200')
            if (res.meta.status === 200) {
              this.editDialogVisible = false
              this.initData()
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    addUserSubmit (formName) {
      // 添加数据提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用接口，提交数据
          addUser(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.addDialogVisible = false
              this.initData()
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    queryData () {
      this.initData()
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.initData()
    },
    initData () {
      // 初始化数据列表
      let param = {params: {pagenum: this.page, pagesize: this.pagesize, query: this.query}}
      getUsers(param).then(res => {
        this.tableData = res.data.users
        this.total = res.data.total
        this.loading = false
      })
    }
  },
  created () {
    this.initData({pagenum: 1, pagesize: 10})
  }
}
</script>
<style scoped>
  .input-with-select {
    width: 300px;
  }
  .page {
    background-color: #D3DCE6;
    height: 40px;
    padding-top: 5px;
  }
  .el-breadcrumb {
    background-color: #D3DCE6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }
  .nowuser {
    margin-bottom: 10px;
  }
</style>