<template>
  <div class="musicList" v-if="pageShow">
    <del-dailog
      :status="del"
      :type="'songList'"
      :delId="delId"
      :tracks="$route.query.id"
      @close="close"
      @code="code"
    />
    <tips
      :snackbar="tipsStatus"
      :status="statusCode === 200 ? true : false"
      :errorMessage="statusCode != 200 ? '出错了' : ''"
      :scesMessage="statusCode === 200 ? '删除成功' : ''"
      @newStatus="newStatus"
    />
    <app-bar :opacity="opacity ? 1 : 0" ref="bar" app />
    <new-scroll
      class="wrapper"
      :pullUpLoad="true"
      :bounce="false"
      :scrollY="true"
      :probeType="3"
      @pullingUpHandler="pullingUp"
      :isRefresh="refresh"
      :data="songs"
      :click="true"
      @finishPullUp="setFinishPullUp"
      :listenScroll="true"
      @scrolling="scrolling"
    >
      <div class="content">
        <div class="bg-cover d-flex justify-center align-center" ref="bg">
          <div class="bg-img" :style="bg" v-if="listInfo.picUrl"></div>
          <div class="list-info mt-8">
            <v-img :src="listInfo.picUrl" class="cover-img" />
            <div class="name mt-6">{{ listInfo.name }}</div>
          </div>
        </div>

        <!-- 预装载器 -->
        <div class="loader" v-if="this.songs.length === 0">
          <v-skeleton-loader
            type="list-item-avatar-two-line"
            v-for="(item, index) in 5"
            :key="index"
          ></v-skeleton-loader>
        </div>
        <!-- 歌曲列表 -->
        <v-list v-if="this.songs.length !== 0" class="list pt-0" flat>
          <v-list-item
            v-for="(item, index) in songs"
            :key="index"
            @click.stop="playMusic(index)"
          >
            <v-list-item-avatar class="mx-0">
              <v-icon color="red" v-if="playIndex === index"
                >mdi-volume-medium</v-icon
              >
              <span v-else>{{ index + 1 }}</span>
            </v-list-item-avatar>
            <v-list-item-content @click.stop="itemClick(index)">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="item.fee === 1" class="pr-2 vip">vip</span>
                <artists-inline :artists="item.ar" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-icon v-if="mylist">
              <v-icon @click.stop="delSong(item.id)"
                >mdi-close-circle-outline</v-icon
              >
            </v-list-item-icon> -->
          </v-list-item>
          <div class="pulldown-wra">
            <div class="after-trigger">
              <span v-if="hasSongs">------- 加载中 -------</span>
              <span v-else>------- 加载完成 -------</span>
            </div>
          </div>
        </v-list>
      </div>
    </new-scroll>
  </div>
</template>

<script>
import GetRandom from "../../utils/getRandom";

