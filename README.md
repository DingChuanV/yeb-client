# yeb-client
## 😀项目背景
本项目目的是实现中小型企业的在线办公系统，云E办在线办公系统是一个用来管理日常的办公事务的一个系统，他能够管的内容有：日常的各种流程审批，新闻，通知，公告，文件信息，财务，人事，费用，资产，行政，项 目，移动办公等等。它的作用就是通过软件的方式，方便管理，更加简单，更加扁平。更加高效，更加规范，能够提高整体的管理运营水平。

本项目在技术方面采用最主流的前后端分离开发模式，使用业界最流行、社区非常活跃的开源框架SpringBoot来构建后端，旨在实现云E办在线办公系统。

包括职位管理、职称管理、部门管理、员工管理、工资管理、在线聊天等模块。项目中还会使用业界主流的第三方组件扩展大家的知识面和技能池。

## 😃技术栈

<img src="https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204101424752.png" alt="image-20220410093729973" style="zoom:50%;" />

## 😄项目开发步骤
### 😇登陆功能的开发
所遇到的问题：
<img width="1475" alt="image" src="https://user-images.githubusercontent.com/74408716/163091864-ea7775dd-41c1-4dc4-9dc7-f5fa4741ec02.png">

但是发现是8080端口，我们后端的端口是8081。看到了问题的所在。跨域问题。只要网络协议、ip 地址、端口中任何—个不相同就是跨域请求。

所以我们想在要处理跨域问题。在这里我们采用nodeJS的代理请求转发到后端的地址上。
```js
//解决跨域问题 前端8080端口 -> 后端的8081端口
//在获取验证码的时候 前端项目访问的是8080端口 而我们的后端的接口是8081 我们用前端的nodejs中的proxy转到我们的后端的端口

let proxyObj = {}

//代理的路径的配置
proxyObj['/'] = {
    //关闭websocket
    ws: false,
    //代理到哪里去
    target: 'http://localhost:8081',
    //我们发送请求头的时候我们的默认的host会被替换成我们的代理地址
    changeOrigin: true,
    //不重写请求路径
    pathRewrite: {
        '^/': '/'
    }
}
//配置我们默认访问的端口和host
module.exports = {
    devServer: {
        host: "localhost",
        port: 8080,
        //代理
        proxy:proxyObj
    }
}
```
![image-20220413112010805](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131120918.png)

![](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131136294.png)

![image-20220413113958801](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131140032.png)

测试登陆成功返回的信息

![image-20220413114104730](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131141883.png)


### 登陆成功之后跳转页面
![image-20220413114909230](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131149915.png)

登陆成功之后，后端给我们一个token，用了token支持用户登陆成功之后的其他操作（也就是向后端其他的接口），所以我们现在要做就是将后端返回给我们的token
放在请求体中，每当用户去访问后端的接口，（因为我们后端做了token的过滤器）后端都会拦截这个请求，判断请求体中的token的合法性。来筛选合格的用户的请求。

![](https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131156803.png)

<img src="https://bearbrick0.oss-cn-qingdao.aliyuncs.com/images/img/202204131205289.png" alt="image-20220413120515931" style="zoom:50%;" />

### 菜单导航栏的开发

