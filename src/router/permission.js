import router from "./index";
import { useStore } from "../stores";

const whitelist = ["/login"];
router.beforeEach((to, form, next) => {
  const routerStore = useStore(); // 写在里面！！！（important）
  if (routerStore.getToken) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false
    if (whitelist.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
