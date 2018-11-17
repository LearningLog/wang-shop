<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-cascader
          placeholder="请选择分类"
          expand-trigger="hover"
          :change-on-select="false"
          :show-all-levels="false"
          :options="pcategory"
          :props="selfDefineAttr"
          v-model="selectedOptions">
        </el-cascader>
      </el-col>
    </el-row>
    <el-tabs type="border-card" @tab-click="toggleTab">
      <el-tab-pane label="动态参数">
        <el-col :span="24" class="menu">
          <el-button size="small" type="success" plain @click="addParamVisible = true">添加参数名称</el-button>
        </el-col>
        <el-table
          border: border
          :data="dtableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in props.row.params"
                closable
                :disable-transitions="false"
                @close="handleClose(props, tag)">
                {{tag.name}}
              </el-tag>
              <el-input
                v-focus
                class="input-new-tag"
                v-if="props.row.inputVisible"
                v-model="props.row.inputValue"
                size="small"
                @keyup.enter.native="handleInputConfirm(props)"
                @blur="handleInputConfirm(props)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(props)">+添加值</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="#"
            type="index"
            :width="dtabWidths[0]">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="商品参数"
            :width="dtabWidths[1]">
          </el-table-column>
          <el-table-column label="操作" :width="dtabWidths[2]">
            <template slot-scope="scope">
              <el-button plain title='修改商品参数'  type="primary" size="small" @click="getDataInfoById(scope.row)" icon="el-icon-edit"></el-button>
              <el-button plain title='删除商品参数'  type="danger" size="small" @click="deleteData(scope.row)" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性">
        <el-col :span="24" class="menu">
          <el-button size="small" type="success" plain @click="addAttrVisible = true">添加静态属性</el-button>
        </el-col>
        <el-table
          border: border
          :data="stableData"
          style="width: 100%">
          <el-table-column
            prop="code"
            label="#"
            type="index"
            :width="stabWidths[0]">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            :width="stabWidths[1]">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值"
            :width="stabWidths[2]">
          </el-table-column>
          <el-table-column label="操作" :width="stabWidths[3]">
            <template slot-scope="scope">
              <el-button plain title='修改商品属性'  type="primary" size="small" @click="getDataInfoById(scope.row)" icon="el-icon-edit"></el-button>
              <el-button plain title='删除商品属性'  type="danger" size="small" @click="deleteData(scope.row)" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加参数名称 -->
    <el-dialog title="添加参数名称" :visible.sync="addParamVisible">
      <el-form ref="addParamForm" :rules="drules" :model="addParamForm" label-width="80px">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="addParamForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addParamVisible=false">取 消</el-button>
        <el-button type="primary" @click="addDataSubmit('addParamForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑参数名称 -->
    <el-dialog title="编辑参数名称" :visible.sync="editParamVisible">
      <el-form ref="editParamForm" :rules="drules" :model="editParamForm" label-width="80px">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="editParamForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editParamVisible=false">取 消</el-button>
        <el-button type="primary" @click="editDataSubmit('editParamForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加静态属性 -->
    <el-dialog title="添加属性" :visible.sync="addAttrVisible">
      <el-form ref="addAttrForm" :rules="srules" :model="addAttrForm" label-width="80px">
        <el-form-item label="属性名称" prop="attr_name">
          <el-input v-model="addAttrForm.attr_name"></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="attr_vals">
          <el-input v-model="addAttrForm.attr_vals"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAttrVisible=false">取 消</el-button>
        <el-button type="primary" @click="addDataSubmit('addAttrForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑静态属性 -->
    <el-dialog title="编辑属性" :visible.sync="editAttrVisible">
      <el-form ref="editAttrForm" :rules="srules" :model="editAttrForm" label-width="80px">
        <el-form-item label="属性名称" prop="attr_name">
          <el-input v-model="editAttrForm.attr_name"></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="attr_vals">
          <el-input v-model="editAttrForm.attr_vals"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttrVisible=false">取 消</el-button>
        <el-button type="primary" @click="editDataSubmit('editAttrForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDatas, getCateList, addData, deleteData, getDataInfoById, editData } from '../../api/index.js'
