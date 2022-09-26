<!--author: zzy-->
<!--网剧管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="网剧名称">
          <el-input v-model="form.dramaname" placeholder="请输入网剧名称" />
        </el-form-item>
        <el-form-item label="网剧平台">
          <el-select v-model="form.platform" placeholder="请选择网剧平台">
            <el-option label="全部" value="" />
            <el-option label="腾讯视频" value="腾讯视频" />
            <el-option label="哔哩哔哩" value="哔哩哔哩" />
            <el-option label="优酷视频" value="优酷视频" />
            <el-option label="爱奇艺" value="爱奇艺" />
          </el-select>
        </el-form-item>
        <el-form-item label="网剧状态">
          <el-select v-model="form.state" placeholder="请选择网剧状态">
            <el-option label="全部" value="" />
            <el-option label="在看" value="在看" />
            <el-option label="已看" value="已看" />
            <el-option label="想看" value="想看" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加网剧</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in dramaList" :prop="item.prop" :label=item.label :width=item.width
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

    <!--添加网剧弹出框-->
    <el-dialog v-model="dialogVisible" title="添加网剧" width="30%" center>
      <el-form class="update-el-form" :model="adddramasForm" :rules="rules">
        <el-form-item label="网剧名称" prop="dramaname">
          <el-input v-model="adddramasForm.dramaname" />
        </el-form-item>
        <el-form-item label="网剧封面" prop="cover_img">
          <el-input v-model="adddramasForm.cover_img" />
        </el-form-item>
        <el-form-item label="网剧简介" prop="introduce">
          <el-input v-model="adddramasForm.introduce" type="textarea" />
        </el-form-item>
        <el-form-item label="最新集数" prop="newset">
          <el-input v-model="adddramasForm.newset" />
        </el-form-item>
        <el-form-item label="全部集数" prop="allset">
          <el-input v-model="adddramasForm.allset" />
        </el-form-item>
        <el-form-item label="网剧链接" prop="url">
          <el-input v-model="adddramasForm.url" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatetime">
          <el-input v-model="adddramasForm.updatetime" />
        </el-form-item>
        <el-form-item label="网剧类别" prop="category">
          <el-select v-model="adddramasForm.category" placeholder="请选择网剧类别">
            <el-option label="动漫" value="动漫" />
            <el-option label="电视剧" value="电视剧" />
          </el-select>
        </el-form-item>
        <el-form-item label="网剧平台" prop="platform">
          <el-select v-model="adddramasForm.platform" placeholder="请选择网剧平台">
            <el-option label="腾讯视频" value="腾讯视频" />
            <el-option label="哔哩哔哩" value="哔哩哔哩" />
            <el-option label="优酷视频" value="优酷视频" />
            <el-option label="爱奇艺" value="爱奇艺" />
          </el-select>
        </el-form-item>
        <el-form-item label="网剧状态" prop="state">
          <el-select v-model="adddramasForm.state" placeholder="请选择网剧状态">
            <el-option label="在看" value="在看" />
            <el-option label="已看" value="已看" />
            <el-option label="想看" value="想看" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="adddramas">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible1" title="网剧信息修改" width="30%" center>

      <el-form class="update-el-form" :model="updatedramasForm" :rules="rules">
        <el-form-item label="网剧名称" prop="dramaname">
          <el-input v-model="updatedramasForm.dramaname" />
        </el-form-item>
        <el-form-item label="网剧封面" prop="cover_img">
          <el-input v-model="updatedramasForm.cover_img" />
        </el-form-item>
        <el-form-item label="网剧简介" prop="introduce">
          <el-input v-model="updatedramasForm.introduce" type="textarea" />
        </el-form-item>
        <el-form-item label="最新集数" prop="newset">
          <el-input v-model="updatedramasForm.newset" />
        </el-form-item>
        <el-form-item label="全部集数" prop="allset">
          <el-input v-model="updatedramasForm.allset" />
        </el-form-item>
        <el-form-item label="网剧链接" prop="url">
          <el-input v-model="updatedramasForm.url" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatetime">
          <el-input v-model="updatedramasForm.updatetime" />
        </el-form-item>
        <el-form-item label="网剧类别" prop="category">
          <el-select v-model="updatedramasForm.category" placeholder="请选择网剧类别">
            <el-option label="动漫" value="动漫" />
            <el-option label="电视剧" value="电视剧" />
          </el-select>
        </el-form-item>
        <el-form-item label="网剧平台" prop="platform">
          <el-select v-model="updatedramasForm.platform" placeholder="请选择网剧平台">
            <el-option label="腾讯视频" value="腾讯视频" />
            <el-option label="哔哩哔哩" value="哔哩哔哩" />
            <el-option label="优酷视频" value="优酷视频" />
            <el-option label="爱奇艺" value="爱奇艺" />
          </el-select>
        </el-form-item>
        <el-form-item label="网剧状态" prop="state">
          <el-select v-model="updatedramasForm.state" placeholder="请选择网剧状态">
            <el-option label="在看" value="在看" />
            <el-option label="已看" value="已看" />
            <el-option label="想看" value="想看" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="updatedramas">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addDrama, getDramasList, updateDrama, deleteDrama } from "@/api/drama";
