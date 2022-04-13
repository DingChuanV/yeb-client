import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "@/views/Home";
import FriendChat from "../views/chat/FriendChat";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: '/chat',
        name: '在线聊天',
        component: Home,
        children: [
            {
                path: '/chat',
                name: 'friendChat',
                component:FriendChat
            }, 
            {
                path: '/userinfo',
                name: '个人中心',
                component: AdminInfo
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
