import Axios from "./request";

// 添加相册
export const addAlbum = (data) => {
  return Axios({
    method: "post",
    url: "/album/addalbum",
    data
  });
};
// 获取相册列表
export const getAlbumsList = (params) => {
  return Axios({
    method: "get",
    url: "/album/getalbumslist",
    params
  });
};
// 修改相册
export const updateAlbum = (data) => {
  return Axios({
    method: "put",
    url: "/album/updatealbum",
    data
  });
};
// 删除相册
export const deleteAlbum = (data) => {
  return Axios({
    method: "post",
    url: "/album/deletealbum",
    data
  });
};
