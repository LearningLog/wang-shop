const express = require('express')
let route = express.Router()

const user = require('./data/userdata.js')

// 登录验证
route.post('/api/login', user.checkUser)
// 退出用户
route.get('/api/logout', user.logout)
// 获取用户列表
route.get('/api/users', user.getAllUsers)

module.exports = route
