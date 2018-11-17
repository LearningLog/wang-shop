import Mock from 'mockjs'

// 验证是否登录数据
const CheckUser = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    nickname: 'hello'
  }
]

// 用户数据列表
const UserList = []
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

export {
  CheckUser,
  UserList
}
