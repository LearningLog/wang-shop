<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="product" :model="product" label-width="140px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品编号（SKU）">
          <el-select v-model="product.productNumber" placeholder="请选择产品编号" class="productNumber">
            <el-option v-for="item in productNumberList" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="product.productName" disabled></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="product.standard" disabled></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="product.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="起订数量" prop="wettingRatio">
          <el-input v-model="product.wettingRatio"></el-input>
        </el-form-item>
        <!--minOrderQuantity: '', // 起订量-->
        <!--increaseNum: '', // 递增数量-->
        <!--publishNum: '', // 发布数量-->
        <!--startTime:'', // 有效开始日期-->
        <!--endTime:'', // 有效结束日期-->
        <!--createTime: '', // 创建时间-->
        <!--creater: '', // 创建人-->
        <el-form-item label="发布数量" prop="publishNum">
          <el-input v-model="product.publishNum"></el-input>
        </el-form-item>
        <el-form-item label="有效开始时间" prop="startTime">
          <el-date-picker
            v-model="product.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间" prop="creater">
          <el-input v-model="product.creater"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌">
          <el-input v-model="product.brand" disabled></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model="product.vender" disabled></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="product.model" disabled></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="product.price"></el-input>
        </el-form-item>
        <el-form-item label="递增数量" prop="increaseNum">
          <el-input v-model="product.increaseNum"></el-input>
        </el-form-item>
        <el-form-item label="" prop="" v-show="false">
        </el-form-item>
        <el-form-item label="有效结束时间" prop="endTime">
          <el-date-picker
            v-model="product.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="product.creater" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click="publishProduct('product')">发布</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { editProduct, uploadInfo } from '@/api/commodity.js'
  // import { productDetail } from '@/api/commodity.js'
  export default {
    data () {
      return {
        product: {// 表单数据
          productNumber: '', // 产品编号,
          brand: '', // 产品品牌
          productName: '', // 产品名称
          vender: '', // 厂家
          standard: '', // 规格
          model: '', // 型号
          unitPrice: '', // 单价
          price: '', // 售价
          minOrderQuantity: '', // 起订量
          increaseNum: '', // 递增数量
          publishNum: '', // 发布数量
          startTime: '', // 有效开始日期
          endTime: '', // 有效结束日期
          createTime: '', // 创建时间
          creater: '' // 创建人
        },
        dialogImageUrl: '', // dialog弹窗图片路径
        dialogVisible: false, // dialog弹窗是否显示
        productNumberList: [{id: 1, title: '厂家一'}, {id: 2, title: '厂家二'}], // 产品编号数组
        venderList: [{id: 1, title: '厂家一'}, {id: 2, title: '厂家二'}], // 厂家数组
        rules: {
          brand: [
            { required: true, message: '请输入产品品牌', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          vender: [
            { required: true, message: '请选择厂家', trigger: 'change' }
          ],
          standard: [
            { required: true, message: '请输入规格', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          unitPrice: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入售价', trigger: 'blur' }
          ],
          wettingRatio: [
            { required: true, message: '请输入分润比例', trigger: 'blur' }
          ],
          fileList: [
            { required: true, message: '请上传商品图片', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      //
      publishProduct () {
        this.$refs['product'].validate((valid) => {
          if (valid) {
            editProduct(this.product).then(res => {
              if (res.meta.status === 200) {
                this.productList = res.data.productList
                // 到编辑页面
                this.$router.push({path: '/commodityList'})
              }
            })
          } else {
            return false
          }
        })
      },
      // 重置
      reset () {
        this.product = {
          ProductNumber: '', // 产品编号,
          brand: '', // 产品品牌
          productName: '', // 产品名称
          vender: '', // 厂家
          standard: '', // 规格
          model: '', // 型号
          unitPrice: '', // 单价
          price: '', // 售价
          wettingRatio: '', // 分润比例
          creater: '', // 创建人
          createTime: '', // 创建时间
          picture: '' // 商品图片
        }
      },
      // 上传路径
      uploadUrl () {
        return uploadInfo()
      },
      // 处理预览
      handlePreview (file) {
        // 图片预览
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleSuccess (response, file, fileList) {
        this.product.fileList.push({pic: response.data.tmp_path})
      },
      // 处理文件移除
      handleRemove (file, fileList) {
        let now = ''
        this.product.fileList.some((item, index) => {
          if (file.response.data.tmp_path === item.pic) {
            now = index
            return false
          }
        })
        this.product.fileList.splice(now, 1)
      },
      // 限制上传文件的个数和定义超出限制时的行为
      handleExceed (files, fileList) {
        console.log(files)
        console.log(fileList)
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // 删除前处理
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    components: {

    },
    created () {
      // productDetail().then(res => {
      //   if (res.meta.status === 200) {
      //     this.productList = res.data.productList
      //     this.btnDisabled = res.data.btnDisabled
      //   }
      // })
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
  .productForm {
    margin-top: 10px;
  }
  /*.productForm input {*/
  /*margin-right: 150px !important;*/
  /*}*/
  .productNumber {
    width: 200px;
  }
</style>
