import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./components/icons/index.js"

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import request from '../src/utils/request'
Vue.prototype.$http = request;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
