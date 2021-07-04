<template>
  <div class="play" v-if="currentItem">
    <play-control />
    <audio
      :src="musicUrl"
      ref="audio"
      @ended="AudioEnd"
      @canplay="AudioCanplay"
      @loadedmetadata="loadFinished"
      @timeupdate="timeupdate"
      preload="metadata"
      :loop="loop"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { song } from "../../network/index";

import { formatTime } from "../../utils/formatTime";
import PlayControl from "./playControl.vue";
import { personalFm } from "../../network/list";
export default {
  components: { PlayControl },
  data: () => ({
    currentItem: null,
    musicUrl: "",
    audio: "",
    currentTime: "",
    songs: null,
    //第一次进入歌单
    flag: true,
  }),
  created() {},
  mounted() {
    this.getAudioEl();
  },
  methods: {
    ...mapMutations("playBar", [
      "setCurrentItem",
      "setCurrentTime",
      "setPlayStatus",
      "setSongDuration",
      "setCurrentSecond",
    ]),
    ...mapMutations(["setTracksId"]),
    ...mapMutations("list", ["setFmIndex", 'setFmInfo']),
    ...mapActions(["setPlaymusic"]),
    playView() {
      this.setView(true);
    },

    async getItem(id) {
      let data = await song(id);
      this.currentItem = data.data.songs[0];
      //设置点击歌曲信息
      this.setCurrentItem(this.currentItem);
    },
    AudioCanplay() {
      this.setPlayStatus(true);
      this.audio.play();
    },
    getAudioEl() {
      this.audio = this.$refs.audio;
    },
    //歌曲播放完成
    AudioEnd() {
      this.getNext();
    },
    //播放完成自动播放下一首
    getNext() {
      if (this.fmStatus) {
        this.fmMusic();
        return;
      }
      let index = this.musicIndex + 1;
      //最后一首停止播放
      if (this.tracksId.length === index) {
        this.setPlayStatus(false);
        return;
      }
      //设置相关数据
      this.$store.dispatch("setPlaymusic", { index });
    },
    timeupdate() {
      let timer = this.audio.currentTime;
      this.setCurrentSecond(timer);
      const time = formatTime(timer);
      //设置vuex数据
      this.setCurrentTime(time);
    },
    // 加载完成
    loadFinished() {
      this.getAudioEl();
      const duration = this.audio.duration;
      //设置vuex数据
      this.setSongDuration(duration);
    },
    async fmMusic() {
      let index = this.fmIndex;
      console.log("fmIndex", this.fmIndex, "length", this.tracksId.length);
      if (this.fmIndex >= this.tracksId.length - 1) {
        await this.getPersonalFm();
        index = 0;
      } else {
        index += 1;
      }
      this.setFmIndex(index);
      this.setPlaymusic({ index: index });
    },
    async getPersonalFm() {
      const cookie = localStorage.getItem("MUSIC_U");
      const data = await personalFm(cookie);
      const ids = data.data.data;
      this.setTracksId(ids);
      console.log("私人fm", this.TracksId);
    },
  },
  computed: {
    ...mapState([
      "normalPlay",
      "ordinal",
      "tracksId",
      "playSong",
      "musicIndex",
    ]),
    ...mapState("playBar", ["canPlay", "setSec", "loop"]),
    ...mapState("list", ["fmStatus", "fmIndex"]),
  },
  watch: {
    //依据indexb的改变判断当前播放的歌曲
    playSong: {
      deep: true,
      handler(newValue, oldValue) {
        console.log("newValue", newValue);
        if (!newValue.url) {
          this.$emit("noUrl", false);
          return;
        }
        this.musicUrl = newValue.url;
        this.getItem(newValue.id);
      },
    },
    fmIndex(newv, oldv) {
      console.log("newv", newv);
      this.setPlaymusic({ index: newv });
      this.setFmInfo(this.tracksId[newv]);
    },
    canPlay(newV, oldV) {
      this.$nextTick(() => {
        if (newV) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      });
    },
    //快进进度条
    setSec(newV, oldV) {
      this.audio.currentTime = newV;
    },
  },
};
</script>

<style lang="less" scoped>
.play {
  .cover {
    background-color: salmon;
  }
}
</style>