import Axios from "./request";

// 添加待办
export const addIncomplete = (data) => {
  return Axios({
    method: "post",
    url: "/incomplete/addincomplete",
    data
  });
};
// 获取待办列表
export const getIncompletesList = (params) => {
  return Axios({
    method: "get",
    url: "/incomplete/getincompleteslist",
    params
  });
};
// 修改待办
export const updateIncomplete = (data) => {
  return Axios({
    method: "put",
    url: "/incomplete/updateincomplete",
    data
  });
};

// 修改待办状态
export const updateIsIncomplete = (data) => {
  return Axios({
    method: "put",
    url: "/incomplete/updateisincomplete",
    data
  });
};

// 删除待办
export const deleteIncomplete = (data) => {
  return Axios({
    method: "post",
    url: "/incomplete/deleteincomplete",
    data
  });
};
