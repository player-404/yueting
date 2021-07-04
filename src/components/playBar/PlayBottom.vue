<template>
  <div class="play-bottom">
    <div class="top d-flex justify-space-between px-10 pt-8">
      <div class="list" @click.stop="list">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </div>
      <div class="mark" @click.stop="love">
        <v-icon color="red" v-if="loved">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </div>
      <div class="add" @click="mark">
        <v-icon>mdi-plus</v-icon>
      </div>
    </div>
    <v-slider
      hint="Im a hint"
      :max="durationSecond"
      min="0"
      class="prograss px-4 mt-6"
      :value="second"
      @end="slideFinished"
    >
      <template v-slot:prepend>
        <div class="time">{{ currentTime }}</div>
      </template>
      <template class="time" v-slot:append>
        <div class="time">{{ totaltime }}</div>
      </template>
    </v-slider>
    <div class="bot d-flex justify-space-between px-10 pb-16">
      <div class="rand" @click.stop="sort">
        <div class="list-sort" v-if="!fmStatus">
          <v-icon v-if="!ordinal">mdi-shuffle</v-icon>
          <v-icon v-else>mdi-format-text-rotation-none</v-icon>
        </div>
      </div>
      <div class="pre" @click.stop="pre">
        <v-icon v-if="fmStatus" size="20px" class="pt-1 ml-7" @click.stop="dislike">mdi-thumb-down</v-icon>
        <v-icon v-else>mdi-skip-previous</v-icon>
      </div>
      <div class="pause" @click.stop="playControl">
        <v-icon v-if="!canPlay">mdi-play</v-icon>
        <v-icon v-else>mdi-pause</v-icon>
      </div>
      <div class="next" @click.stop="next">
        <v-icon>mdi-skip-next</v-icon>
      </div>
      <div class="circle" @click.stop="play">
        <v-icon v-if="circle">mdi-repeat</v-icon>
        <v-icon v-if="!circle">mdi-repeat-off</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

import { formatTime } from "../../utils/formatTime";

