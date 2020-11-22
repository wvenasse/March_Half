import router from "../router";
//路由守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    next();
  })