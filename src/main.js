import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import store from "@/store/vuex";
import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from "@/utils/axios";
import {putRequest} from "@/utils/axios";
import {getRequest} from "@/utils/axios";
import {deleteRequest} from "@/utils/axios";
import {downloadRequest} from "./utils/download";
import {initMenu} from "./utils/menus";


Vue.use(ElementUI);
Vue.config.productionTip = false

//插件形式使用
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.downloadRequest = downloadRequest;

//路由导航守卫
//全局前置守卫
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem("tokenStr")) {
        initMenu(router, store);
        if (!window.sessionStorage.getItem("user")) {
            return getRequest('/admin/info').then(resp => {
                if (resp) {
                    alert(resp);
                    //存入用户信息
                    window.sessionStorage.setItem("user", JSON.stringify(resp));
                    store.commit('INIT_CURRENTAdmin',resp);
                    next();
                }
            });
        }
        next();
    } else {
        if (to.path == '/') {
            next();
        } else {
            next('/?redirect=' + to.path);
        }
    }
})

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')//
