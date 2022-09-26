<!--author: zzy-->
<!--顶部导航-->
<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <!-- Logo -->
    <img class="logo" src="https://www.logosc.cn/uploads/icon/2021/08/10/icon_611247fcec772.svg">

    <div class="flex-grow"></div>

    <!-- 当前时间 -->
    <div id="clock">
      <p class="date">{{ clock.date }}</p>
      <p class="time">{{ clock.time }}</p>
    </div>

    <!-- 全屏切换 -->
    <div class="screen" @click="handleFullscreen">
      <el-icon :size="26">
        <component :is="isIcon"></component>
      </el-icon>
    </div>
    <!-- 头像|退出|仓库 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar class="avatar" shape="square" :size="40"
                   :src=headerStore.getUseravavtar />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="headerStore.logout()">退出系统</el-dropdown-item>
          <el-dropdown-item divided><a
            href="https://github.com/zzy-cl/Blog-background"
            target="_blank">代码仓库</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </el-menu>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import screenfull from "screenfull";
import { useStore } from "../../stores";

const headerStore = useStore();


// 实时时间
const clock = reactive({
  time: "",
  date: ""
});
let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//设置定时器,1秒更新
setInterval(updateTime, 1000);
updateTime();

//设置时间,及需要显示的位数
function updateTime() {
  let cd = new Date();
  clock.time = zeroPadding(cd.getHours(), 2) + ":" + zeroPadding(cd.getMinutes(), 2) + ":" + zeroPadding(cd.getSeconds(), 2);
  clock.date = zeroPadding(cd.getFullYear(), 4) + "-" + zeroPadding(cd.getMonth() + 1, 2) + "-" + zeroPadding(cd.getDate(), 2) + " " + week[cd.getDay()];

};

//为优化时钟的显示效果,(01==1)向时钟内添加0位,
function zeroPadding(num, digit) {
  let zero = "";
  for (let i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}

// 实现全屏切换
const isIcon = ref("FullScreen");
const handleFullscreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};
const changeIcon = () => {
  isIcon.value = screenfull.isFullscreen ? "Rank" : "FullScreen";
};
// 监听
onMounted(() => {
  screenfull.on("change", changeIcon);
});
onBeforeUnmount(() => {
  screenfull.off("change");
});
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu-demo {
  background-color: #bbbcde;
}

.logo {
  height: 40px;
  margin:10px 40px;

}

.avatar {
  margin: 10px 0;
  border-radius: 10px;
}

.screen {
  width: 26px;
  height: 26px;
  margin: 17px;
}

.el-icon {
  color: #44617b;
}

/* 时钟 */
p {
  margin: 0;
  padding: 0;
}

#clock {
  height: 60px;
  margin: 0 10px;
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#clock .time {
  letter-spacing: 0.1em; // 字之间的间距
  font-size: 26px;
}

#clock .date {
  letter-spacing: 0.05em;
  font-size: 14px;
}
</style>
