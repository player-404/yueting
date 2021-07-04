<template>
  <div class="new-song">
    <div class="titles px-4 py-4"><span>私人FM</span></div>
    <div class="cont pl-3">
      <div class="left">
        <div class="wrapper d-flex flex-row">
          <div class="cover">
            <div class="icon" v-if="!fmInfo">
              <v-icon size="4rem" color="#F2F2F2">mdi-radio</v-icon>
            </div>
            <img :src="fmInfo.album.blurPicUrl" v-else />
          </div>
          <div class="music flex-grow-1 pl-2">
            <div class="music-info py-2">
              <div class="music-name">{{ fmInfo.name || defaultMusic }}</div>
              <div class="music-singer">
                <artists-inline
                  :artists="fmInfo.artists"
                  v-if="fmInfo.artists"
                />
                <span v-else>{{ defaultSinger }}</span>
              </div>
            </div>
            <div
              class="music-control d-flex justify-space-between align-center pl-4 pt-4"
            >
              <div class="dislike">
                <v-icon @click.stop="dislike">mdi-thumb-down</v-icon>
                <v-icon v-if="false" size="20px">mdi-pause</v-icon>
              </div>
              <div class="play" @click.stop="play">
                <v-icon size="36px" v-if="!playing">mdi-play</v-icon>
                <v-icon size="36px" v-else>mdi-pause</v-icon>
              </div>
              <div class="next">
                <v-icon size="36px" @click.stop="next">mdi-skip-next</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { personalFm, trash } from "../../../network/list";
import Scroll from "../../../components/Scroll.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import ArtistsInline from "../../../components/ArtistsInline.vue";
export default {
  components: { Scroll, ArtistsInline },
  data: () => ({
    songs: null,
    defaultMusic: "私人FM",
    defaultSinger: "for you",
    pic: null,
    playing: false,
  }),
  methods: {
    ...mapMutations(["setTracksId"]),
    ...mapMutations("list", ["setFmInfo", "setFmIndex", "setFmStatus"]),
    ...mapMutations("playBar", ["setPlayStatus", "setTips"]),
    ...mapActions(["setPlaymusic"]),
    //获取数据
    async getPersonalFm(cookie) {
      const data = await personalFm(cookie);
      const ids = data.data.data;
      this.setTracksId(ids);
      console.log("私人fm", this.TracksId);
    },
    goAll() {
      this.$router.push({ name: "playList", query: { type: 4 } });
    },
    //播放
    async play() {
      if (!this.loginStatus) {
        this.$emit("tips", { status: false, msg: "请先登陆哦～" });
        return;
      }
      this.playing = !this.playing;
      if (!this.fmInfo || !this.fmStatus) {
        await this.getPersonalFm();
        this.setPlaymusic({ index: 0 });
        this.setFmInfo(this.tracksId[0]);
        this.setFmStatus(true);
        return;
      }
      this.setPlayStatus(this.playing);
    },
    //下一首
    async next() {
      if (!this.loginStatus) {
       this.$emit("tips", { status: false, msg: "请先登陆哦~" });
        return;
      }
      let index = this.fmIndex;
      if (!this.fmStatus) {
        await this.getPersonalFm();
        this.setFmIndex(0);
        this.setPlaymusic({ index: 0 });
        this.setFmStatus(true);
        this.return;
      }
      if (this.fmIndex >= this.tracksId.length - 1) {
        await this.getPersonalFm();
        index = 0;
      } else {
        index += 1;
      }
      this.setFmIndex(index);
    },
    //不喜欢
    async dislike() {
      if (!this.fmStatus) {
        this.$emit("tips", { status: false, msg: "不在fm模式" });
        return;
      }
      if (!this.canPlay) {
        this.$emit("tips", { status: false, msg: "没有正在播放的歌曲" });
        return;
      }
      if (!this.loginStatus) {
        this.$emit("tips", { status: false, msg: "请先登陆哦~" });
        return;
      }
      let data = await trash(this.playSong.id);
      console.log("dislike result", data);
      if (data.data.code === 200) {
        this.next();
        this.$emit("tips", { status: true, msg: "不喜欢" });
      } else {
        this.$emit("tips", { status: false, msg: "出错了" });
      }
    },
  },
  computed: {
    ...mapState(["loginStatus", "musciIndex", "tracksId", "playSong"]),
    ...mapState("list", ["fmInfo", "fmIndex", "fmStatus"]),
    ...mapState("playBar", ["canPlay"]),
  },
  watch: {
    fmStatus(newv, oldv) {
      if (!newv) {
        console.log("fm", newv);
        this.playing = newv;
      }
    },
    canPlay: {
      immediate: true,
      handler(newv, oldv) {
        if (this.fmStatus) {
          this.playing = newv;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
  height: 8.5rem;
  width: 100%;
  .left {
    background-color: #f2f2f2;
    border-radius: 14px;
    overflow-x: auto;
    height: 100%;
    .wrapper {
      height: inherit;
      .cover {
        height: 100%;
        width: 8.5rem;
        background-color: #323232;
        border-radius: 14px;
        flex-shrink: 0;
        overflow: hidden;
        img {
          width: 100%;
        }
        .icon {
          width: 100%;
          height: 100%;
          font-size: 3rem;
          font-weight: bold;
          color: #fff;
          text-align: center;
          line-height: 8.5rem;
        }
      }
      .music {
        height: inherit;
        .music-info {
          width: 10rem;
          text-align: center;
          .music-name {
            font-size: 1.2rem;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .music-singer {
            font-size: 1rem;
            color: #565656;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .music-control {
          width: 10rem;
        }
      }
    }
  }
}
</style>