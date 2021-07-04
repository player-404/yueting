<template>
  <div class="list-item">
    <new-scroll
      :scrollY="true"
      :pullUpLoad="true"
      @pullingUpHandler="pullingUpHandler"
      class="wrapper"
      :isRefresh="isRefresh"
      :click="true"
      :bounce="false"
      @finishPullUp="finishPullUp"
      :data="itemData"
    >
      <div class="content" v-if="listShow.type === 0">
        <v-list-item v-for="(item, index) in itemData" :key="index">
          <v-list-item-avatar>
            <v-icon v-if="index === currentIndex" color="red"
              >mdi-volume-medium</v-icon
            >
            <span v-else>{{ index + 1 }}</span>
          </v-list-item-avatar>
          <v-list-item-content @click.stop="itemClick(index)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-subtitle class="text-center">{{ tips }}</v-card-subtitle>
      </div>
      <div class="content" v-else>
        <v-list v-if="login">
          <v-list-item
            v-for="(item, index) in mylist"
            :key="index"
            @click.stop="mark(item.id)"
          >
            <v-list-item-avatar rounded="lg">
              <img :src="item.coverImgUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="tips" v-else>
          <span>尚未登陆</span>
        </div>
      </div>
    </new-scroll>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { song } from "../../network/index";
import newScroll from "../newScroll.vue";
import { getMymusic, loginStatus } from "../../network/user";
import { markMusic } from "../../network/list";
export default {
  data: () => ({
    num: 0,
    itemData: [],
    isRefresh: false,
    tips: "下拉加载",
    over: false,
    currentIndex: 0,
    login: false,
    userid: "",
    mylist: [],
    itemId: [],
    scroll:{}
  }),
  mounted() {
      this.getData();
  },
  components: {
    newScroll,
  },
  methods: {
    ...mapMutations("playBar", ["setTips"]),
    async pullingUpHandler(_this) {
      this.tips = "----- 加载中... -----";
      await this.getData();
      if (this.over) return;
      this.tips = "----- 下拉加载 -----";
    },
    finishPullUp(fn) {
      this.scroll.finishPullUp = fn;
    },
    async getData() {
      this.itemId = this.tracksId;
      let ids = this.itemId.slice(this.num, (this.num += 20));
      if (ids.length == 0) {
        this.over = true;
        this.num = 0;
        this.itemId = [];
        this.tips = "----- 加载完成 -----";
        return;
      }
      let data = await song(ids);
      let items = data.data.songs;
      this.itemData.push(...items);
      this.scroll.finishPullUp();
      return Promise.resolve();
    },
    initData() {
      this.num = 0;
      this.itemId = [];
      this.itemData = [];
      this.over = false;
    },
    itemClick(index) {
      this.$store.dispatch("setPlaymusic", { index, itemClick: true });
    },
    async isLogin() {
      if (this.loginStatus) {
        this.login = true;
        this.getList(this.userInfo.userId);
      } else {
        this.login = false;
      }
    },
    async getList(uid) {
      const data = await getMymusic(uid);
      const list = data.data.playlist;
      const myList = list.filter((item) => {
        return item.userId === uid;
      });
      this.mylist = myList.slice(1, myList.length);
    },
    async mark(listid) {
      let musicid = this.playSong.id;
      let markStatus;
      let data = await markMusic("add", listid, musicid);
      if (data.data.body.code === 200) {
        markStatus = true;
      } else {
        markStatus = false;
      }
      this.setTips({
        status: true,
        message: markStatus,
        successMsg: "收藏成功",
        errorMsg: "出错了",
      });
      this.$store.commit("setListView", { status: false });
    },
  },
  computed: {
    ...mapState([
      "tracksId",
      "randomId",
      "ordinal",
      "listShow",
      "playSong",
      "loginStatus",
      "userInfo",
    ]),
  },
  watch: {
    playSong: {
      immediate: true,
      deep: true,
      handler(newv, oldv) {
        const index = this.tracksId.findIndex((item) => {
          return item.id === newv.id;
        });
        this.currentIndex = index;
      },
    },
    tracksId: {
      deep: true,
      async handler() {
        this.initData();
        await this.getData();
      },
    },
    listShow: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        if (newv) {
          this.isRefresh = !this.isRefresh;
          this.isLogin();
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.list-item {
  width: 100%;
  .wrapper {
    width: 100%;
    height: 450px;
    overflow: hidden;
    .tips {
      width: 100%;
      height: 450px;
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>