import { playList } from "../../network/index";
import { song } from "../../network/index";
import ArtistsInline from "../../components/ArtistsInline.vue";
import AppBar from "../../components/AppBar";
import DelDailog from "../../components/DelDailog";
import NewScroll from "../../components/newScroll.vue";
import { mapMutations, mapState } from "vuex";
import Tips from "../../components/Tips.vue";
export default {
  name: "songList",
  components: { ArtistsInline, AppBar, NewScroll, DelDailog, Tips },
  data: () => ({
    //歌单信息
    listInfo: {},
    height: 0,
    opacity: 0,
    //截取数据长度
    num: 0,
    hasSongs: true,
    //歌单歌曲信息
    songs: [],
    menutitle: "收藏到歌单",
    //判断当前列表是否改变
    changed: false,
    //歌单歌曲id
    trackId: "",
    refresh: false,
    pageShow: true,
    scroll: {},
    isMark: false,
    opacity: true,
    mylist: false,
    del: false,
    delId: null,
    statusCode: null,
    tipsStatus: false,
  }),
  created() {
    this.getListDetail();
  },
  mounted() {
    this.opacity = false;
    this.getHeight();
  },
  methods: {
    ...mapMutations("playing", ["getPlayingIndex", "setLikeDataChange"]),
    ...mapMutations(["setTracksId", "setRandomId"]),
    ...mapMutations("list", ["setFmStatus"]),
    newStatus(status) {
      this.tipsStatus = status;
    },
    close(status) {
      this.del = status;
    },
    async code(code) {
      this.tipsStatus = true;
      this.statusCode = code;
      if (code === 200) {
        const index = this.songs.findIndex(item => {
          return item.id === this.delId;
        })
        //列表中删除该歌曲
        this.songs.splice(index, 1);
      }
    },
    delSong(id) {
      console.log(id);
      this.delId = id;
      this.del = true;
    },
    getHeight() {
      this.barHeight = this.$refs.bar.$el.offsetHeight;
      this.bgCoverHeight = this.$refs.bg.offsetHeight;
      this.height = this.bgCoverHeight - this.barHeight;
    },
    setFinishPullUp(fn) {
      this.scroll.finishPullUp = fn;
    },
    pullingUp() {
      this.getMusicDetail();
    },
    //获取歌单详情
    async getListDetail() {
      let id = this.$route.query.id;
      let data = await playList(id);
      //设置歌曲id
      this.setSongIds(data);
      //设置歌单
      this.setListInfo(data);
    },
    //设置歌曲id
    setSongIds(data) {
      //设置顺序歌曲id
      let trackIds = data.data.playlist.trackIds;
      this.trackId = trackIds;
      //获取歌曲详细信息
      this.getMusicDetail();
    },
    //设置随机歌曲id
    setRandId(trackid) {
      let randId = new GetRandom(trackid, trackid.length).getData();
      this.$store.commit("setRandomId", randId);
    },
    setTrackIds(ids) {
      this.$store.commit("setTracksId", ids);
    },
    //设置歌单信息
    setListInfo(data) {
      console.log("data", data);
      this.$set(this.listInfo, "name", data.data.playlist.name);
      this.$set(this.listInfo, "picUrl", data.data.playlist.coverImgUrl);
      if (!this.loginStatus) return;
      if (data.data.playlist.userId === this.userInfo.userId) {
        this.mylist = true;
      } else {
        this.mylist = false;
      }
    },
    //获取歌曲详细信息
    async getMusicDetail() {
      let getIds = this.trackId.slice(this.num, (this.num += 20));
      if (getIds.length === 0) {
        this.hasSongs = false;
        return;
      }
      let data = await song(getIds);
      console.log('songs data', data);
      let songs = data.data.songs;
      this.songs.push(...songs);
      console.log('songs', this.songs);
      this.scroll.finishPullUp();
    },
    //歌单列表被点击
    async itemClick(index) {
      this.setTrackIds(this.trackId);
      this.setRandId(this.trackId);
      this.$store.dispatch("setPlaymusic", { index: index, itemClick: true });
      this.getPlayingIndex(index);
      this.setFmStatus(false);
    },
    //判断当前歌单列表与播放列表是否相等
    isSame(ids) {
      if (this.tracksId.length != ids.length) return false;
      return this.tracksId.every((item, index) => {
        return item.id === ids[index].id;
      });
    },
    setIndex() {
      const index = this.tracksId.findIndex((item, index) => {
        return item.id === this.playSong.id;
      });
      this.getPlayingIndex(index);
    },
    delMusic() {
      // console.log('删除歌曲');
      const index = this.trackId.findIndex((item) => {
        return item.id === this.playSong.id;
      });
      // console.log(index);
      this.trackId.splice(index, 1);
    },
    addMusic() {
      // console.log('添加歌曲');
      this.trackId.unshift(this.playSong);
    },
    //收藏歌单
    mark() {
      this.isMark = !this.isMark;
    },
    scrolling(pos) {
      if (Math.abs(pos.y) >= this.height) {
        this.opacity = true;
      } else {
        this.opacity = false;
      }
    },
  },
  computed: {
    ...mapState(["musicIndex", "playSong", "tracksId", "randomId", "ordinal"]),
    ...mapState("playing", ["playIndex", "likeDataChange"]),
    ...mapState(["userInfo", 'loginStatus', 'playSong']),
    bg() {
      let pic = `center / cover no-repeat url(${this.listInfo.picUrl})`;
      return { background: pic };
    },
  },
  watch: {
    trackId: {
      immediate: true,
      deep: true,
      handler(newV, oldV) {
        if (!this.tracksId) return;
        let status = this.isSame(newV);
        if (!status) {
          this.getPlayingIndex(-1);
        } else {
          this.setIndex();
        }
      },
    },
    playSong: {
      deep: true,
      handler() {
        const status = this.isSame(this.trackId);
        if (status) {
          this.setIndex();
        }
      },
    },
    likeDataChange(newV, oldv) {
      if (!newV) return;
      this.num = 0;
      this.songs = [];
      // console.log("playSong", this.playSong, this.trackId);
      if (newV === "del") {
        this.delMusic();
      } else {
        this.addMusic();
      }
      this.getMusicDetail();
      this.setLikeDataChange("");
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  .bg-cover {
    width: 100%;
    height: 25rem;
    position: relative;
    overflow: hidden;
    .bg-img {
      transform: scale(1.3);
      filter: blur(40px);
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 0;
    }
    .list-info {
      position: relative;
      width: 9.5rem;
      z-index: 1;
      .cover-img {
        margin: auto;
        border-radius: 14px;
        overflow: hidden;
      }
      .name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        font-size: 1rem;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
  .content {
    padding-bottom: 100px;
    .list {
      .vip {
        font-size: 10px;
        color: red;
      }
      .pulldown-wra {
        width: 100%;
        padding: 14px;
        .before-trigger {
          width: 100%;
          text-align: center;
        }
        .after-trigger {
          width: 100%;
          text-align: center;
          font-size: 0.9rem;
          color: #606060;
        }
      }
    }
  }
}
</style>

