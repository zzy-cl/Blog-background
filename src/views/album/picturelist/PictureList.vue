<!--author: zzy-->
<!--图片管理-->
<template>
  <div>
    <el-card class="header-card" shadow="hover">
      <el-form :inline="true" :model="form" class="demo-form-inline">

        <el-form-item label="所属相册" prop="album_id">
          <el-select v-model="form.albumname" placeholder="请选择所属相册">
            <el-option v-for="(item,index) in albumList" :label=item.albumname :value=item.albumname
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" prop="user_id">
          <el-select v-model="form.username" placeholder="请选择创建人">
            <el-option v-for="(item,index) in userList" :label=item.username :value=item.username
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit1">添加图片</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="main-card" shadow="hover">
      <!--表格-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column v-for="(item, index) in pictureList" :prop="item.prop" :label=item.label :width=item.width
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

    <!--添加图片弹出框-->
    <el-dialog v-model="dialogVisible" title="添加文章图片" width="30%" center>

      <el-form class="update-el-form" :model="addpicturesForm" :rules="rules">
        <el-form-item label="所属相册" prop="album_id">
          <el-select v-model="addpicturesForm.album_id" placeholder="请选择相册">
            <el-option v-for="(item,index) in albumList" :label=item.albumname :value=item.album_id
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" prop="src">
          <el-input v-model="addpicturesForm.src" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addpictures">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!--信息修改弹出框-->
    <el-dialog v-model="dialogVisible1" title="图片信息修改" width="30%" center>

      <el-form class="update-el-form" :model="updatepicturesForm" :rules="rules">
        <el-form-item label="所属相册" prop="album_id">
          <el-select v-model="updatepicturesForm.album_id" placeholder="请选择相册">
            <el-option v-for="(item,index) in albumList" :label=item.albumname :value=item.album_id
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" prop="src">
          <el-input v-model="updatepicturesForm.src" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
          <el-button type="primary" @click="updatepictures">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addPicture, getPicturesList, updatePicture, deletePicture, getAlbumname, getUsername } from "@/api/picture";
import { pictureList } from "./pictureList";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const form = reactive({
  albumname: "",
  username: "",
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
// 获取图片列表
const onSubmit = async () => {
  getPicturesList(form).then(res => {
    console.log(res);
    count.value = res.data.data[0][0]["count(*)"];
    tableData.value = res.data.data[1];
  });
};
onSubmit();

const type = ref("success");

// 新增图片
const addpicturesForm = ref({
  album_id: "",
  src: ""
});
// 表单校验
const rules = reactive({
  album_id: [
    {
      required: true,
      message: "请选择相册",
      trigger: "change"
    }
  ],
  src: [
    { required: true, message: "请输入图片链接（集）", trigger: "blur" }
  ]
});
// 获取全部相册信息
const albumList = ref([]);
getAlbumname().then(res => {
  albumList.value = res.data.data;
  console.log(albumList.value);
});
// 获取全部用户信息
const userList = ref([]);
getUsername().then(res => {
  userList.value = res.data.data;
  console.log(userList.value);
});
const dialogVisible = ref(false);
const onSubmit1 = () => {
  dialogVisible.value = true;
};
const addpictures = () => {
  type.value = "success";
  addPicture(addpicturesForm.value).then(res => {
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

//删除文章图片
const changeForm = ref({
  picture_id: 0
});
const deleteChange = (row) => {
  ElMessageBox.confirm(
    "你确定要删除此图片吗?",
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
      changeForm.value.picture_id = Number(row.row.picture_id);
      deletePicture(changeForm.value).then(res => {
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

//修改图片
const updatepicturesForm = ref({
  album_id: "",
  src: ""
});
const dialogVisible1 = ref(false);
const updateChange = (row) => {
  dialogVisible1.value = true;
  updatepicturesForm.value = row.row;
};
const updatepictures = () => {
  type.value = "success";
  updatePicture(updatepicturesForm.value).then(res => {
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

