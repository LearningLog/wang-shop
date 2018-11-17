const Mock = require('mockjs')
// 验证用户
exports.checkUser = (req, res) => {
  let param = req.body;
  if(param.username == 'admin' && param.password == 'admin'){
    res.end(JSON.stringify({status:200}))
  }else{
    res.end(JSON.stringify({status:500}))
  }
}

// 退出登录
exports.logout = (req, res) => {
  res.end(JSON.stringify({status: 200}))
}
// 用户所有数据
exports.getAllUsers = (req, res) => {
  let UserList = [];
  let page = req.query.page;
  let pagesize = req.query.pagesize;
  if(UserList.length == 0){
    for (var i = 0; i < 100; i++) {
      UserList.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        password: Mock.Random.cname(),
        cellphone: Mock.Random.natural(100, 10000),
        email: Mock.mock('@county(true)'),
        avatar: Mock.Random.cname()
      }))
    }
  }
  let total = UserList.length;

  if(page && pagesize){
    UserList = UserList.filter((u, index) => {
      return index < pagesize * page && index >= pagesize * (page - 1);
    })
  }
  setTimeout(function(){
    res.end(JSON.stringify({list: UserList, total: total}))
  },500)
}
