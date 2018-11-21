<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--商品编辑-->
    <el-form inline :rules="rules" ref="product" :model="product" label-width="130px" size="small" class="productForm">
      <el-col span="12">
        <el-form-item label="产品编号（SKU）">
          <el-input v-model="product.productNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="product.productName"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="standard">
          <el-input v-model="product.standard"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="product.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="分润比例" prop="wettingRatio">
          <el-input v-model="product.wettingRatio"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="creater">
          <el-input v-model="product.creater"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="picture">
          <el-input v-model="product.picture"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="产品品牌" prop="brand">
          <el-input v-model="product.brand"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="vender">
          <el-select v-model="product.vender" placeholder="请选择厂家" class="vender">
            <el-option v-for="item in venderList" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="product.model"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="product.price"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="product.creater" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click="saveProduct('product')">保存</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { editProduct } from '@/api/commodity.js'
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
          wettingRatio: '', // 分润比例
          creater: '', // 创建人
          createTime: '', // 创建时间
          picture: '' // 商品图片
        },
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
          picture: [
            { required: true, message: '请上传商品图片', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      //
      saveProduct () {
        this.$refs['product'].validate((valid) => {
          if (valid) {
            editProduct(this.product).then(res => {
              if (res.meta.status === 200) {
                this.productList = res.data.productList
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
      }
    },
    components: {

    },
    created () {
      // getProductList().then(res => {
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
  .vender {
    width: 200px;
  }
</style>
