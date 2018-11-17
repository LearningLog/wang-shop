const express = require('express')
const bodyParser = require('body-parser')

let app = express()

// 设置跨域和相应数据格式
app.all('/api/*', (req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
  res.header("Access-Control-Allow-Methods", "*")
  res.setHeader('Content-Type','application/json;charset=utf-8')
  next()
})

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 设置路由
const apiroutes = require('./routes.js');
app.use('/', apiroutes);
// 启动监听
app.listen(8888, 'localhost', () => {
  console.log('starting:8888')
})