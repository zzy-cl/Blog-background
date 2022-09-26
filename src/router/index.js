import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "LoginIndex",
      component: () => import("../views/login/LoginIndex.vue")
    },
    {
      path: "/",
      name: "HomeIndex",
      component: () => import("../views/layout/HomeIndex.vue"),
      redirect: "/homepage",
      children: [
        {
          path: "/homepage",
          name: "HomePage",
          component: () => import("../views/homepage/HomePage.vue")
        },
        {
          path: "/usercontrol",
          name: "UserControl",
          component: () => import("../views/usercontrol/UserControl.vue")
        },
        {
          path: "/articlecategories",
          name: "ArticleCategories",
          component: () => import("../views/articlemanagement/articlecategories/ArticleCategories.vue")
        },
        {
          path: "/articletags",
          name: "ArticleTags",
          component: () => import("../views/articlemanagement/articletags/ArticleTags.vue")
        },
        {
          path: "/articlelist",
          name: "ArticleList",
          component: () => import("../views/articlemanagement/articlelist/ArticleList.vue")
        },
        {
          path: "/albumlist",
          name: "AlbumList",
          component: () => import("../views/album/albumlist/AlbumList.vue")
        },
        {
          path: "/picturelist",
          name: "PictureList",
          component: () => import("../views/album/picturelist/PictureList.vue")
        },
        {
          path: "/incomplete",
          name: "InComplete",
          component: () => import("../views/incomplete/InComplete.vue")
        },
        {
          path: "/drama",
          name: "DramaPage",
          component: () => import("../views/drama/DramaPage.vue")
        },
        {
          path: "/testmd",
          name: "MarkDown",
          component: () => import("../views/test/MarkDown.vue")
        }
      ]
    }
  ]
});

export default router;
