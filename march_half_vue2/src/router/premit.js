import router from "../router";
import {Message} from 'element-ui';
import store from "../store/index"
import {getToken,removeToken,removeNickName} from "@/utils/app";

const whiteRouter = ['/login'];
//路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == '/login') {
      removeToken();
      removeNickName();
      store.commit('SET_TOKEN', "");
      store.commit('SET_NICKNAME', "");
      next()
    }
    else {
      next()
    }
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    }
    else {
      next()

      // Message.error("请先登录");
      // next('/login')
    }
  }
})