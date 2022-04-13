import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from "../utils/api";


Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
    //Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态
    state: {
        routes: [],
        sessions: [],
        currentAdmin: null,
        admins: [],
        currentSession: null,
        filterKey: '',
        stomp: null
    },
    //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    //Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。
    //这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
    mutations: {
        INIT_CURRENTAdmin(state, admin) {
            state.currentAdmin = admin;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSessionId(state, currentSession) {
            state.currentSession = currentSession;
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentAdmin.username + '#' + msg.to];
            if (!mss) {
                Vue.set(state.sessions, state.currentAdmin.username + '#' + msg.to, []);
            }
            state.sessions[state.currentAdmin.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            // 浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
//console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_ADMIN(state, data) {
            state.admins = data;
        }
    },
    //异步
    actions: {
        connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            let token = window.sessionStorage.getItem("tokenStr");
            context.state.stomp.connect({'Auth-Token': token}, success => {
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {
            })
        },
        initData(context) {
            getRequest('/chat/').then(resp=>{
                if (resp){
                    context.commit('INIT_ADMIN', resp);
                }
            })
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})
export default store;
/*
state ：全局state对象,用于保存所有组件的公共数据
getters ：监听state值的最新状态（计算属性）
mutations ：唯一可以改变state值的方法(同步执行)
actions ：异步执行mutations方法
* */
