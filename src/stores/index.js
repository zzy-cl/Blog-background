import { defineStore } from "pinia";
import { login as asLogin } from "../api/login";
import router from "../router";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { setTokenTime } from "../utils/auth";

export const useStore = defineStore("main", {
  state: () => {
    return {
      token: localStorage.getItem("token") || "",
      useravatar: localStorage.getItem("useravatar") || ""
    };
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getUseravavtar: (state) => {
      return state.useravatar;
    }
  },
  actions: {
    // 登陆系统
    login(userinfo) {
      const type = ref("success");
      asLogin(userinfo).then(res => {
        if (res.data.code === 1) {
          type.value = "error";
        } else {
          this.token = res.data.token;
          localStorage.setItem("token", res.data.token);
          setTokenTime(); // 存储 token 开始的时间
          router.replace("/");
        }
        ElMessage({
          type: type.value,
          message: res.data.message,
          center: true
        });
      });
    },
    //  退出系统
    logout() {
      this.token = "";
      localStorage.clear();
      sessionStorage.clear();
      router.replace("/login");

    }
  }
});