export default {
  data () {
    return {
      selfDefineAttr: {
        value: 'cat_id',
        label: 'cat_name'
      },
      selectedOptions: [],
      pcategory: [],
      addParamVisible: false,
      editParamVisible: false,
      addAttrVisible: false,
      editAttrVisible: false,
      currentTab: '0',
      addParamForm: {
        attr_name: '',
        attr_sel: 'many'
      },
      editParamForm: {
        attr_id: '',
        attr_name: '',
        attr_sel: 'many'
      },
      addAttrForm: {
        attr_name: '',
        attr_vals: '',
        attr_sel: 'only'
      },
      editAttrForm: {
        attr_id: '',
        attr_name: '',
        attr_vals: '',
        attr_sel: 'only'
      },
      drules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      srules: {
        attr_name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        attr_vals: [
          { required: true, message: '请输入属性值', trigger: 'blur' }
        ]
      },
      dtabWidths: [50, 400, 200],
      stabWidths: [50, 200, 400, 130],
      dtableData: [],
      stableData: []
    }
  },
  methods: {
    editDataSubmit (formName) {
      // 编辑参数或者属性
      if (this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择分类！'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = null
          if (formName === 'editAttrForm') {
            data = this.editAttrForm
          } else if (formName === 'editParamForm') {
            data = this.editParamForm
          }
          editData(data, this.selectedOptions[2]).then(res => {
            let flag = ''
            if (res.data.attr_sel === 'only') {
              flag = 1
              this.editAttrVisible = false
            } else if (res.data.attr_sel === 'many') {
              flag = 0
              this.editParamVisible = false
            }
            this.toggleTab({index: flag})
          })
        }
      })
    },
    addDataSubmit (formName) {
      // 添加参数和属性
      if (this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择分类！'
        })
        return
      }
      let formData = null
      if (formName === 'addParamForm') {
        formData = this.addParamForm
      } else if (formName === 'addAttrForm') {
        formData = this.addAttrForm
      }
      this.$refs[formName].validate(valid => {
        addData(formData, this.selectedOptions[2]).then(res => {
          if (res.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            // 刷新列表
            if (res.data.attr_sel === 'many') {
              this.toggleTab({index: 0})
              this.addParamVisible = false
            } else if (res.data.attr_sel === 'only') {
              this.toggleTab({index: 1})
              this.addAttrVisible = false
            }
          }
        })
      })
    },
    toggleTab (currentTab) {
      // 切换参数和属性
      if (this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择分类！'
        })
        return
      }
      let type = ''
      this.currentTab = parseInt(currentTab.index)
      if (this.currentTab === 0) {
        // 动态参数
        type = 'many'
      } else if (this.currentTab === 1) {
        // 静态属性
        type = 'only'
      }
      getDatas({cId: this.selectedOptions[2], type: type}).then(res => {
        if (res.meta.status === 200) {
          if (type === 'only') {
            this.stableData = res.data
          } else {
            // 处理数据格式
            this.dtableData.splice(0, this.dtableData.length)
            this.dtableData.push(...res.data)
            this.dtableData.forEach(item => {
              this.$set(item, 'inputVisible', false)
              this.$set(item, 'inputValue', '')
              let arr = []
              item.attr_vals.split(',').forEach((item, index) => {
                if (item) {
                  arr.push({
                    id: index + 1,
                    name: item
                  })
                }
              })
              this.$set(item, 'params', arr)
            })
          }
        }
      })
    },
    getDataInfoById (row) {
      // 根据ID获取参数或者属性
      if (row.attr_sel === 'only') {
        getDataInfoById({cId: row.cat_id, aId: row.attr_id}).then(res => {
          if (res.meta.status === 200) {
            // 填充表单
            this.editAttrForm.attr_id = res.data.attr_id
            this.editAttrForm.attr_name = res.data.attr_name
            this.editAttrForm.attr_vals = res.data.attr_vals
          }
        })
        this.editAttrVisible = true
      } else if (row.attr_sel === 'many') {
        getDataInfoById({cId: row.cat_id, aId: row.attr_id}).then(res => {
          if (res.meta.status === 200) {
            // 填充表单
            this.editParamForm.attr_id = res.data.attr_id
            this.editParamForm.attr_name = res.data.attr_name
            this.editParamForm.attr_vals = res.data.attr_vals
          }
        })
        this.editParamVisible = true
      }
    },
    deleteData (row) {
      // 删除参数或者属性
      deleteData({cId: row.cat_id, aId: row.attr_id}).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除属性成功'
          })
          // 刷新列表
          let flag = row.attr_sel === 'only' ? 1 : 0
          this.toggleTab({index: flag})
        }
      })
    },
    handleClose (props, tag) {
      // 编辑参数或者属性
      if (this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择分类！'
        })
        return
      }
      // 删除标签
      let nowIndex = ''
      props.row.params.some((item, index) => {
        if (tag.id === item.id) {
          nowIndex = index
          return false
        }
      })
      // 调用接口更新数据
      let vals = props.row.params.map(item => {
        return item.name
      })
      this.editParamForm.attr_vals = vals.join(',')
      this.editParamForm.attr_id = props.row.attr_id
      this.editParamForm.attr_name = props.row.attr_name
      editData(this.editParamForm, this.selectedOptions[2]).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 删除标签
          props.row.params.splice(nowIndex, 1)
        }
      })
    },
    showInput (props) {
      // 显示标签输入框
      props.row.inputVisible = true
    },
    handleInputConfirm (props) {
      // 编辑参数或者属性
      if (this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择分类！'
        })
        return
      }
      // 添加标签
      let inputValue = props.row.inputValue
      if (inputValue) {
        // 计算ID最大值
        let arr = props.row.params.map(item => {
          return item.id
        })
        let maxId = Math.max.apply(null, arr) + 1
        props.row.params.push({id: maxId, name: inputValue})
        // 调用接口更新数据
        let vals = props.row.params.map(item => {
          return item.name
        })
        this.editParamForm.attr_vals = vals.join(',')
        this.editParamForm.attr_id = props.row.attr_id
        this.editParamForm.attr_name = props.row.attr_name
        editData(this.editParamForm, this.selectedOptions[2]).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          }
        })
      }
      props.row.inputVisible = false
      props.row.inputValue = ''
    },
    _dowithData (data) {
      // 禁用没有子菜单的分类
      data && data.forEach(item => {
        if ((!item.children) && (item.cat_level < 2)) {
          item.disabled = true
        } else {
          this._dowithData(item.children)
        }
      })
    }
  },
  created () {
    getCateList().then(res => {
      // 获取分类数据
      if (res.meta.status === 200) {
        this._dowithData(res.data)
        this.pcategory = res.data
        // 初始化默认分类
        var defaultType = []
        this.pcategory.some(first => {
          if (first.children && first.children.length > 0) {
            defaultType.push(first.cat_id)
            first.children.some(second => {
              if (second.children && second.children.length > 0) {
                defaultType.push(second.cat_id)
                defaultType.push(second.children[0].cat_id)
                return true
              }
            })
            return true
          }
        })
        // 选择默认分类
        this.selectedOptions = defaultType
        // this.selectedOptions = [1, 7, 22]
        this.toggleTab({index: 0})
      }
    })
  },
  directives: {
    focus: {
      inserted: function (el) {
        // 自定义指令获取焦点
        el.children[0].focus()
      }
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
  .pname {
    background-color: #ECF5FF;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border: 1px solid #ECF5FF;
  }
  .pvalue {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ECF5FF;
    padding-left: 10px;
  }
  .menu {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    background-color: #F5F7FA;
  }
  .el-tag {
    margin-left: 5px;
  }
  .input-new-tag {
    width: 100px;
  }

</style>