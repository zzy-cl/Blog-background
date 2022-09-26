import Axios from "./request";

//注册
export const register = (data) => {
  return Axios({
    method: "post",
    url: "/api/register",
    data
  });
};

//登录
export const login = (data) => {
  return Axios({
    method: "post",
    url: "/api/login",
    data
  });
};

//用户信息
export const userinfo = () => {
  return Axios({
    method: "get",
    url: "/user/userinfo"
  });
};
