<template>
  <new-scroll
    class="play-right flex-grow-1"
    ref="playRight"
    :click="true"
    :scrollY="true"
    :probeType="3"
    :pullUpLoad="true"
    @pullingUpHandler="pullUpLoad"
    @finishPullUp="setFinishPullUp"
    :data="data"
    :bounce="false"
  >
    <div class="item-content d-flex flex-wrap">
      <div
        class="play-item"
        v-for="item in data"
        :key="item.id"
        ref="list"
        @click.stop="go(item.id)"
      >
        <div class="item">
          <div class="cover">
            <img class="cover-img" :src="imgUrl(item)" />
          </div>
          <div class="item-text">{{ item.name }}</div>
        </div>
      </div>
      <div class="pulldown-wra pb-14 pt-4">
        <div class="after-tigger" v-if="!over && data.length >= 20">
          <span class="pullup-text text">加载中...</span>
        </div>
        <div v-if="over && data.length >= 20" class="text">
          ------ 加载完成 ------
        </div>
      </div>
    </div>
  </new-scroll>
</template>

<script>
import { mapState } from "vuex";
import NewScroll from "../../../components/newScroll";
import {
  personalized,
  topList,
  quailtySongs,
  newSong,
  hotSinger,
  songList,
  play,
  playList,
} from "../../../network/index";
export default {
  data: () => ({
    //精品歌单标签
    cat: {
      name: "华语",
      id: 5001,
    },
    //新歌速递标签id
    classfiy: 7,
    //缓存路径
    baseUrl: "",
    //歌手
    singerTag: 1,
    scroll: {},
    before: "",
    //下拉提示是否显示
    active: false,
    //获取的数据数量
    num: 0,
    //获取的数据
    data: [],
    //数据是否获取完毕
    over: false,
  }),
  props: {
    type: Number,
  },
  async mounted() {
    if (this.type === 6) {
      this.cat = this.tags[0];
    }
    this.getData();
  },
  computed: {
    ...mapState("list", ["tagIndex", "tags"]),
  },
  methods: {
    go(id) {
      if (this.type == 5) {
        this.$router.push({ name: "singer", query: { id: id, type: 7 } });
        return;
      }
      this.$router.push({ name: "songList", query: { id: id, type: 8 } });
    },
    pullUpLoad(_this) {
      this.pullingUpHandler(_this);
    },
    setFinishPullUp(fn) {
      this.scroll.finishPullUp = fn;
    },
    async getPersonalized() {
      this.num += 20;
      const data = await personalized(this.num);
      this.data = data.data.result;
      //判断是否还有数据
      if (this.num != this.data.length) {
        this.over = true;
      }
    },
    async getTopList() {
      const data = await topList();
      console.log("排行榜数据", data);
      this.data = data.data.list;
      this.over = true;
    },
    async getQuailtySongs() {
      const data = await quailtySongs(this.cat.name, 20, this.before);
      console.log("精品歌单", data);
      this.before = data.data.lasttime;
      this.data.push(...data.data.playlists);
      if (!data.data.more) {
        this.over = true;
      }
      return;
    },
    async getHotSinger() {
      const data = await hotSinger(8, this.num);
      console.log("热门歌手", data);
      this.data.push(...data.data.artists);
      this.num += 8;
      if (!data.data.more) {
        this.over = true;
      }
    },
    async getSongList() {
      const data = await play(this.cat.name, this.num);
      let listArr = data.data.playlists;
      console.log("歌单分类", data);
      console.log("num", this.num);
      this.data.push(...listArr);
      this.num += 20;
      if (!data.data.more) {
        this.over = true;
      }
    },
    //数据获取
    async getData() {
      //推荐歌单
      if (this.type === 1) {
        console.log("获取推荐歌单数据");
        await this.getPersonalized(this.num);
      }
      //排行榜
      if (this.type === 2) {
        console.log("获取排行榜数据");
        this.getTopList();
      }
      //精品歌单
      if (this.type === 3) {
        console.log("获取精品歌单数据");
        this.getQuailtySongs();
      }
      //热门歌手
      if (this.type === 5) {
        console.log("获取热门歌手数据");
        this.getHotSinger();
      }
      //歌单分类
      if (this.type === 6) {
        console.log("获取歌单分类数据");
        this.getSongList();
      }
    },
    imgUrl(item) {
      return this.type == 1
        ? item.picUrl
        : this.type == 2 || this.type == 6
        ? item.coverImgUrl
        : this.type == 3
        ? item.coverImgUrl
        : this.type == 4
        ? item.album.picUrl
        : this.type == 5
        ? item.img1v1Url
        : "";
    },
    //上拉刷新函数
    async pullingUpHandler() {
      console.log("over", this.over);
      this.active = true;
      if (this.over) {
        return;
      }
      await this.getData();
      this.active = false;
      this.scroll.finishPullUp();
    },
    //下拉刷新精品歌单数据
    loadQuailtySongs(newv) {
      this.data = [];
      this.over = false;
      this.before = "";
      this.cat = {
        name: this.tags[newv].name,
        id: this.tags[newv].id,
      };
      this.getQuailtySongs();
    },
    //下拉舒心歌单分类数据
    loadList(newv) {
      this.data = [];
      this.num = 0;
      this.over = false;
      this.cat = this.tags[newv];
      this.getSongList();
    },
  },
  components: {
    NewScroll,
  },
  watch: {
    tagIndex(newv, oldv) {
      this.scroll.finishPullUp();
      if (this.type === 3) {
        this.loadQuailtySongs(newv);
      }
      if (this.type === 6) {
        this.loadList(newv);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.play-right {
  position: relative;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  background-color: #fff;
  .item-content {
    .pulldown-wra {
      bottom: 0;
      width: 100%;
      padding: 10px;
      text-align: center;
      font-size: 0.9rem;
      color: #606060;
    }
    .play-item {
      box-sizing: border-box;
      position: relative;
      width: 50%;
      padding-bottom: 50%;
      height: 0;
      margin-top: 12px;
      .item {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .cover {
          margin: 0 auto;
          width: 88%;
          height: 88%;
          border-radius: 14px;
          overflow: hidden;
          &.round {
            border-radius: 50%;
          }
          .cover-img {
            width: 100%;
          }
        }
        .item-text {
          font-size: 0.9rem;
          width: 85%;
          margin: 0 auto;
          text-align: center;
          padding-top: 2px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>