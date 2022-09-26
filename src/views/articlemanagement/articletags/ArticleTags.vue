<!--author: zzy-->
<!--文章标签管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="标签ID">
          <el-input v-model="form.tag_id" placeholder="请输入标签ID" />
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="form.tagname" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加标签</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in tagList" :prop="item.prop" :label=item.label :width=item.width
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

    <!--添加标签弹出框-->
    <el-dialog v-model="dialogVisible" title="添加文章标签" width="30%" center>

      <el-form class="update-el-form" :model="addtagsForm" :rules="rules">
        <el-form-item label="标签名称" prop="tagname">
          <el-input v-model="addtagsForm.tagname" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addtags">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible1" title="标签信息修改" width="30%" center>

      <el-form class="update-el-form" :model="updatetagsForm" :rules="rules">
        <el-form-item label="标签名称" prop="tagname">
          <el-input v-model="updatetagsForm.tagname" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="updatetags">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getArticleTags, addArticleTags, deleteTagById, updateTagById } from "../../../api/articlemanagement";
import { tagList } from "./tagList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  tag_id: "",
  tagname: "",
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
// 获取标签列表
const onSubmit = async () => {
  getArticleTags(form).then(res => {
    console.log(res);
    count.value = res.data.data[0][0]["count(*)"];
    tableData.value = res.data.data[1];
  });
};
onSubmit();

const type = ref("success");

// 新增标签
const addtagsForm = ref({
  tagname: ""
});
// 表单校验
const rules = reactive({
  tagname: [
    { required: true, message: "请输入标签名称", trigger: "blur" },
    { min: 2, max: 8, message: "2 到 8 位", trigger: "blur" }
  ]
});
const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const addtags = () => {
  type.value = "success";
  addArticleTags(addtagsForm.value).then(res => {
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

//删除文章标签
const changeForm = ref({
  tag_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此标签吗?",
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
      changeForm.value.tag_id = Number(row.row.tag_id);
      deleteTagById(changeForm.value).then(res => {
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

//修改文章标签
const updatetagsForm = ref({
  tagname: ""
});
const dialogVisible1 = ref(false);
const updateChange = (row) => {
  dialogVisible1.value = true;
  updatetagsForm.value = row.row;
};
const updatetags = () => {
  type.value = "success";
  updateTagById(updatetagsForm.value).then(res => {
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