import { dramaList } from "./dramaList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  dramaname: "",
  platform: "", // 网剧平台
  state: "", // 状态
  pageNum: 1, // 页码
  pageSize: 10 // 每页显示的条数
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
const tableData = ref([]);
const count = ref(null);
// 获取网剧列表
const onSubmit = async () => {
  getDramasList(form).then(res => {
    console.log(res);
    count.value = res.data.data[0][0]["COUNT(*)"];
    tableData.value = res.data.data[1];
    console.log(tableData.value);
  });
};
onSubmit();

const type = ref("success");

// 新增网剧
const adddramasForm = ref({
  dramaname: "",
  cover_img: "",
  introduce: "",
  newset: "",
  allset: "",
  url: "",
  updatetime: "",
  category: "",
  platform: "",
  state: ""
});
// 表单校验
const rules = reactive({
  dramaname: [
    { required: true, message: "请输入网剧名称", trigger: "blur" },
    { min: 2, max: 8, message: "2 到 8 位", trigger: "blur" }
  ],
  cover_img: [
    { required: true, message: "请输入封面链接", trigger: "blur" }
  ],
  introduce: [
    { required: true, message: "请输入网剧简介", trigger: "blur" }
  ],
  newset: [
    { required: true, message: "请输入最新集数", trigger: "blur" }
  ],
  allset: [
    { required: true, message: "请输入全部集数", trigger: "blur" }
  ],
  url: [
    { required: true, message: "请输入网剧链接", trigger: "blur" }
  ],
  updatetime: [
    { required: true, message: "请输入更新时间", trigger: "blur" }
  ],
  category: [
    {
      required: true,
      message: "请选择网剧类别",
      trigger: "change"
    }
  ],
  platform: [
    {
      required: true,
      message: "请选择网剧平台",
      trigger: "change"
    }
  ],
  state: [
    {
      required: true,
      message: "请选择网剧状态",
      trigger: "change"
    }
  ]
});
const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const adddramas = () => {
  type.value = "success";
  addDrama(adddramasForm.value).then(res => {
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
  dialogVisible.value = false;
};

//删除网剧
const changeForm = ref({
  drama_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此网剧吗?",
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
      changeForm.value.drama_id = Number(row.row.drama_id);
      deleteDrama(changeForm.value).then(res => {
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

//修改网剧
const updatedramasForm = ref({
  dramaname: ""
});
const dialogVisible1 = ref(false);
const updateChange = (row) => {
  dialogVisible1.value = true;
  updatedramasForm.value = row.row;
};
const updatedramas = () => {
  type.value = "success";
  updateDrama(updatedramasForm.value).then(res => {
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

