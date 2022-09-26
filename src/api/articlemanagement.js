import Axios from "./request";

//文章分类查询
export const getArticleCates = (params) => {
  return Axios({
    method: "get",
    url: "/artcate/cates",
    params
  });
};

//新增文章分类
export const addArticleCates = (data) => {
  return Axios({
    method: "post",
    url: "/artcate/addcate",
    data
  });
};

//删除文章分类
export const deleteCateById = (params) => {
  return Axios({
    method: "get",
    url: "/artcate/deletecate",
    params
  });
};

//更新文章分类
export const updateCateById = (data) => {
  return Axios({
    method: "post",
    url: "/artcate/updatecate",
    data
  });
};
// -----------------------------------------------------------------
//文章标签查询
export const getArticleTags = (params) => {
  return Axios({
    method: "get",
    url: "/arttag/tags",
    params
  });
};

//新增文章标签
export const addArticleTags = (data) => {
  return Axios({
    method: "post",
    url: "/arttag/addtag",
    data
  });
};

//删除文章标签
export const deleteTagById = (params) => {
  return Axios({
    method: "get",
    url: "/arttag/deletetag",
    params
  });
};

//更新文章标签
export const updateTagById = (data) => {
  return Axios({
    method: "post",
    url: "/arttag/updatetag",
    data
  });
};
// -----------------------------------------------------------------

// 文章全部的分类查询
export const getArtCates = () => {
  return Axios({
    method: "get",
    url: "/article/getartcates"
  });
};
// 文章全部的标签查询
export const getArtTags = () => {
  return Axios({
    method: "get",
    url: "/article/getarttags"
  });
};
// 添加文章
export const addArticle = (data) => {
  return Axios({
    method: "post",
    url: "/article/addarticle",
    data,
    headers: {
      "content-type": "multipart/form-data;charset=utf-8"
    }
  });
};

// 获取文章列表
export const getArticle = (params) => {
  return Axios({
    method: "get",
    url: "/article/getarticles",
    params
  });
};
// 更新文章置顶状态
export const updateTopflag = (data) => {
  return Axios({
    method: "put",
    url: "/article/updatetopflag",
    data
  });
};
// 更新文章发表状态
export const updateState = (data) => {
  return Axios({
    method: "put",
    url: "/article/updatestate",
    data
  });
};
// 删除文章
export const deleteArticle = (data) => {
  return Axios({
    method: "put",
    url: "/article/deletearticle",
    data
  });
};

// 获取文章对应的标签id
export const getArticletags = (params) => {
  return Axios({
    method: "get",
    url: "/article/getarticletags",
    params
  });
};

// 获取文章详细内容
export const getArticleinfo = (filename) => {
  return Axios({
    method: "get",
    url: `/uploads/${filename}`
  });
};

// 更新文章
export const updateArticle = (data) => {
  return Axios({
    method: "post",
    url: "/article/updatearticle",
    data,
    headers: {
      "content-type": "multipart/form-data;charset=utf-8"
    }
  });
};
