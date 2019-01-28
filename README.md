# myadmin1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 项目使用的工具

* 使用VUE ^2.5.2 JavaScript框架 (https://cn.vuejs.org/)
* 使用vue-cli 脚手架 (https://github.com/vuejs/vue-cli)
* 使用Vue Router 路由管理器 (https://router.vuejs.org/)
* 使用ElementUI UI框架 (https://element.eleme.io/)
* 使用Axios http客户端 (https://github.com/axios/axios)
* 模块化打包工具 webpack (https://webpack.js.org/)
* 代码规范校验工具 ESLint (https://eslint.org/)
* ECMAScript 6 (https://www.ecma-international.org/ecma-262/6.0/)
* 时间格式化库 http://momentjs.cn
* 金额格式化库 http://openexchangerates.github.io/accounting.js
* ES6代码转为ES5代码库babel-polyfill
* CSS手册 http://css.cuishifeng.cn/

### 项目启迪

* npm start 启动预览
* 默认占用 8081
* 启动之后，访问 localhost:8081

### 项目结构介绍

```
.
├── build
├── config
├── node_modules
├── src
│   ├── assets
│   ├── common 存储一些公共的业务组件
│   ├── components
│   ├── router
│   ├── App.vue
│   └── main.js
├── static
│   └── .gitkeep
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── .postcssrc.js
└── README.md
```

```
build   webpack打包相关配置文件目录
config  webpack打包相关配置文件目录
docs  我们自己添加的文档目录
  开发文档.md  案例开发步骤文档
  接口文档.md  后台 API 接口文档
node_modules  第三发包
src  项目源码
  assegts  存储资源，例如 css、img、fonts
  components  存储所有组件
  router  路由
    index.js  路由配置文件
  App.vue  单页面应用程序的根组件
  main.js  开机键，负责把根组件替换到根节点
static  可以放一些静态资源
  .gitkeet  没啥用，用来充当一个文件就可以提交我们的 static 目录，未来有了其它文件可以把它删掉
.babelrc  es6转es5配置文件，给 babel 编译器用的
.editorconfig  给编辑器看的
.eslintignore  给eslint代码风格校验工具使用的，用来配置忽略代码风格校验的文件或是目录
.eslintrc.js  给eslint代码风格校验工具使用的，用来配置代码风格校验规则
.gitignore  给git使用的，用来配置忽略上传的文件
.postcssrc.js  给postcss用的，postcss类似于 less、sass 预处理器
index.html  单页面应用程序的单页
package-lock.json  锁定第三方包的版本，以及保存包的下载地址
package.json  项目说明，用来保存依赖项等信息
REAMDE.md  项目说明文档
```

### 代码风格

我们的项目采用 [JavaScript Standard Style](https://standardjs.com/) 代码风格，以下是一些基本规范细则。

- **使用两个空格** – 进行缩进
- **字符串使用单引号** – 需要转义的地方除外
- **不再有冗余的变量** – 这是导致 *大量* bug 的源头!
- **无分号** – [这](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)[没什么不好。](http://inimino.org/~inimino/blog/javascript_semicolons)[不骗你！](https://www.youtube.com/watch?v=gsfbh17Ax9I)
- 行首不要以 `(`, `[`, or ``` 开头
  - 这是省略分号时**唯一**会造成问题的地方 – *工具里已加了自动检测！*
  - [详情](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md#semicolons)
- **关键字后加空格** `if (condition) { ... }`
- **函数名后加空格** `function name (arg) { ... }`
- 坚持使用全等 `===` 摒弃 `==` 一但在需要检查 `null || undefined` 时可以使用 `obj == null`。
- 一定要处理 Node.js 中错误回调传递进来的 `err` 参数。
- 使用浏览器全局变量时加上 `window` 前缀 – `document` 和 `navigator` 除外
  - 避免无意中使用到了这些命名看上去很普通的全局变量， `open`, `length`, `event` 还有 `name`。

说了那么多，看看[这个遵循了 Standard 规范的示例文件](https://github.com/expressjs/body-parser/blob/master/index.js) 中的代码吧。或者，这里还有[一大波使用了此规范的项目](https://raw.githubusercontent.com/standard/standard-packages/master/all.json) 代码可供参考。

### 加入 Git 版本控制
