<template>
  <el-drawer v-model="visible" size="100%" direction="ttb" :before-close="handleClose">
    <template #header>
      <div>
        <el-form :model="form" label-width="90px">

          <el-form-item label="文章标题">
            <el-input v-model="form.title" />
          </el-form-item>

          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="form.cate_id" placeholder="请选择文章分类">
              <el-option v-for="(item,index) in articleCates" :label=item.catename :value=item.cate_id :key="index" />
            </el-select>
          </el-form-item>

          <el-form-item label="文章标签" prop="tag_id">
            <el-select v-model="form.tag_id" multiple collapse-tags collapse-tags-tooltip
                       placeholder="请选择文章标签">
              <el-option v-for="(item,index) in articleTags" :key="index" :label=item.tagname :value=item.tag_id />
            </el-select>
          </el-form-item>

          <el-form-item label="背景图片" prop="cover_img">
            <el-image style="width: auto; height: 32px" :preview-src-list=[form.cover_img] :src=form.cover_img />
            <el-input v-model="form.cover_img" />
          </el-form-item>
          <el-button class="el-button-submit" type="primary" @click="onSubmit">提交修改</el-button>
        </el-form>
      </div>
    </template>
    <v-md-editor v-model="content" @change="infoChange"></v-md-editor>
  </el-drawer>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onUpdated, ref } from "vue";
import { getArticleinfo, updateArticle, getArtCates, getArtTags, getArticletags } from "../../../api/articlemanagement";

const props = defineProps(["visible", "contentInfo"]);
const emits = defineEmits(["visibleChange"]);

const content = ref("请在这里开始写入你的文章内容..."); // 文章内容

// const infoChange = (text, html) => {
// };

const form = ref({}); // 表单修改
const regex = /[0-9]+\.(md|txt)$/;
const contentAdd = ref(null); // 文章地址
onUpdated(() => {
  form.value = props.contentInfo;
  // 获取文章对应的标签
  getArticletags({ article_id: form.value.article_id }).then(res => {
    form.value.tag_id = [];
    for (let i = 0; i < res.data.data.length; i++) {
      form.value.tag_id.push(res.data.data[i].tag_id);
    }
  });
  contentAdd.value = props.contentInfo.content.match(regex)[0];

  getArticleinfo(contentAdd.value).then(res => {
    content.value = res.data;
  });
});
// 获取系统中的分类和标签
const articleCates = ref({});
getArtCates().then(res => {
  articleCates.value = res.data.data;
});
const articleTags = ref({});
getArtTags().then(res => {
  articleTags.value = res.data.data;
});

const formData = new FormData();

// 提交
const type = ref("success");
const onSubmit = () => {
  let mdBlob = new Blob([content.value], { type: "" }); //利用Blob对象生成文件
  let mdFile = new File([mdBlob], contentAdd.value); // 其实这一步是对文件进行重命名

  formData.set("article_id", form.value.article_id);
  formData.set("title", form.value.title);
  formData.set("cate_id", form.value.cate_id);
  formData.set("tag_id", JSON.stringify(form.value.tag_id));
  formData.set("cover_img", form.value.cover_img);
  formData.set("updatecontent", mdFile);
  ElMessageBox.confirm(
    "你确定要更新此文章信息吗?",
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
      updateArticle(formData).then(res => {
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
        message: "取消更新",
        center: true
      });
    });
};

const handleClose = (done) => {
  ElMessageBox.confirm(
    "你确定要关闭此页吗?它可能会使你修改的数据丢失！",
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "再想想",
      type: "warning",
      center: true
    }
  )
    .then(() => {
      done();
      emits("visibleChange", false);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消关闭",
        center: true
      });
    });
};
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
}

.el-form-item {
  margin: 0;
}

.v-md-editor {
  height: calc(100vh - 124px);
}

.el-image {
  margin-right: 10px;
}

.el-button-submit {
  margin-left: 20px;
}
</style>
