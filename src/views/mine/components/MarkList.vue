<template>
  <!-- 创建的歌单 -->
  <div class="mark-list px-4">
    <div class="markList-cont">
      <!-- 顶部工具栏 -->
      <div class="tools d-flex justify-space-between px-4 pt-2">
        <div class="tool-left">
          <span>收藏歌单</span>
        </div>
      </div>
      <!-- 创建/收藏 歌单 -->
      <v-list-item v-for="(item, index) in itemData" :key="index">
        <v-list-item-avatar class="head" size="50">
          <v-img :src="item.coverImgUrl" />
        </v-list-item-avatar>
        <v-list-item-content @click="goTo(item.id)">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon class="pt-1" @click.stop="delList(item.id)">mdi-dots-vertical</v-icon>
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
    //   跳转至歌单详情页面
    goTo(id) {
      this.$router.push({name: 'songList', query: {id: id, type: 8}})
    },
    //删除收藏歌单
    delList(id) {
       this.$emit("showBotSheet", { status: true, type: 3, id: id }); //type:2 收藏歌单列表按钮按下
    }
  },
};
</script>

<style lang="less" scoped>
.mark-list {
  float: left;
  width: 98vw;
  .markList-cont {
    background-color: #fff;
    border-radius: 10px;
    .head {
      border-radius: 10px !important;
    }
  }
}
</style>