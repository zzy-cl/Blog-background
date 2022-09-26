<!--author: zzy-->
<!--注册-->
<template>
  <el-form ref="FormRef" :model="form" :rules="rules" label-position="right" label-width="auto"
           class="registerForm sign-up-form">
    <h2>用户注册</h2>

    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username" suffix-icon="User" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <!--属性  type="password"-->
      <el-input v-model="form.password" suffix-icon="Lock" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" suffix-icon="Message" />
    </el-form-item>

    <el-form-item label="电话" prop="mobile">
      <el-input v-model="form.mobile" suffix-icon="Iphone" />
    </el-form-item>

    <el-button type="primary" @click="onSubmit">注册</el-button>

    <!-- <button>注册</button> -->
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { register } from "../../api/login";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  username: "",
  password: "",
  email: "",
  mobile: ""
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 10, message: "用户名长度为2到10位", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 12, message: "密码长度为5到12位", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { min: 8, max: 20, message: "邮箱长度为8到20位", trigger: "blur" }
  ],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "手机号长度为11位", trigger: "blur" }
  ]
});
const FormRef = ref(null);
const type = ref("success");
const onSubmit = () => {
  FormRef.value.validate(async (valid) => {
    if (valid) {
      ElMessageBox.confirm(
        "你确定要进行用户注册吗",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "再想想",
          type: "warning",
          center: true
        }
      )
        .then(() => {
          type.value = "success";
          register(form).then(res => {
            if (res.data.code === 1) {
              type.value = "error";
            }
            ElMessage({
              type: type.value,
              message: res.data.message,
              center: true
            });
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消注册",
            center: true
          });
        });
    } else {
      ElMessage({
        type: "error",
        message: "表单验证不通过！",
        center: true
      });
    }
  });
};
</script>

<style lang="css" scoped>
/* register */
.registerForm {
  width: 30vw;
  margin: 0 auto 20vh 10vw;
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
