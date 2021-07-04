<template>
  <div class="singer">
    <tips
      :status="tipValue.status"
      :scesMessage="tipValue.scesMessage"
      :errorMessage="tipValue.errorMessage"
      :snackbar="tipValue.snackbar"
      @newStatus="newStatus"
    />
    <!-- 导航栏 -->
    <app-bar :singerName="singerName" :opacity="opacity" />
    <div class="wrappers">
      <div class="contents">
        <div class="singer-cover" ref="cover">
          <img :src="singerInfo.cover" />
        </div>
        <infocard :singerInfo="singerInfo" ref="card" @tips="tips" />
        <tap :tap="['主页', '歌曲']" />
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar.vue";
import NewScroll from "../../components/newScroll.vue";
import Tap from "./components/Tap";

import { singerInfo } from "../../network/singer";
import Infocard from "./components/Infocard.vue";
import Tips from "../../components/Tips.vue";

export default {
  name: 'singer',
  data: () => ({
    singerInfo: {},
    id: null,
    singerName: "",
    scrollStatus: false,
    height: 0,
    refresh: true,
    scroll: {},
    opacity: 0,
    tipValue: {
      status: false,
      scesMessage: "",
      errorMessage: "",
      snackbar: false,
    },
  }),
  created() {
    //歌手id
    this.id = this.$route.query.id;
    //歌手详情
    this.getSingerInfo();
  },
  mounted() {
    this.getHeight();
    window.addEventListener("scroll", this.scrolling, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrolling, true);
  },
  methods: {
    tips({ status, snackbar, errorMessage = "", scesMessage = "" }) {
      console.log('status', snackbar);
      this.tipValue.status = status;
      this.tipValue.snackbar = snackbar;
      this.tipValue.errorMessage = errorMessage;
      this.tipValue.scesMessage = scesMessage;
    },
    newStatus(status) {
    console.log('status', status);
      this.tipValue.snackbar = status;
    },
    scrolling(event) {
      if (event.target.scrollTop > 100) {
        this.opacity = 1;
      } else {
        this.opacity = 0;
      }
    },
    getHeight() {
      const coverHeight = this.$refs.cover.offsetHeight;
      const cardHeight = this.$refs.card.$el.offsetHeight;
      const height = coverHeight + cardHeight - 56;
      this.height = height;
    },
    async getSingerInfo() {
      let d = await singerInfo(this.id);
      console.log('歌手信息', d);
      this.singerInfo = d.data.data.artist;
      this.singerName = this.singerInfo.name;
      // ''("歌手信息 =>", this.singerInfo);
    },
  },
  components: { AppBar, NewScroll, Infocard, Tap, Tips },
  computed: {},
};
</script>

<style lang="less" scoped>
.wrappers {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  overflow-y: auto;
  .contents {
    width: 100vw;
    .singer-cover {
      position: relative;
      z-index: -1;
      width: 100%;
      height: 40vh;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>