import { getMymusic } from "../../network/user";
import { playList } from "../../network/index";
import { markMusic, personalFm, trash } from "../../network/list";
export default {
  data: () => ({
    pause: true,
    circle: false,
    durationSecond: 0,
    totaltime: "",
    loved: false,
    loveListIds: null,
    loveId: null,
  }),
  async created() {
    if (this.userInfo) {
      await this.getLoveList();
    }
    this.isLove();
  },
  computed: {
    ...mapState("playBar", [
      "duration",
      "currentTime",
      "canPlay",
      "currentSecond",
    ]),
    ...mapState([
      "ordinal",
      "musicIndex",
      "randomId",
      "tracksId",
      "playSong",
      "loginStatus",
      "userInfo",
      "myMusic",
    ]),
    ...mapState("list", ["fmStatus", "fmIndex"]),
    index() {
      return this.musicIndex;
    },
    second() {
      return Math.trunc(this.currentSecond);
    },
  },
  methods: {
    ...mapActions(["setPlaymusic"]),
    ...mapMutations("playBar", ["setPlayStatus", "setSecTime", "setTips", 'setLoop']),
    ...mapMutations("playing", ["setLikeDataChange"]),
    ...mapMutations("list", ["setFmIndex"]),
    ...mapMutations(["setTracksId"]),
    play() {
      this.circle = !this.circle;
      this.setLoop(this.circle);
    },
    playControl() {
      this.setPlayStatus(!this.canPlay);
    },
    slideFinished(num) {
      this.setSecTime(num);
    },
    //播放模式
    sort() {
      const newOrdinal = !this.ordinal;
      this.$store.commit("setOriginal", newOrdinal);

      let index;
      //顺序播放
      if (newOrdinal) {
        index = this.tracksId.findIndex((item) => {
          return item.id === this.playSong.id;
        });
      } else {
        //随机播放
        index = this.randomId.findIndex((item) => {
          return item.id === this.playSong.id;
        });
      }
      this.setIndex(index);
    },
    //上一首
    pre() {
      let index = this.index - 1;
      if (index < 0) {
        //tido:
        return;
      }
      this.setIndex(index);
      this.$store.dispatch("setPlaymusic", { index });
    },
    next() {
      if (this.fmStatus) {
        console.log('不喜欢');
        this.fmMusic();
        return;
      }
      let index = this.index + 1;
      if (index > this.tracksId.length - 1) {
        // todo:
        return;
      }
      this.setIndex(index);
      this.$store.dispatch("setPlaymusic", { index });
    },
    setIndex(index) {
      this.$store.commit("setMusicIndex", { musicIndex: index });
    },
    list() {
      this.$store.commit("setListView", {
        status: true,
        name: "播放列表",
        type: 0,
      });
    },
    mark() {
      this.$store.commit("setListView", {
        status: true,
        name: "添加到歌单",
        type: 1,
      });
    },
    async love() {
      //未登陆
      if (!this.loginStatus) {
        this.setTips({ status: true, message: false, errorMsg: "请先登陆" });
        return;
      }
      //添加 / 删除 到喜欢
      let data;
      if (this.loved) {
        data = await markMusic("del", this.loveId, this.playSong.id);
        this.setLikeDataChange("del");
        this.loved = false;
      } else {
        data = await markMusic("add", this.loveId, this.playSong.id);
        this.setLikeDataChange("add");
        this.loved = true;
      }
      //消息框
      this.setTipsBar(data);
    },
    setTipsBar(data) {
      let markStatus;
      if (data.data.body.code === 200) {
        markStatus = true;
      } else {
        markStatus = false;
      }
      this.setTips({
        status: true,
        message: markStatus,
        successMsg: this.loved ? "已添加" : "已从歌单中移除",
        errorMsg: "出错了",
      });
      this.$store.commit("setListView", { status: false });
    },
    //获取喜欢的歌单数据
    async getLoveList() {
      if (!this.loginStatus) return;
      const data = await getMymusic(this.userInfo.userId);
      const listid = data.data.playlist[0].id;
      this.loveId = listid;
      const listData = await playList(listid);
      this.loveListIds = listData.data.playlist.trackIds;
    },
    isLove() {
      if (!this.loginStatus) {
        return;
      }
      const index = this.loveListIds.findIndex((item) => {
        return item.id === this.playSong.id;
      });
      this.loved = index === -1 ? false : true;
    },
    async fmMusic() {
      console.log('fm 操作');
      let index = this.fmIndex;
     
      if (this.fmIndex >= this.tracksId.length - 1) {
        await this.getPersonalFm();
        index = 0;
      } else {
        index++;
      }
       console.log('index', index);
      console.log('actions set');
      this.setFmIndex(index);
      // this.setPlaymusic({ index: index });
    },
    async getPersonalFm() {
      const data = await personalFm();
      const ids = data.data.data;
      this.setTracksId(ids);
      console.log("私人fm", this.tracksId);
    },
    async dislike() {
      let data = await trash(this.playSong.id);
      if (data.data.code === 200) {
        this.setTips({ status: true, message: true, successMsg: "不喜欢" });
        this.next();
      } else {
         this.setTips({ status: true, message: false, errorMsg: "出错了" });
      }
    }
  },
  watch: {
    currentSecond: {
      immediate: true,
      handler(newValue, oldValue) {
        this.csec = newValue;
      },
    },
    duration: {
      immediate: true,
      handler(newV, oldV) {
        this.durationSecond = Math.trunc(newV);
        const time = formatTime(this.duration);
        this.totaltime = time;
      },
    },
    playSong: {
      immediate: true,
      deep: true,
      async handler() {
        await this.getLoveList();
        this.isLove();
      },
    },
    loginStatus: {
      immediate: true,
      async handler(newv, oldv) {
        if (newv) {
          await this.getLoveList();
          this.isLove();
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.play-bottom {
  flex-grow: 0;
  width: 100%;
  .time {
    font-size: 12px;
    padding-top: 6px;
    width: 26px;
  }
}
</style> 