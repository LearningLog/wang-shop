<template>
  <el-row>
    <el-col :span="24">
      <div class="title">编辑商品信息</div>
      <el-steps finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
      <el-form ref="addProductForm" :rules="rules" :model="addProductForm" label-width="80px">
        <el-tabs tab-position="left" @tab-click="toggleTab">
          <el-tab-pane label="基本信息">
            <!-- 商品基本信息 -->
            <el-form-item label="商品名称">
              <el-input v-model='pform.goods_name'></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input  v-model='pform.goods_price'></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input  v-model='pform.goods_weight'></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input  v-model='pform.goods_number'></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                placeholder="请选择分类"
                expand-trigger="hover"
                :change-on-select="false"
                :show-all-levels="false"
                :options="pform.pcategory"
                :props="pform.selfDefineAttr"
                v-model="pform.selectedOptions">
              </el-cascader>
            </el-form-item>
            <el-form-item label="是否促销">
              <el-radio-group v-model="pform.is_promote" size="medium">
                <el-radio border label="true">是</el-radio>
                <el-radio border label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <!-- 动态参数 -->
            <el-form-item :key='item.attr_id' v-for='item in pform.dparam' :label="item.attr_name">
              <el-checkbox-group size="medium" v-model='item.attr_vals'>
                <el-checkbox border :key='index' v-for='(tag, index) in item.attr_vals' :label="tag" :name="'p'+item.attr_id"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <!-- 静态属性 -->
            <el-form-item label-width='100' :key='item.attr_id' v-for='item in pform.sparam' :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              :action="uploadUrl()"
              :headers='setHeader()'
              list-type="picture"
              :file-list='pform.fileList'
              multiple
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove">
              <el-button type="success" plain>上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <!-- <quill-editor ref='myeditor' :options="editorOption"></quill-editor> -->
            <my-editor :defaultMsg=defaultMsg :config=config :id=editorId ref="editor"></my-editor>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div class="footer">
        <el-button @click="">取 消</el-button>
        <el-button type="primary" @click="editProductSubmit('addProductForm')">确 定</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import MyEditor from './MyEditor.vue'
