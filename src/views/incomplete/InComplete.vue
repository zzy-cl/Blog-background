<!--author: zzy-->
<!--待办管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="待办ID">
          <el-input v-model="form.incomplete_id" placeholder="请输入待办ID" />
        </el-form-item>
        <el-form-item label="完成状况">
          <el-select v-model="form.is_completed" placeholder="请选择完成状况">
            <el-option label="全部" value="" />
            <el-option label="未完成" value="未完成" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加待办</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in incompleteList" :prop="item.prop" :label=item.label :width=item.width
                         :key="index">
          <!--待办完成状态-->
          <template v-slot="row" v-if="item.prop === 'is_completed'">
            <el-switch v-model="row.row.is_completed" class="ml-2" inline-prompt size="small" width="60px"
                       style="--el-switch-on-color: #98d98e; --el-switch-off-color: #dbd0e6" active-text="已完成"
                       inactive-text="未完成" active-value="已完成" inactive-value="未完成"
                       @change="completedChange(row)" />
          </template>
          <template v-slot="row" v-else-if="item.prop === 'actions'">
            <el-button @click="updateChange(row)" class="button" type="warning" size="small" text bg>修改</el-button>
            <el-button @click="deleteChange(row)" class="button" type="danger" size="small" text bg>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页器-->
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" @size-change="handlesizeChange"
                       @current-change="handlecurrentChange" :current-page="form.pageNum" :page-size="form.pageSize"
                       :total=count />
      </div>
    </el-card>

    <!--添加待办弹出框-->
    <el-dialog v-model="dialogVisible" title="添加待办" width="30%" center>

      <el-form class="update-el-form" :model="addincompleteForm" :rules="rules">
        <el-form-item label="待办内容" prop="content">
          <el-input v-model="addincompleteForm.content" type="textarea" />
        </el-form-item>
        <el-form-item label="截至时间" prop="deadline">
          <el-date-picker
            v-model="addincompleteForm.deadline"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择截至日期"
          />
        </el-form-item>
        <el-form-item label="完成状况" prop="is_completed">
          <el-select v-model="addincompleteForm.is_completed" placeholder="请选择完成状况">
            <el-option label="未完成" value="未完成" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addincompletes">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible1" title="待办信息修改" width="30%" center>

      <el-form class="update-el-form" :model="updateincompleteForm" :rules="rules">
        <el-form-item label="待办内容" prop="content">
          <el-input v-model="updateincompleteForm.content" type="textarea" />
        </el-form-item>
        <el-form-item label="截至时间" prop="deadline">
          <el-date-picker
            v-model="updateincompleteForm.deadline"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择截至日期"
          />
        </el-form-item>
        <el-form-item label="完成状况" prop="is_completed">
          <el-select v-model="updateincompleteForm.is_completed" placeholder="请选择完成状况">
            <el-option label="未完成" value="未完成" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="updateincompletes">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  addIncomplete,
  getIncompletesList,
  updateIncomplete,
  updateIsIncomplete,
  deleteIncomplete
} from "@/api/incomplete";
import { incompleteList } from "./incompleteList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  incomplete_id: "",
  is_completed: "",
  pageNum: 1,// 页码
  pageSize: 10// 每页显示的条数
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
// 获取待办列表
const onSubmit = async () => {
  getIncompletesList(form).then(res => {
    console.log(res);
    count.value = res.data.data[0][0]["COUNT(*)"];
    tableData.value = res.data.data[1];
  });
};
onSubmit();

const type = ref("success");

// 新增待办
const addincompleteForm = ref({
  content: "",
  deadline: "",
  is_completed: ""
});
// 表单校验
const rules = reactive({
  content: [
    { required: true, message: "请输入待办内容", trigger: "blur" }
  ],
  deadline: [
    { type: "date", required: true, message: "请输入截止时间", trigger: "blur" }
  ],
  is_completed: [
    { required: true, message: "请选择待办状态", trigger: "change" }
  ]
});
const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const addincompletes = () => {
  type.value = "success";
  addIncomplete(addincompleteForm.value).then(res => {
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

// 修改待办状态
const completedChange = (row) => {
  type.value = "success";
  updateIsIncomplete(row.row).then(res => {
    if (res.data.code === 1) {
      type.value = "error";
    }
    ElMessage({
      type: type.value,
      message: res.data.message,
      center: true
    });
    setTimeout(() => {
      onSubmit();
    }, 500);
  });
};
//删除待办
const changeForm = ref({
  incomplete_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此待办吗?",
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
      changeForm.value.incomplete_id = Number(row.row.incomplete_id);
      deleteIncomplete(changeForm.value).then(res => {
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

//修改待办
const updateincompleteForm = ref({
  content: "",
  deadline: "",
  is_completed: ""
});
const dialogVisible1 = ref(false);
const updateChange = (row) => {
  dialogVisible1.value = true;
  console.log(row.row);
  updateincompleteForm.value = row.row;
};
const updateincompletes = () => {
  type.value = "success";
  updateIncomplete(updateincompleteForm.value).then(res => {
    console.log(res);
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
  dialogVisible1.value = false;
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

