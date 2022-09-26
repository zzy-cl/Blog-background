import Axios from "./request";

// 添加图片
export const addPicture = (data) => {
  return Axios({
    method: "post",
    url: "/picture/addpicture",
    data
  });
};
// 获取图片列表
export const getPicturesList = (params) => {
  return Axios({
    method: "get",
    url: "/picture/getpictureslist",
    params
  });
};
// 修改图片
export const updatePicture = (data) => {
  return Axios({
    method: "put",
    url: "/picture/updatepicture",
    data
  });
};
// 删除图片
export const deletePicture = (data) => {
  return Axios({
    method: "post",
    url: "/picture/deletepicture",
    data
  });
};

// 获取全部相册名
export const getAlbumname = () => {
  return Axios({
    method: "get",
    url: "/picture/getalbumname"
  });
};

// 获取全部用户名
export const getUsername = () => {
  return Axios({
    method: "get",
    url: "/picture/getusername"
  });
};
