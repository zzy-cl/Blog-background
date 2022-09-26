<!--author: zzy-->
<!--侧边栏-->
<template>
  <el-col :span="12">
    <el-menu :default-active=defaultActive class="el-menu-vertical-demo" active-text-color="#e95295"
             background-color="#bbbcde" router unique-opened="true">

      <el-menu-item index="/homepage">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/usercontrol">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>用户管理</span>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <Management />
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/articlecategories">
          <el-icon>
            <FolderOpened />
          </el-icon>
          文章分类
        </el-menu-item>
        <el-menu-item index="/articletags">
          <el-icon>
            <Discount />
          </el-icon>
          文章标签
        </el-menu-item>
        <el-menu-item index="/articlelist">
          <el-icon>
            <Document />
          </el-icon>
          文章列表
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <Management />
          </el-icon>
          <span>相册管理</span>
        </template>
        <el-menu-item index="/albumlist">
          <el-icon>
            <FolderOpened />
          </el-icon>
          相册列表
        </el-menu-item>
        <el-menu-item index="/picturelist">
          <el-icon>
            <Discount />
          </el-icon>
          图片列表
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/incomplete">
        <el-icon>
          <List />
        </el-icon>
        <span>待办事项</span>
      </el-menu-item>

      <el-menu-item index="/drama">
        <el-icon>
          <List />
        </el-icon>
        <span>休闲追剧</span>
      </el-menu-item>

      <el-menu-item index="/testmd">
        <el-icon>
          <QuestionFilled />
        </el-icon>
        <span>测试</span>
      </el-menu-item>

    </el-menu>
  </el-col>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const route = useRouter();
const defaultActive = ref(sessionStorage.getItem("path") || "/homepage");
watch(route.currentRoute, async () => {
  // 存储实时的 路由状态
  console.log(route.currentRoute);
  sessionStorage.setItem("path", route.currentRoute._value.fullPath);
});

</script>

<style lang="scss" scoped>
$headerheight: 60px;

.el-menu-vertical-demo {
  height: calc(100vh - 60px); // 1.calc()函数 2.减号两边要有空格
  width: 200px;
  border-radius: 0 25px 25px 0;
}
</style>
