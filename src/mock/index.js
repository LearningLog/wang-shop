import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { UserList } from './data/user'

/*
  登录/退出api
  /login post
  /logout post

  用户相关api
  /users get 所有数据
  /users/1/2/3  get   分页数据
  /user post 添加用户
  /user/123 get 修改查询用户
  /user  put 修改提交表单
  /user/123 delete 删除用户
  /user/123/1 get 用户状态变更
  /user/pass put 用户密码重置
*/

export default {
  start () {
    let mock = new AxiosMockAdapter(axios)
    // 用户列表数据(reply的参数为 (status, data, headers) )
    // mock.onGet('/api/users').reply(200, {
    //   list: UserList,
    //   total: 100,
    //   page: 1,
    //   pagesize: 10
    // })
    // 用户分页数据
    mock.onGet('/api/users').reply(config => {
      let p = config.params
      console.log(p)
      return new Promise((resolve, reject) => {
        resolve([200, {
          list: UserList,
          total: 100,
          page: 1,
          pagesize: 10
        }])
      })
    })
  }
}
