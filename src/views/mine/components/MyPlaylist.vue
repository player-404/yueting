<template>
  <div class="my-playlist">
    <!-- 菜单栏 无click -->
    <tap-item
      :tap="['创建歌单', '收藏歌单']"
      class="tap-item"
      :class="{ sticky: sticky }"
    />
    <new-scroll
      class="wrapper px-2"
      :click="true"
      :scrollX="true"
      :slideOption="slideOption"
      :slide="true"
      :probeType="3"
      :eventPassthrough="'vertical'"
    >
      <!-- 底部歌单栏列表 -->
      <div class="content">
        <!-- 创建的歌单 -->
        <create-list :itemData="playId.myPlayid" v-on="$listeners" :style="currentIndex != 0 ? style: ''"/>
        <!-- 收藏的歌单 -->
        <mark-list :itemData="playId.markPlayid" v-on="$listeners" :style="currentIndex != 1 ? style: ''"/>
      </div>
    </new-scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import newScroll from "../../../components/newScroll.vue";
import TapItem from "../../../components/TapItem.vue";

import { getMymusic } from "../../../network/user";
import CreateList from "./CreateList.vue";
import MarkList from "./MarkList.vue";
export default {
  data: () => ({
    style: {
      height: 'calc(100vh - 56px - 48px)'
    },
    isRefresh: false,
    slideOption: {
      loop: false,
      threshold: 100,
      autoplay: false,
    },
    playId: {
      myPlayid: null,
      markPlayid: null,
      likeId: "",
    },
  }),
  props: {
    sticky: {
      type: Boolean,
      default: false,
    },
    //新建歌单
    addListInfo: {
      type: Object,
      default: null,
    },
    //删除歌单
    removeList: {
      type: Boolean,
      default: null,
    },
    //删除歌单的id
    delId: {
      type: Number,
    },
    type: {
      type: Number,
    },
  },
  created() {
    this.getMylist(this.userInfo);
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh();
    });
  },
  methods: {
    // scroll刷新
    refresh() {
      this.isRefresh = !this.isRefresh;
    },
    //获取我的歌单
    async getMylist(userData) {
      // console.log(userData.userId);
      const userId = userData.userId;
      let data = await getMymusic(userId);
      //返回歌单数据
      let playList = data.data.playlist;
      //我的创建歌单的
      let myId = playList.filter((item) => item.userId === userId);
      let myCreateId = myId.slice(1, myId.length - 1);
      this.playId.myPlayid = myCreateId;
      //我收藏的歌单的
      let myMarkId = playList.filter((item) => item.userId != userId);
      this.playId.markPlayid = myMarkId;
      //我喜欢的音乐的id
      let myLikeId = myId[0];
      this.$store.commit("setMyMusic", myLikeId);
    },
  },
  components: { newScroll, TapItem, CreateList, MarkList },
  computed: {
    ...mapState(['userInfo', 'currentIndex'])
  },
  watch: {
    //创建歌单后刷新视图
    addListInfo(newValue, oldValue) {
      this.playId.myPlayid.unshift(newValue);
    },
    //删除歌单后刷新视图
    removeList(newV, OldV) {
      //如果是收藏歌单删除按钮被按下 删除收藏歌单
      if (this.type === 3) {
        let index = this.playId.markPlayid.findIndex((item) => {
          return item.id === this.delId;
        });
        this.playId.markPlayid.splice(index, 1);
        return;
      }
      //创建歌单按钮被按下 删除创建的歌单
      let myPlaylist = this.playId.myPlayid;
      let index = myPlaylist.findIndex((item) => {
        return item.id === this.delId;
      });
      this.playId.myPlayid.splice(index, 1);
    },
  },
};
</script>
<style lang="less" scoped>
.my-playlist {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  .tap-item {
    padding: 10px 0;
  }
  .sticky {
    position: sticky;
    top: 56px;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    .content {
      display: inline-block;
    }
  }
}
</style>