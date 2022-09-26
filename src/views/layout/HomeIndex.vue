<!--主框架-->
<template>
  <div class="common-layout">
    <el-container>
      <!--顶部导航栏-->
      <el-header>
        <HeaderPage></HeaderPage>
      </el-header>

      <el-container>
        <!--侧边栏-->
        <el-aside width="200px">
          <AsidePage></AsidePage>
        </el-aside>
        <!--主体部分-->
        <el-main>
          <RouterView v-slot="{ Component }">
            <!--对路由跳转添加动画过渡-->
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script setup>
import AsidePage from "./AsidePage.vue";
import HeaderPage from "./HeaderPage.vue";

</script>

<style lang="scss" scoped>
.el-header {
  background-color: #bbbcde;
}

.el-aside {
  background-color: rgb(235, 235, 235);
}

.el-main {
  background-color: rgb(235, 235, 235);
  height: calc(100vh - 60px);

}
</style>


