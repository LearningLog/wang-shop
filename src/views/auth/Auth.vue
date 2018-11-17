<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table border: border :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="code"
        label="#"
        type='index'
        :width="tabWidths[0]">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        :width="tabWidths[1]">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        :width="tabWidths[2]">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级"
        :width="tabWidths[3]">
        <template slot-scope='scope'>
          <span v-if='scope.row.level==="0"'>一级</span>
          <span v-else-if='scope.row.level==="1"'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAuths } from '../../api/index.js'
export default {
  data () {
    return {
      border: true,
      tableData: [],
      tabWidths: [50, 200, 200, 100]
    }
  },
  created () {
    getAuths({type: 'list'}).then(res => {
      this.tableData = res.data
    })
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
</style>