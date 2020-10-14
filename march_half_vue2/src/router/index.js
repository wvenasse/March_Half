import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login" //重定向
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home/index.vue"),
    children: [
      {path:'/act',component: () => import("../views/Act/index.vue")},
      {path:'/admin',component: () => import("../views/Admin/index.vue")},
      {path:'/borad',component: () => import("../views/Borad/index.vue")},
      {path:'/dorm',component: () => import("../views/Dorm/index.vue")},
      {path:'/hygiene',component: () => import("../views/Hygiene/index.vue")},
      {path:'/notice',component: () => import("../views/Notice/index.vue")},
      {path:'/out',component: () => import("../views/Out/index.vue")},
      {path:'/pay',component: () => import("../views/Pay/index.vue")},
      {path:'/post',component: () => import("../views/Post/index.vue")},
      {path:'/power',component: () => import("../views/Power/index.vue")},
      {path:'/repair',component: () => import("../views/Repair/index.vue")},
      {path:'/type',component: () => import("../views/Type/index.vue")},
      {path:'/user',component: () => import("../views/User/index.vue")},
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
