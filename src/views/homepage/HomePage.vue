<!--author: zzy-->
<!--首页-->
<template>
  <div>
    <!-- 资料卡片 -->
    <el-card class="box-card" shadow="hover">
      <el-avatar class="el-avatar" :size="100" :src=userinfoForm.useravatar />
      <template #header>
        <div class="card-header">
          <img class="img" src="https://www.logosc.cn/uploads/icon/2021/08/10/icon_611247fcec772.svg">
        </div>
      </template>
      <div class="footer">
        <p>账号：{{ userinfoForm.username }}</p>
        <p>权限：{{ userinfoForm.user_rights }}</p>
        <p>电话：{{ userinfoForm.mobile }}</p>
        <p>邮箱：{{ userinfoForm.email }}</p>
      </div>
    </el-card>
    <!-- 右侧 Echarts 图 -->
    <!--    <RightEcharts></RightEcharts>-->
    <!-- 底部 Echarts 图 -->
    <!--    <FootEcharts></FootEcharts>-->
  </div>
</template>

<script setup>
import { userinfo } from "../../api/login";
import { useStore } from "../../stores";
import { ref } from "vue";
// import RightEcharts from './RightEcharts.vue';
// import FootEcharts from './FootEcharts.vue';

const homepageStore = useStore();
const userinfoForm = ref({});
userinfo().then(res => {
  console.log(res);
  userinfoForm.value = res.data.data;
  homepageStore.useravatar = res.data.data.useravatar;
  localStorage.setItem("useravatar", res.data.data.useravatar);
  console.log(userinfoForm.value);
});
</script>

<style scoped>
.box-card {
  width: 290px;
  height: 400px;
  border-radius: 16px;
  position: absolute;
}

.img {
  width: 248px;
  height: 100px;
}

.card-header {
  /* background-color: #bbbcde; */
  filter: opacity(0.2);
  height: 100px;
  border-radius: 16px;
}

.el-avatar {
  position: absolute;
  top: -75px;
  left: 95px;
}

.footer {
  padding-top: 24px;
}

p {
  font-size: 16px;
  font-weight: 600;
  color: #2ca9e1;
  margin: 16px;
}
</style>
