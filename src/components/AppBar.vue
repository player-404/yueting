<template>
  <v-app-bar flat class="bar" :color="`rgba(255, 255, 255, ${opacity})`">
    <v-app-bar-nav-icon>
      <v-icon color="#212121" @click.stop="back">mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <span class="titles" v-if="typeNum">
      {{ text() }}
    </span>
    <v-spacer></v-spacer>
    <div class="mark" v-if="$route.path === '/songList'">
      <v-icon color="#212121" v-if="marked">mdi-heart</v-icon>
      <v-icon color="#212121" v-else>mdi-heart-outline</v-icon>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { getMymusic } from "../network/user";
import { markLlst } from "../network/list";
export default {
  data: () => ({
    type: [
      {
        num: 1,
        title: "推荐歌单",
      },
      {
        num: 2,
        title: "排行榜",
      },
      {
        num: 3,
        title: "精品歌单",
      },
      {
        num: 4,
        title: "新歌速递",
      },
      {
        num: 5,
        title: "热门歌手",
      },
      {
        num: 6,
        title: "歌单分类",
      },
      {
        num: 7,
      },
      {
        num: 8,
        title: "歌单详情",
      },
    ],
    typeNum: null,
    path: "",
    marked: false,
  }),
  props: {
    opacity: {
      require: true,
      type: Number,
      default: 0,
    },
    singerName: {
      type: String,
    },
  },
  created() {
    this.typeNum = this.$route.query.type;
    console.log('typenum', this.typeNum);
    this.isMark();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    text() {
      const item = this.type.find((item) => {
        // console.log(item, this.typeNum)
        return this.typeNum == item.num;
      });
      console.log("item =>", item);
      if (item.num === 7) {
        return this.singerName;
      }
      return item.title;
    },
    //判断是否收藏
    async isMark() {
      if (!this.$route.path === "/songList" || !this.loginStatus) return;
      let data = await getMymusic(this.userInfo.userId);
      const list = data.data.playlist;
      let id = this.$route.query.id;
      let index = list.findIndex((item) => {
        return item.id === id;
      });
      this.marked = index === -1 ? false : true;
    },
  },
  computed: {
    ...mapState(["loginStatus", "userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.bar {
  z-index: 1;
  .titles {
    color: #212121;
  }
}
</style>