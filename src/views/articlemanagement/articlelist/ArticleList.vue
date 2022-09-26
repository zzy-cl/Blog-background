<!--author: zzy-->
<!---->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.username" placeholder="请输入文章作者" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.catename" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="" prop="state">
          <el-select v-model="form.state" placeholder="请选择发布状态">
            <el-option label="全部" value="" />
            <el-option label="未发布" value="未发布" />
            <el-option label="已发布" value="已发布" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in articleList " :prop=item.prop :label=item.label :width=item.width
                         :key="index">
          <!--文章置顶状态-->
          <template v-slot="row" v-if="item.prop === 'top_flag'">
            <el-switch v-model="row.row.top_flag" class="ml-2" inline-prompt size="small" width="60px"
                       style="--el-switch-on-color: #98d98e; --el-switch-off-color: #dbd0e6" active-text="已置顶"
                       inactive-text="未置顶" active-value="已置顶" inactive-value="未置顶"
                       @change="topflagChange(row)" />
          </template>
          <!--文章发布状态-->
          <template v-slot="row" v-else-if="item.prop === 'state'">
            <el-switch v-model="row.row.state" class="ml-2" inline-prompt size="small" width="60px"
                       style="--el-switch-on-color: #98d98e; --el-switch-off-color: #dbd0e6" active-text="已发布"
                       inactive-text="未发布" active-value="已发布" inactive-value="未发布"
                       @change="stateChange(row)" />
          </template>
          <template v-slot="row" v-else-if="item.prop === 'actions'">
            <el-button @click="articleDetails(row)" class="button" type="primary" size="small" text bg>详情</el-button>
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

    <!--添加文章弹出框-->
    <el-dialog v-model="dialogVisible" title="新增文章" width="30%" center>

      <el-form class="update-el-form" :model="addarticleForm" :rules="rules">
        <el-form-item label="文章表题" prop="title">
          <el-input v-model="addarticleForm.title" />
        </el-form-item>

        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="addarticleForm.cate_id" placeholder="请选择文章分类">
            <el-option v-for="(item,index) in articleCates" :label=item.catename :value=item.cate_id :key="index" />
          </el-select>
        </el-form-item>

        <el-form-item label="文章标签" prop="tag_id">
          <el-select v-model="addarticleForm.tag_id" multiple collapse-tags collapse-tags-tooltip
                     placeholder="请选择文章标签">
            <el-option v-for="(item,index) in articleTags" :key="index" :label=item.tagname :value=item.tag_id />
          </el-select>
        </el-form-item>

        <el-form-item label="发布状态" prop="state">
          <el-select v-model="addarticleForm.state" placeholder="请选择发布状态">
            <el-option label="未发布" value="未发布" />
            <el-option label="已发布" value="已发布" />
          </el-select>
        </el-form-item>

        <el-form-item label="置顶状态" prop="top_flag">
          <el-select v-model="addarticleForm.top_flag" placeholder="请选择是否置顶">
            <el-option label="未置顶" value="未置顶" />
            <el-option label="已置顶" value="已置顶" />
          </el-select>
        </el-form-item>

        <el-form-item label="文章封面" prop="cover_img">
          <el-input v-model="addarticleForm.cover_img" />
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <el-upload :file-list="fileList" class="upload-demo" action="#" :limit="1" :on-exceed="handleExceed"
                     :on-change="handleChange" :auto-upload="false" accept=".md">
            <el-button type="primary" text bg>点击选择文章</el-button>
          </el-upload>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addarticle">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <ArticleDetails :visible="visible" :contentInfo="contentInfo" @visibleChange="visibleChange"></ArticleDetails>
  </div>
</template>

<script setup>
import {
  getArtCates,
  getArtTags,
  addArticle,
  getArticle,
  updateTopflag,
  updateState,
  deleteArticle
} from "../../../api/articlemanagement";
import { articleList } from "./articleList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ArticleDetails from "./ArticleDetails.vue";

// 弹窗状态
const type = ref("success");

const form = reactive({
  title: "",
  catename: "",
  state: "",
  username: "",
  pageNum: 1,// 页码
  pageSize: 10// 每页显示的条数
});
// 分页器
const handlesizeChange = (pageSize) => {
  form.pageNum = 1;
  form.pageSize = pageSize;
  onSubmit();
};
const handlecurrentChange = (pageNum) => {
  form.pageNum = pageNum;
  onSubmit();
};
// 获取文章列表
const tableData = ref();
const count = ref(null);
const onSubmit = () => {
  getArticle(form).then(res => {
    count.value = res.data.data[0][0]["COUNT(*)"];
    tableData.value = res.data.data[1];
  });
};
onSubmit();
// 改变置顶状态
const topflagChange = (row) => {
  type.value = "success";
  updateTopflag(row.row).then(res => {
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
};
// 改变发表状态
const stateChange = (row) => {
  type.value = "success";
  updateState(row.row).then(res => {
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
};

// 新增文章
const addarticleForm = ref({
  title: "", // 文章标题
  cate_id: null, // 文章分类id
  tag_id: [], // 文章标签id
  state: "", // 发布状态
  top_flag: "", // 是否置顶
  cover_img: "" // 文章封面
});
// 表单验证
const rules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    { min: 1, max: 20, message: "1 到 20 位", trigger: "blur" }
  ],
  cate_id: [
    {
      required: true,
      message: "请选择文章分类",
      trigger: "change"
    }
  ],
  tag_id: [
    {
      required: true,
      message: "请选择文章标签",
      trigger: "change"
    }
  ],
  state: [
    {
      required: true,
      message: "请选择发布状态",
      trigger: "change"
    }
  ],
  top_flag: [
    {
      required: true,
      message: "请选择是否置顶",
      trigger: "change"
    }
  ],
  cover_img: [
    { required: true, message: "请输入文章封面", trigger: "blur" }
  ],
  content: [
    {
      required: true,
      message: "请选择md文件",
      trigger: "change"
    }
  ]
});
const articleCates = ref({});
getArtCates().then(res => {
  articleCates.value = res.data.data;
});
const articleTags = ref({});
getArtTags().then(res => {
  articleTags.value = res.data.data;
});

// formData 数据
const formData = new FormData(); //FormData对象，添加参数只能通过set('key', value)的形式添加
// 超出文件数量限制时
const handleExceed = () => {
  ElMessage({
    type: "warning",
    message: "只能上传一个文件",
    center: true
  });
};

// 文件改变时触发的函数
const handleChange = (file) => {
  formData.set("content", file.raw);
};

const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const addarticle = () => {
  // 将所有的表单数据传进 FormData 中
  formData.set("title", addarticleForm.value.title);
  formData.set("cate_id", addarticleForm.value.cate_id);
  formData.set("tag_id", JSON.stringify(addarticleForm.value.tag_id)); // 无法传递数组
  formData.set("state", addarticleForm.value.state);
  formData.set("top_flag", addarticleForm.value.top_flag);
  formData.set("cover_img", addarticleForm.value.cover_img);

  type.value = "success";
  addArticle(formData).then(res => {
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

//删除
const changeForm = ref({
  article_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此文章吗?",
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
      changeForm.value.article_id = row.row.article_id;
      deleteArticle(changeForm.value).then(res => {
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

//详情
const visible = ref(false);
const contentInfo = ref({});
const articleDetails = (row) => {
  contentInfo.value = row.row;
  visible.value = true;
};
const visibleChange = (value) => {
  visible.value = value;
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

:deep(.el-upload-list) {
  margin-top: 0;
}

.el-upload button {
  width: 218.4px;
}
</style>

