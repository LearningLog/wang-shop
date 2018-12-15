<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    height: 100%;
  }
  .el-table td {
    /*这里是一个坑-必须在父容器中设置样式，否则无法处理行高*/
    padding: 6px 0px !important;
  }

  @font-face {
    font-family: 'icomoon';
    src:  url('./assets/myfonts/icomoon.eot?1hpwbn');
    src:  url('./assets/myfonts/icomoon.eot?1hpwbn#iefix') format('embedded-opentype'),
      url('./assets/myfonts/icomoon.ttf?1hpwbn') format('truetype'),
      url('./assets/myfonts/icomoon.woff?1hpwbn') format('woff'),
      url('./assets/myfonts/icomoon.svg?1hpwbn#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  /*[class^="icon-"], [class*=" icon-"] {*/
  .myicon {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .myicon-menu:before {
    content: "\e9bd";
  }
  .el-input__prefix {
    left: 10px;
  }
  .loginName .el-input__inner, .password .el-input__inner {
    float: left;
    background: none;
    outline: none;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-left: 2px solid #fff;
    width: 88%;
    display: inline-block;
    margin-left: 40px;
    border-radius: 0px;
  }
  .myicon-user:before {
    content: "\e975";
    font-size: 30px;
    line-height: 40px;
    vertical-align: middle;
  }
  .myicon-key:before {
    content: "\e98d";
    font-size: 28px;
    line-height: 40px;
    vertical-align: middle;
  }
  .operfixed {
    position: fixed;
    bottom: 10px;
    left: 100px;
    right: 0px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .fl {
      float: left;
  }
  .fr {
    float: right;
  }
  .operBtn {
    margin-right: 14px;
  }
  /*myOrderForm.vue 右侧单元格样式*/
  .orderInfo .el-form-item, .orderInfo .el-form-item__label, .orderInfo .el-form-item__content {
    line-height: 26px !important;
    margin-bottom: 0px !important;
  }
  .orderInfo .el-form-item__content {
    text-align: left;
  }
</style>
