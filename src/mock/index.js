const Mock = require('mockjs')
// 调用的tabList标签mock
Mock.mock('http://localhost:5000/menus', 'get', function (options) {
  console.log(options)
  return {
    menus: [
      {
        id: 101,
        authName: '用户管理',
        path: null,
        children: [
          {
            id: 104,
            authName: '用户列表',
            path: 'list',
            children: []
          },
          {
            id: 105,
            authName: '预约功能',
            path: 'fraction',
            children: []
          },
          {
            id: 106,
            authName: '多人预约',
            path: 'groupBooking',
            children: []
          }
        ]
      }
    ]
  }
})
// 调用的tabList标签mock
Mock.mock('http://localhost:5000/users?query=&pagenum=1&pagesize=2', 'get', function (options) {
  console.log(options)
  return {
    user: [
      {
        totalpage: 3,
        pagenum: 1,
        users: [
          {
            id: 25,
            username: 'tige117',
            mobile: '18616358651',
            type: 1,
            email: 'tige112@163.com',
            create_time: '2017-11-09T20:36:26.000Z',
            mg_state: true, // 当前用户的状态
            role_name: '炒鸡管理员'
          },
          {
            id: 25,
            username: 'qwe',
            mobile: '18616358651',
            type: 2,
            email: 'asfag@163.com',
            create_time: '2017-11-09T20:36:26.000Z',
            mg_state: true, // 当前用户的状态
            role_name: 'df'
          },
          {
            id: 25,
            username: 'qwe',
            mobile: '18616358651',
            type: 2,
            email: 'asfag@163.com',
            create_time: '2017-11-09T20:36:26.000Z',
            mg_state: true, // 当前用户的状态
            role_name: 'df'
          }
        ]
      }
    ]
  }
})
