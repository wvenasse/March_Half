import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
Vue.use(Vuex);
import app from "./modules/app.js"
  

export default new Vuex.Store({
  modules: {
    app
  }
});
