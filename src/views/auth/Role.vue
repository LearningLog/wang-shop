<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-button @click='addDialogVisible = true'>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table @expand-change="toggleRow" border: border :data="tableData" stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row :key="item.id" v-for="(item, index) in props.row.children">
            <el-col :span="3">
              <el-tag @close="deleteRight(item.id)" closable>{{item.authName}}</el-tag>
              <i v-if="item.children.length>0" class="el-icon-arrow-right arrow"></i>
            </el-col>
            <el-col :span="21">
              <el-row class="authlist" :key="tag.id" v-for="tag in item.children">
                <el-col :span="4">
                  <el-tag @close="deleteRight(tag.id)" type="success" closable>{{tag.authName}}</el-tag>
                  <i v-if="tag.children.length>0" class="el-icon-arrow-right arrow"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRight(btn.id)" :key="btn.id" type="warning" closable v-for="btn in tag.children">{{btn.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column 
        prop="code" 
        label="#" 
        :width="twidth[0]" 
        type='index'>
      </el-table-column>
      <el-table-column 
        prop="roleName" 
        label="角色名称" 
        :width="twidth[1]">
      </el-table-column>
      <el-table-column 
        prop="roleDesc" 
        label="描述" 
        :width="twidth[2]">
      </el-table-column>
      <el-table-column label="操作" :width="twidth[3]">
        <template slot-scope="scope">
          <el-button plain title="编辑角色" type="primary" size="small" @click="getRoleInfoById(scope.row)" icon="el-icon-edit"></el-button>
          <el-button plain title="删除角色" type="danger" size="small" @click="deleteRole(scope.row)" icon="el-icon-delete"></el-button>
          <el-button plain title="授权角色" type="warning" size="small" @click="grantRole(scope)" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogVisible">
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editRoleSubmit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 授权角色 -->
    <el-dialog title="授权角色" :visible.sync="authDialogVisible">
      <el-tree :data="treeData" :default-checked-keys='selectedRights' show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="getSelectedNodes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, addRole, getRoleById, editRole, deleteRole, getRights, grantRights, deleteRights } from '../../api/index.js'
export default {
  data () {
    return {
      border: true,
      twidth: [50, 200, 500, 260],
      addDialogVisible: false,
      editDialogVisible: false,
      authDialogVisible: false,
      currentRole: '',
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      selectedRights: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      treeData: []
    }
  },
  methods: {
    toggleRow (param) {
      // 设置当前角色
      this.currentRole = param
    },
    deleteRight (rightId) {
      // 根据权限ID删除权限
      deleteRights({roleId: this.currentRole.id, rightId: rightId}).then(res => {
        // 清空原来的数据
        this.currentRole.children.splice(0, this.currentRole.children.length)
        // 添加新的数据
        this.currentRole.children.push(...res.data)
      })
      // this.currentRole.children.some((item, index) => {
      //   console.log(item.id, rightId)
      //   if (item.id === rightId) {
      //     this.currentRole.children.splice(index, 1)
      //   }
      // })
    },
    deleteRole (param) {
      this.$confirm('确定要删除角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({id: param.id}).then(res => {
          if (res.meta.status === 200) {
            this.initData()
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          }
        })
      })
    },
    initData () {
      // 初始化角色列表数据
      getRoles().then(res => {
        this.tableData = res.data
      })
    },
    getSelectedNodes () {
      // 获取选中的权限节点
      let treeData = this.$refs.tree.getCheckedNodes()
      treeData = treeData.map((item) => {
        return item.id + ',' + item.pid
      })
      treeData = treeData.join(',').split(',')
      let rightIds = [...new Set(treeData)]
      // 将选中的权限ID发送给接口
      grantRights({rids: rightIds.join(',')}, this.currentRole.id).then(res => {
        if (res.meta.status === 200) {
          // 授权成功
          this.authDialogVisible = false
          this.initData()
        }
      })
    },
    _getRightsIds (data, arr) {
      // 获取所有三级权限ID
      data.forEach(first => {
        if (first.children) {
          first.children.forEach(second => {
            if (second.children) {
              second.children.forEach(item => {
                arr.push(item.id)
              })
            }
          })
        }
      })
    },
    grantRole (param) {
      // 设置当前角色
      this.currentRole = param.row
      // 获取所有权限树
      getRights({type: 'tree'}).then(res => {
        // 获取所有的权限数据
        this.treeData = res.data
        console.log(this.treeData)
        // 显示弹窗
        this.authDialogVisible = true
        // 选中已有权限
        this.selectedRights = []
        this._getRightsIds(param.row.children, this.selectedRights)
      })
    },
    handleClose (rowNum, index) {
      // 暂时用不到
      this.tableData[rowNum].rightList.splice(index, 1)
    },
    getRoleInfoById (param) {
      // 编辑查询角色信息
      getRoleById({id: param.id}).then(res => {
        // this.editForm = res.data
        this.editForm.id = res.data.roleId
        this.editForm.roleName = res.data.roleName
        this.editForm.roleDesc = res.data.roleDesc
        this.editDialogVisible = true
      })
    },
    editRoleSubmit (formName) {
      // 编辑提交角色
      this.$refs[formName].validate(valid => {
        if (valid) {
          editRole(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.initData()
              this.editDialogVisible = false
              this.$message({
                type: 'success',
                message: '编辑角色成功!'
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
    addRoleSubmit (formName) {
      // 添加角色
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRole(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.initData()
              this.addDialogVisible = false
              this.$message({
                type: 'success',
                message: '添加角色成功!'
              })
            }
          })
        }
      })
    }
  },
  created () {
    // 初始化数据列表
    this.initData()
  }
}
</script>
<style scoped>
  .el-tag  {
    margin-left: 5px;
  }
  .el-breadcrumb {
    background-color: #D3DCE6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }
  .authlist {
    border-top: solid 1px #D3DCE6;
    /*padding-top: 5px;*/
    padding-bottom: 5px;
  }
  .arrow {
    font-size: 18px;
    font-weight: bold;
  }

</style>