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
