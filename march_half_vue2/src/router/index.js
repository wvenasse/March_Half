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
        path: '/act',
        name: "act",
        meta: {
          name: "活动管理"
        },
        component: () => import("../views/Act/index.vue")
      },
      {
        path: '/admin',
        name: "admin",
        meta: {
          name: "管理员"
        },
        component: () => import("../views/Admin/index.vue")
      },
      {
        path: '/borad',
        name: "borad",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Borad/index.vue")
      },
      {
        path: '/dorm',
        name: "dorm",
        meta: {
          name: "寝室管理"
        },
        component: () => import("../views/Dorm/index.vue")
      },
      {
        path: '/hygiene',
        name: "hygiene",
        meta: {
          name: "卫生管理"
        },
        component: () => import("../views/Hygiene/index.vue")
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
        path: '/out',
        name: "out",
        meta: {
          name: "外出管理"
        },
        component: () => import("../views/Out/index.vue")
      },
      {
        path: '/pay',
        name: "pay",
        meta: {
          name: "缴费管理"
        },
        component: () => import("../views/Pay/index.vue")
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
        path: '/power',
        name: "power",
        meta: {
          name: "权限"
        },
        component: () => import("../views/Power/index.vue")
      },
      {
        path: '/repair',
        name: "repair",
        meta: {
          name: "报修管理"
        },
        component: () => import("../views/Repair/index.vue")
      },
      {
        path: '/type',
        name: "type",
        meta: {
          name: "类别"
        },
        component: () => import("../views/Type/index.vue")
      },
      {
        path: '/user',
        name: "user",
        meta: {
          name: "人员管理"
        },
        component: () => import("../views/User/index.vue")
      },
    ]
  },

];

const router = new VueRouter({
  routes
});

export default router;