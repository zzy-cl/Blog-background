<!--author: zzy-->
<!--登录-->
<template>
  <el-form ref="FormRef" :model="form" :rules="rules" class="loginForm sign-in-form">
    <h2>用户登录</h2>

    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username" suffix-icon="User" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" show-password />
    </el-form-item>

    <el-button type="primary" @click="onSubmit">登录</el-button>

  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "../../stores";

const loginStore = useStore();

const form = reactive({
  username: "是zzy呀",
  password: "20010307"
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 10, message: "用户名长度为2到10位", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 12, message: "密码长度为5到12位", trigger: "blur" }
  ]
});
const FormRef = ref(null);
const onSubmit = () => {
  FormRef.value.validate(async (valid) => {
    if (valid) {
      loginStore.login(form);
    } else {
      ElMessage({
        type: "error",
        message: "表单验证不通过",
        center: true
      });
    }
  });
};
</script>

<style scoped>
/* form */
.loginForm {
  width: 30vw;
  margin: 20vh auto 0 5vw;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(195, 195, 195, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  margin: 2vw;
}

button {
  margin-bottom: 2vh;
}
</style>
