//axios 是一个基于promise的HTTP库，可以在浏览器和node.js中使用
//从浏览器中创建XMLHttpRequests
//从node.js中创建Http请求、支持Promise API、拦截请求和响应、转换请求数据和响应数据、
//取消请求、自动转换JSON数据、客户端支持防御XSRF

import axios from 'axios'
import {Message} from 'element-ui';


// 请求拦截器
axios.interceptors.request.use(config => {
    //如果存在
    if (window.sessionStorage.getItem('tokenStr')) {
        //请求携带后端穿过来的token
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config
}, error => {
    console.log(error);
})

//添加响应拦截器 success成功访问到接口
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
    }
    return success.data;
}, error => {
    //504 前端开发中为跨域问题，一般要后端解决
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: "服务器打小差了。。。"})
    } else if (error.response.code = 403) {
        Message.error({message: '权限不足，请联系管理员！'});
    } else if (error.response.code == 401) {
        Message.error({message: '尚未登录，请登录'});
        //跳转到登陆页
        router.replace('/');
        //如果所有的状态码都不在这
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else {
            Message.error({message: '未知错误！'});
        }
    }
    return;
});

//前置的路径
let base = '';
//传送json格式的post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
