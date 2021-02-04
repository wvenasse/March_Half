import cookie from "cookie_js";
import {getNickName,getUserName,removeToken,removeNickName} from "@/utils/app"
const app = {
    state: {
        isCollapse: false, //JSON.parse(sessionStorage.getItem('isCollapse')) || ,
        toKen:'',
        username: getUserName()||'',
        nickname: getNickName()||''
    },
    getters: { //computed
        isCollapse: state => state.isCollapse,
        userName: state => state.userName,
        nickname: state => state.nickname,
    },
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            // sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        },
        SET_TOKEN(state,value) {
            state.toKen = value;
        },
        SET_NICKNAME(state,value) {
            state.nickname = value;
        },
        UPDATE_NICKNAME(state,value) {
            state.nickname = value;
        },
        SET_USERNAME(state,value) {
            state.userName = value;
        },
    },
    actions: {
        setMenuStatus(content, data) {
            content.commit('SET_COLLAPSE');
        },
        exit(content){
            return new Promise((resolve, reject) => {
                removeToken();
                removeNickName();
                removeUserName();
                content.commit('SET_TOKEN',"");
                content.commit('SET_NICKNAME',"");
                content.commit('SET_USERNAME',"");
                resolve();
            })
        }
    },
}

export default app;
// namespaced: true