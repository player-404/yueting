<template>
  <!-- 创建的歌单 -->
  <div class="create-list px-4">
    <div class="createList-cont">
      <!-- 顶部工具栏 -->
      <div class="tools d-flex justify-space-between px-4 pt-2">
        <div class="tool-left">
          <span>创建歌单</span>
        </div>
        <div class="tool-right">
          <v-icon class="add mr-2" @click.stop="addList">mdi-plus</v-icon>
          <v-icon class="menu" @click.stop="botlist">mdi-dots-vertical</v-icon>
        </div>
      </div>
      <!-- 创建/收藏 歌单 -->
      <v-list-item v-for="(item, index) in itemData" :key="index">
        <v-list-item-avatar class="head" size="50">
          <v-img :src="item.coverImgUrl" />
        </v-list-item-avatar>
        <v-list-item-content @click.stop="goTo(item.id)">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon class="pt-1" @click.stop="itemClick(item.id)">mdi-dots-vertical</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array,
    },
  },
  methods: {
    // 跳转至歌单详情页面
    goTo(id) {
      this.$router.push({ name: "songList", query: { id: id, type: 8 } });
    },
    //创建歌单
    addList() {
      //点击弹出创建歌单对话框
      this.$emit("showDailog", { status: true });
    },
    //底部工作表
    botlist() {
      this.$emit("showBotSheet", { status: true, type: 1 }); //type:1顶部工具栏按钮按下
    },
    //歌单列表 底部工作表调出
    itemClick(id) {
      this.$emit("showBotSheet", { status: true, type: 2, id: id }); //type:2 列表按钮按下
    },
  },

};
</script>

<style lang="less" scoped>
.create-list {
  float: left;
  width: 98vw;
  .createList-cont {
    border-radius: 10px;
    background-color: #fff;
    .head {
      border-radius: 10px;
    }
  }
}
</style>