import { uploadInfo, getProductById, getCateList, getDatas, editProduct } from '../../api/index.js'
export default {
  data () {
    return {
      productId: '',
      defaultMsg: '',
      config: {
        // toolbars: [['Source', 'FullScreen', 'simpleupload', 'Undo', 'Redo', 'Bold', 'test']],
        // serverUrl: uploadInfo().url + '/upload',
        serverUrl: 'http://47.96.21.88:8888/ueditor/ue',
        initialFrameWidth: null,
        initialFrameHeight: 350,
        dataType: 'jsonp',
        jsonp: 'hello'
      },
      editorId: 'editorId',
      rules: {},
      pform: {
        goods_id: '',
        fileList: [],
        goods_name: '',
        goods_price: '',
        goods_number: '',
        selectedOptions: [],
        goods_weight: '',
        is_promote: 'true',
        pcategory: [],
        dparam: [],
        dtype: [],
        sparam: [],
        richText: '',
        pictures: [],
        selfDefineAttr: {
          value: 'cat_id',
          label: 'cat_name'
        }
      },
      editorOption: {

      },
      dialogImageUrl: '',
      dialogVisible: false,
      addProductForm: {}
    }
  },
  methods: {
    getUEContent () {
      let content = this.$refs.editor.getUEContent()
      return content
    },
    uploadUrl () {
      return uploadInfo().url + '/upload'
    },
    setHeader () {
      return { Authorization: uploadInfo().token }
    },
    editProductSubmit () {
      let formData = {
        goods_id: '',
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        cat_id: '',
        is_promote: '',
        pics: [],
        attrs: []
      }
      // 填充表单
      formData.goods_id = this.pform.goods_id
      formData.goods_name = this.pform.goods_name
      formData.goods_price = this.pform.goods_price
      formData.goods_number = this.pform.goods_number
      formData.goods_weight = this.pform.goods_weight
      formData.is_promote = this.pform.is_promote
      formData.goods_introduce = this.getUEContent()
      console.log(formData.goods_introduce)
      formData.pics = this.pform.pictures
      if (this.pform.fileList.length > 0) {
        // 添加原来的图片
        formData.pics.push(...this.pform.fileList)
      }
      formData.attrs = [...this.pform.dparam, ...this.pform.sparam]
      formData.goods_cat = this.pform.selectedOptions.join(',')
      formData.attrs.forEach(item => {
        item.attr_value = item.attr_vals
      })
      editProduct(formData).then(res => {
        if (res.meta.status === 200) {
          // 编辑成功跳转到列表页面
          this.$router.push({path: 'product'})
        } else {
          // 信息错误提示
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    handleSuccess (response, file, fileList) {
      this.pform.pictures.push({pic: response.data.tmp_path})
    },
    handleRemove (file, fileList) {
      let delIndex = ''
      this.pform.fileList.some((item, index) => {
        if (file.pics_id === item.pics_id) {
          delIndex = index
          return false
        }
      })
      this.pform.fileList.splice(delIndex, 1)
      let now = ''
      this.pform.pictures.some((item, index) => {
        if (file.response.data.tmp_path === item.pic) {
          now = index
          return false
        }
      })
      this.pform.pictures.splice(now, 1)
    },
    handlePictureCardPreview (file) {
      // 图片预览
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    toggleTab (param) {
      // 重新设置内容
      this.$refs.editor.setUEContent()
      // 设置步骤
      this.currentStep = parseInt(param.index) + 1
      // 处理动态参数和静态参数
      if (param.index !== '0' && this.pform.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '必须选择商品分类！'
        })
        return
      }
      if (param.index !== '1' && param.index !== '2') {
        return
      }
      let type = 'only'
      if (param.index === '1') {
        // 动态参数
        type = 'many'
      } else if (param.index === '2') {
        // 静态参数
        type = 'only'
      }
      // 初始化动态参数和静态属性
      getDatas({cId: this.pform.selectedOptions[2], type: type}).then(res => {
        if (res.meta.status === 200) {
          if (param.index === '1') {
            // 动态参数
            res.data.forEach(item => {
              if (item.attr_vals) {
                item.attr_vals = item.attr_vals.split(',')
              }
            })
            this.pform.dparam = res.data
          } else if (param.index === '2') {
            // 静态参数
            this.pform.sparam = res.data
          }
        }
      })
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
    // 编辑商品ID
    this.productId = this.$route.query.pId
    getProductById({id: this.productId}).then(res => {
      if (res.meta.status === 200) {
        this.pform.goods_id = res.data.goods_id
        this.pform.goods_name = res.data.goods_name
        this.pform.goods_price = res.data.goods_price
        this.pform.goods_number = res.data.goods_number
        this.pform.goods_weight = res.data.goods_weight
        this.pform.is_promote = res.data.is_promote + ''
        this.defaultMsg = res.data.goods_introduce
        // 初始化分类
        let ids = res.data.goods_cat.split(',').map(item => {
          return parseInt(item)
        })
        this.pform.selectedOptions = ids
        // 参数和属性初始化
        res.data.attrs && res.data.attrs.forEach(item => {
          if (item.attr_sel === 'many') {
            if (item.attr_vals) {
              item.attr_vals = item.attr_vals.split(',')
            }
            this.pform.dparam.push(item)
          } else if (item.attr_sel === 'only') {
            this.pform.sparam.push(item)
          }
        })
        // 初始化图片
        if (res.data.pics.length > 0) {
          res.data.pics.forEach(item => {
            this.pform.fileList.push({
              pics_id: item.pics_id,
              name: '已有图片',
              url: item.pics_sma_url
            })
          })
        }
        return res.data.goods_cat.split(',')
      }
    }).then(() => {
      // 获取分类数据
      getCateList().then(res => {
        if (res.meta.status === 200) {
          this._dowithData(res.data)
          this.pform.pcategory = res.data
        }
      })
    })
  },
  components: {
    MyEditor
  }
}
</script>
<style scoped>
.title {
  height: 45px;
  line-height: 45px;
  background-color: #D7E2EF;
  padding-left: 20px;
}
.el-tabs .el-tab-pane {
  padding-right: 20px;
}
.el-steps {
  margin: 15px 0px;
  padding-left: 20px;
}
.footer {
  text-align: center;
}
</style>