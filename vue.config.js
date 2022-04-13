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