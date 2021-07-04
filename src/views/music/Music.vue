<template>
<keep-alive>
  <v-container class="px-0 pt-0 pb-8" v-show="!normalPlay">
    <tips
      :snackbar="showStatus"
      :errorMessage="errmsg"
      :scesMessage="secmsg"
      :status="status"
      @newStatus="newStatus"
    />
    <!-- 顶部 -->
    <div class="img-container" ref="imgContainer">
      <div class="img" :style="bg" v-if="imgUrl"></div>
      <div class="top-bar px-4"></div>
      <!-- <v-app-bar app flat color="rgba(255, 255, 255, 0)" ref="appBar" class="bar">
        <v-app-bar-title color="#fff">MUSIC PLAY</v-app-bar-title>
      </v-app-bar>-->
      <slide></slide>
    </div>
    <!-- 底部 -->
    <div class="list-item">
      <!-- 新哥速递 -->
      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        ><new-song @tips="tip"
      /></v-lazy>
      <!-- 排行榜 -->
      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        ><top></top
      ></v-lazy>
      <!-- 热门歌曲 -->
      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        ><quality-songs
      /></v-lazy>
      <!-- 热门歌手 -->
      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        ><hot-songer
      /></v-lazy>
      <!-- 歌单分类 -->
      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        ><song-list
      /></v-lazy>
    </div>
  </v-container>
  </keep-alive>
</template>

<script>
import Slide from "./components/Slide";
import Top from "./components/top.vue";
import QualitySongs from "./components/QualitySongs.vue";
import NewSong from "./components/NewSong.vue";
import HotSonger from "./components/HotSonger";
import SongList from "./components/SongList.vue";
import Tips from "../../components/Tips";
import { mapState } from "vuex";
export default {
  name: 'music',
  data: () => ({
    model: 0,
    picUrl: null,
    showStatus: false,
    secmsg:null,
    errmsg: null,
    status: null
  }),
  components: {
    Slide,
    Top,
    QualitySongs,
    NewSong,
    HotSonger,
    SongList,
    Tips,
  },
  methods: {
    newStatus(status) {
      this.showStatus = status;
    },
    tip({status, msg}) {
      this.showStatus = true;
      this.status = status;
      if (status) {
        this.secmsg = msg
      } else {
        this.errmsg = msg;
      }
    },
  },
  mounted() {},
  computed: {
    ...mapState(["imgUrl", "normalPlay", "Tips"]),
    bg() {
      let pic = `center / cover no-repeat url(${this.imgUrl})`;
      return { background: pic };
    },
  },
};
</script>

<style lang="less" scoped>
.img-container {
  position: relative;
  padding-top: 48px;
  overflow: hidden;
  .img {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    transform: scale(1.7);
    filter: blur(30px);
  }
  .top-bar {
    width: 100%;
    height: 48px;
    position: fixed;
    top: 0;
    background: rgba(255, 255, 255, 0);
    z-index: 99;
    font-size: 1.4rem;
    line-height: 48px;
    color: #fff;
  }
}
.list-item {
  position: relative;
  width: 100%;
  position: relative;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
</style>