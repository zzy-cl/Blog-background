import Axios from "./request";

// 添加网剧
export const addDrama = (data) => {
  return Axios({
    method: "post",
    url: "/drama/adddrama",
    data
  });
};
// 获取网剧列表
export const getDramasList = (params) => {
  return Axios({
    method: "get",
    url: "/drama/getdramaslist",
    params
  });
};
// 修改网剧
export const updateDrama = (data) => {
  return Axios({
    method: "put",
    url: "/drama/updatedrama",
    data
  });
};
// 删除网剧
export const deleteDrama = (data) => {
  return Axios({
    method: "post",
    url: "/drama/deletedrama",
    data
  });
};

