import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"


import {postRequest} from "@/utils/axios";
import {putRequest} from "@/utils/axios";
import {getRequest} from "@/utils/axios";
import {deleteRequest} from "@/utils/axios";

Vue.use(ElementUI);
Vue.config.productionTip = false

//插件形式使用
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')//
