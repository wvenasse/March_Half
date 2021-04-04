import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "login", //重定向
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/home",
    name: "home",
    redirect: "borad", //重定向
    meta: {
      name: "首页"
    },
    component: () => import("../views/Home/index.vue"),
    children: [{
        path: '/borad',
        name: "borad",
        meta: {
          name: "看板"
        },
        component: () => import("../views/Borad/index.vue")
      },
      {
        path: '/user',
        name: "user",
        meta: {
          name: "用户管理"
        },
        component: () => import("../views/User/index.vue")
      },
      {
        path: '/service',
        name: "service",
        meta: {
          name: "服务人员管理"
        },
        component: () => import("../views/Service/index.vue")
      },
      {
        path: '/institution',
        name: "institution",
        meta: {
          name: "服务机构管理"
        },
        component: () => import("../views/Institution/index.vue")
      },
      {
        path: '/post',
        name: "post",
        meta: {
          name: "帖子管理"
        },
        component: () => import("../views/Post/index.vue")
      },
      {
        path: '/order',
        name: "order",
        meta: {
          name: "订单管理"
        },
        component: () => import("../views/Order/index.vue")
      },
      {
        path: '/evaluation',
        name: "evaluation",
        meta: {
          name: "评价管理"
        },
        component: () => import("../views/Evaluation/index.vue")
      },
      {
        path: '/notice',
        name: "notice",
        meta: {
          name: "公告管理"
        },
        component: () => import("../views/Notice/index.vue")
      },
      {
        path: '/inform',
        name: "inform",
        meta: {
          name: "通知管理"
        },
        component: () => import("../views/Inform/index.vue")
      },
      {
        path: '/type',
        name: "type",
        meta: {
          name: "类别管理"
        },
        component: () => import("../views/Type/index.vue")
      },
      {
        path: '/power',
        name: "power",
        meta: {
          name: "权限管理"
        },
        component: () => import("../views/Power/index.vue")
      },
      {
        path: '/admin',
        name: "admin",
        meta: {
          name: "管理员管理"
        },
        component: () => import("../views/Admin/index.vue")
      },
    ]
  },

];

const router = new VueRouter({
  routes
});

export default router;