```json
[
  {
    "id": 2,
    "url": "/",
    "path": "/home",
    "component": "Home",
    "name": "员工资料",
    "iconCls": "fa fa-user-circle-o",
    "keepAlive": null,
    "requireAuth": true,
    "parentId": 1,
    "enabled": true,
    "children": [
      {
        "id": 7,
        "url": "/employee/basic/**",
        "path": "/emp/basic",
        "component": "EmpBasic",
        "name": "基本资料",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 2,
        "enabled": null,
        "children": null,
        "roles": null
      }
    ],
    "roles": null
  },
  {
    "id": 3,
    "url": "/",
    "path": "/home",
    "component": "Home",
    "name": "人事管理",
    "iconCls": "fa fa-address-card-o",
    "keepAlive": null,
    "requireAuth": true,
    "parentId": 1,
    "enabled": true,
    "children": [
      {
        "id": 9,
        "url": "/personnel/emp/**",
        "path": "/per/emp",
        "component": "PerEmp",
        "name": "员工资料",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 3,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 10,
        "url": "/personnel/ec/**",
        "path": "/per/ec",
        "component": "PerEc",
        "name": "员工奖惩",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 3,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 11,
        "url": "/personnel/train/**",
        "path": "/per/train",
        "component": "PerTrain",
        "name": "员工培训",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 3,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 12,
        "url": "/personnel/salary/**",
        "path": "/per/salary",
        "component": "PerSalary",
        "name": "员工调薪",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 3,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 13,
        "url": "/personnel/remove/**",
        "path": "/per/mv",
        "component": "PerMv",
        "name": "员工调动",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 3,
        "enabled": null,
        "children": null,
        "roles": null
      }
    ],
    "roles": null
  },
  {
    "id": 4,
    "url": "/",
    "path": "/home",
    "component": "Home",
    "name": "薪资管理",
    "iconCls": "fa fa-money",
    "keepAlive": null,
    "requireAuth": true,
    "parentId": 1,
    "enabled": true,
    "children": [
      {
        "id": 14,
        "url": "/salary/sob/**",
        "path": "/sal/sob",
        "component": "SalSob",
        "name": "工资账套管理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 4,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 15,
        "url": "/salary/sobcfg/**",
        "path": "/sal/sobcfg",
        "component": "SalSobCfg",
        "name": "员工账套设置",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 4,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 16,
        "url": "/salary/table/**",
        "path": "/sal/table",
        "component": "SalTable",
        "name": "工资表管理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 4,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 17,
        "url": "/salary/month/**",
        "path": "/sal/month",
        "component": "SalMonth",
        "name": "月末处理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 4,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 18,
        "url": "/salary/search/**",
        "path": "/sal/search",
        "component": "SalSearch",
        "name": "工资表查询",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 4,
        "enabled": null,
        "children": null,
        "roles": null
      }
    ],
    "roles": null
  },
  {
    "id": 5,
    "url": "/",
    "path": "/home",
    "component": "Home",
    "name": "统计管理",
    "iconCls": "fa fa-bar-chart",
    "keepAlive": null,
    "requireAuth": true,
    "parentId": 1,
    "enabled": true,
    "children": [
      {
        "id": 19,
        "url": "/statistics/all/**",
        "path": "/sta/all",
        "component": "StaAll",
        "name": "综合信息统计",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 5,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 20,
        "url": "/statistics/score/**",
        "path": "/sta/score",
        "component": "StaScore",
        "name": "员工积分统计",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 5,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 21,
        "url": "/statistics/personnel/**",
        "path": "/sta/pers",
        "component": "StaPers",
        "name": "人事信息统计",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 5,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 22,
        "url": "/statistics/recored/**",
        "path": "/sta/record",
        "component": "StaRecord",
        "name": "人事记录统计",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 5,
        "enabled": null,
        "children": null,
        "roles": null
      }
    ],
    "roles": null
  },
  {
    "id": 6,
    "url": "/",
    "path": "/home",
    "component": "Home",
    "name": "系统管理",
    "iconCls": "fa fa-windows",
    "keepAlive": null,
    "requireAuth": true,
    "parentId": 1,
    "enabled": true,
    "children": [
      {
        "id": 23,
        "url": "/system/basic/**",
        "path": "/sys/basic",
        "component": "SysBasic",
        "name": "基础信息设置",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 24,
        "url": "/system/cfg/**",
        "path": "/sys/cfg",
        "component": "SysCfg",
        "name": "系统管理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 25,
        "url": "/system/log/**",
        "path": "/sys/log",
        "component": "SysLog",
        "name": "操作日志管理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 26,
        "url": "/system/admin/**",
        "path": "/sys/admin",
        "component": "SysAdmin",
        "name": "操作员管理",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 27,
        "url": "/system/data/**",
        "path": "/sys/data",
        "component": "SysData",
        "name": "备份恢复数据库",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      },
      {
        "id": 28,
        "url": "/system/init/**",
        "path": "/sys/init",
        "component": "SysInit",
        "name": "初始化数据库",
        "iconCls": null,
        "keepAlive": null,
        "requireAuth": true,
        "parentId": 6,
        "enabled": null,
        "children": null,
        "roles": null
      }
    ],
    "roles": null
  }
]
```
使用Vuex集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 😁Project setup
```
npm install
```

### 😆Compiles and hot-reloads for development
```
npm run serve
```

### 😅Compiles and minifies for production
```
npm run build
```

### 😂Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
