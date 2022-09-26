import Axios from "./request";

// 获取用户列表
export const userslist = (data) => {
  return Axios({
    method: "post",
    url: "/user/userslist",
    data
  });
};

//删除用户
export const userdelete = (data) => {
  return Axios({
    method: "post",
    url: "/user/userdelete",
    data
  });
};

//修改用户
export const userupdate = (data) => {
  return Axios({
    method: "post",
    url: "/user/userupdate",
    data
  });
};
