<!--author: zzy-->
<!--用户管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户账号">
          <el-input v-model="form.username" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="form.mobile" placeholder="请输入用户电话" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="form.email" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in usersList" :prop="item.prop" :label=item.label :width=item.width
                         :key="index">
          <template v-slot="row" v-if="item.prop === 'useravatar'">
            <div style="width: 40px;height: 40px;">
              <el-avatar shape="square" :size="40" :src=row.row.useravatar />
            </div>
          </template>
          <template v-slot="row" v-if="item.prop === 'actions'">
            <el-button @click="updateChange(row)" class="button" type="warning" size="small" text bg>修改</el-button>
            <el-button @click="deleteChange(row)" class="button" type="danger" size="small" text bg>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" @size-change="handlesizeChange"
                       @current-change="handlecurrentChange" :current-page="form.pageNum" :page-size="form.pageSize"
                       :total=count />
      </div>
    </el-card>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible" title="用户信息修改" width="30%" center>

      <el-form class="update-el-form" :model="infoForm">
        <el-form-item label="用户账号">
          <el-input v-model="infoForm.username" disabled />
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="infoForm.mobile" />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="infoForm.email" />
        </el-form-item>
        <el-form-item label="头像链接">
          <el-input v-model="infoForm.useravatar" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="commit()">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { userslist, userdelete, userupdate } from "../../api/usercontrol";
import { usersList } from "./usersList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  username: "",
  mobile: "",
  email: "",
  pageNum: 1,// 页码
  pageSize: 7// 每页显示的条数
});
const handlesizeChange = (pageSize) => {
  form.pageNum = 1;
  form.pageSize = pageSize;
  onSubmit();
};
const handlecurrentChange = (pageNum) => {
  form.pageNum = pageNum;
  onSubmit();
};
const tableData = ref();
const count = ref(null);
const onSubmit = async () => {
  const res = await userslist(form);
  console.log(res);
  count.value = res.data.data[0][0]["count(*)"];
  tableData.value = res.data.data[1];
};
onSubmit();

//修改和删除
const type = ref("success");
const changeForm = ref({
  username: ""
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此用户吗?",
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
      changeForm.value.username = row.row.username;
      userdelete(changeForm.value).then(res => {
        onSubmit();
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
        message: "取消删除",
        center: true
      });
    });
};
//修改
const infoForm = ref({
  username: "",
  mobile: "",
  email: "",
  useravatar: ""
});
const dialogVisible = ref(false);
const updateChange = (row) => {
  dialogVisible.value = true;
  infoForm.value = row.row;
};
const commit = () => {
  type.value = "success";
  userupdate(infoForm.value).then(res => {
    onSubmit();
    if (res.data.code === 1) {
      type.value = "error";
    }
    ElMessage({
      type: type.value,
      message: res.data.message,
      center: true
    });
  });
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
/*搜索框*/
.header-card {
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 0;
}

/*列表框*/
.main-card {
  height: calc(100vh - 194px);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

//输入框
.update-el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-form-item {
    margin: 10px;
  }
}
</style>
