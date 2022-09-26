<!--author: zzy-->
<!--文章分类管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="分类ID">
          <el-input v-model="form.cate_id" placeholder="请输入分类ID" />
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加分类</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in cateList" :prop="item.prop" :label=item.label :width=item.width
                         :key="index">
          <template v-slot="row" v-if="item.prop === 'actions'">
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

    <!--添加分类弹出框-->
    <el-dialog v-model="dialogVisible" title="添加文章分类" width="30%" center>

      <el-form class="update-el-form" :model="addcatesForm" :rules="rules">
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="addcatesForm.catename" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addcates">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible1" title="分类信息修改" width="30%" center>

      <el-form class="update-el-form" :model="updatecatesForm" :rules="rules">
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="updatecatesForm.catename" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="updatecates">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getArticleCates, addArticleCates, deleteCateById, updateCateById } from "../../../api/articlemanagement";
import { cateList } from "./cateList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  cate_id: "",
  catename: "",
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
// 获取分类列表
const onSubmit = async () => {
  getArticleCates(form).then(res => {
    console.log(res);
    count.value = res.data.data[0][0]["count(*)"];
    tableData.value = res.data.data[1];
  });
};
onSubmit();

const type = ref("success");

// 新增分类
const addcatesForm = ref({
  catename: ""
});
// 表单校验
const rules = reactive({
  catename: [
    { required: true, message: "请输入分类名称", trigger: "blur" },
    { min: 2, max: 8, message: "2 到 8 位", trigger: "blur" }
  ]
});
const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const addcates = () => {
  type.value = "success";
  addArticleCates(addcatesForm.value).then(res => {
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

//删除文章分类
const changeForm = ref({
  cate_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此分类吗?",
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
      changeForm.value.cate_id = Number(row.row.cate_id);
      deleteCateById(changeForm.value).then(res => {
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

//修改文章分类
const updatecatesForm = ref({
  catename: ""
});
const dialogVisible1 = ref(false);
const updateChange = (row) => {
  dialogVisible1.value = true;
  updatecatesForm.value = row.row;
};
const updatecates = () => {
  type.value = "success";
  updateCateById(updatecatesForm.value).then(res => {
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

