<template>
  <div class="lyric d-flex justify-center" ref="lyric">
    <new-scroll
      class="wrap"
      :scrollY="true"
      :click="true"
      @scrollToElement="scrollToElement"
      :scrollEl="true"
      :data="lyrics"
      :isRefresh="refresh"
    >
      <div class="content" v-if="hasLyric">
        <p
          class="item"
          v-for="(item, index) in lyrics"
          :key="index"
          :class="{ active: currentIndex === index }"
          ref="line"
        >
          <span ref="son">{{ item.text }}</span>
        </p>
      </div>
      <div class="tips d-flex justify-center align-center" v-if="!hasLyric">
        纯音乐，请欣赏
      </div>
    </new-scroll>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { lyric } from "../../network/singer";
import { lyricpaser } from "../../utils/lyricpaser";
import newScroll from "../newScroll.vue";
export default {
  data: () => ({
    hasLyric: true,
    lyrics: [],
    scroll: "",
    currentIndex: 0,
    scrollHeight: 0,
    offsetY: 0,
    refresh: true,
  }),
  mounted() {
    this.getOffsetY();
  },
  methods: {
    scrollToElement(fn) {
      this.scroll = fn;
    },
    //获取歌词数据
    async getLyric(id) {
      const data = await lyric(id);
      let lyricStr = data.data.nolyric ? [] : data.data.lrc.lyric;
      if (lyricStr.length === 0) {
        this.hasLyric = false;
        return;
      }
      this.hasLyric = true;
      lyricStr = lyricpaser(lyricStr);
      this.lyrics = lyricStr;
      console.log("lyric", this.lyrics);
    },
    getOffsetY() {
      const offsetY = this.$refs.lyric.offsetHeight / 2 + 40;
      this.offsetY = offsetY;
    },
  },
  computed: {
    ...mapState("playBar", ["currentItem", "currentSecond"]),
    ...mapState(["playSong", "normalPlay"]),
  },
  components: { newScroll },
  watch: {
    //获取歌词
    currentItem: {
      immediate: true,
      handler(newv, oldv) {
        this.getLyric(newv.id);
      },
    },
    //时间匹配歌词
    currentSecond: {
      immediate: true,
      handler(newv, oldv) {
        let sec = Math.trunc(newv * 1000);
        let index = this.lyrics.findIndex((item) => {
          return item.time > sec;
        });
        if (index === -1) {
          index = this.lyrics.length;
        }
        this.currentIndex = index - 1;
      },
    },
    currentIndex(newv, oldv) {
      newv < 0 ? (newv = 0) : newv;
      this.scroll(this.$refs.line[newv], 600, 0, -this.offsetY);
    },
    normalPlay() {
      this.refresh = !this.refresh;
    },
  },
};
</script>

<style lang="less" scoped>
@height: 100%;
@paddingtop: @height / 2;
.lyric {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .wrap {
    width: 100%;
    height: @height;
    overflow: hidden;
    .tips {
      width: 100%;
      height: 100%;
    }
    .content {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      padding-top: @paddingtop;
      padding-bottom: @paddingtop;
      margin-top: 100px;
      margin-bottom: 100px;
      .item {
        font-size: 1.2rem;
        font-weight: bold;
        transition: all 0.6s;
        line-height: 29px;
        white-space: normal;
        color: #b8b8b8;
        &.active {
          color: #000;
        }
      }
    }
  }
}
</style>