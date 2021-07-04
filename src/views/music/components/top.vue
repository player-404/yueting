<template>
  <div class="top">
    <div class="titles px-4 py-4"><span @click="goAll">排行榜 >></span></div>
    <scroll
      :list="list"
      :firstViewWidth="firstViewWidth"
      :data="otherList"
      :pathName="'songList'"
      :typeNum="2"
    >
      <div class="first-view mr-4" ref="firstView" @click="goTo">
        <div class="left">
          <v-overlay absolute class="over-view"> 24Hits </v-overlay>
          <div class="icon-view" v-for="(item, index) in hotSong" :key="index">
            <v-img :src="item.al.picUrl" lazy-src="@/assets/bg1.jpeg">
              <template v-slot:placeholder v-show="!size == 'small'">
                <!-- <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row> -->
              </template>
            </v-img>
          </div>
        </div>
        <div class="right">
          <div class="item-cont px-4" v-for="item in songs" :key="item.id">
            <div class="item-title text-nowarp pt-1">{{ item.name }}</div>
            <div class="item-subtitle text-nowarp">{{ item.ar[0].name }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { topList, playList, song } from "../../../network/index";
import CoverView from "../../../components/CoverView.vue";
import Scroll from "../../../components/Scroll.vue";
export default {
  data: () => ({
    //飙升榜
    list: null,
    //其他榜单
    otherList: [],
    //推荐歌单
    randSong: [],
    hotSong: [],
    length: null,
    firstViewWidth: null,
    coverWidth: null,
    id: null,
  }),
  components: {
    CoverView,
    Scroll,
  },
  created() {
    topList().then((data) => {
      this.otherList = data.data.list.splice(1, data.data.list.length - 1);
      this.length = this.otherList.length;
      // ''('legth =>', this.length);
      //榜单
      this.id = data.data.list[0].id;
      playList(this.id).then((data) => {
        this.list = data.data.privileges;
        this.interval();
      });
    });
  },
  mounted() {
    this.firstViewWidth = this.$refs.firstView.offsetWidth + 32;
  },
  methods: {
    random() {
      //随机获取四个不重复的歌曲
      this.randSong = [];
      for (let i = 0; i < 4; i++) {
        const rand = Math.floor(Math.random() * this.list.length);
        if (this.randSong.length == 0) {
          this.randSong.push(this.list[rand].id);
        } else {
          const flag = this.randSong.find((item, index, arr) => {
            return item.id == this.list[rand].id;
          });
          flag ? i-- : this.randSong.push(this.list[rand].id);
        }
      }
      // ''("随机歌曲 =>", this.randSong);
      // 随机歌曲详情
      song(this.randSong).then((data) => {
        // ''("data =>", data);
        this.hotSong = data.data.songs;
        // ''("歌曲详情 =>", this.hotSong);
      });
    },
    interval() {
      const random = () => {
        // ''("函数被执行");
        this.random();
      };

      const setInterValImmediately = (fun, time) => {
        fun();
        return setInterval(fun, time);
      };

      timer && clearInterval(timer);
      const timer = setInterValImmediately(random, 200000000);
    },
    goAll() {
      this.$router.push({ name: "playList", query: { type: 2 } });
    },
    goTo() {
      this.$router.push({ name: "songList", query: { id: this.id } });
    },
  },
  computed: {
    songs() {
      // ''("songs =>", this.hotSong.slice(0, 3));
      return this.hotSong.slice(0, 3);
      
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  .first-view {
    display: inline-block;
    background-color: #f2f2f2;
    width: 18rem;
    height: 100%;

    border-radius: 14px;
    .left {
      float: left;
      position: relative;
      width: 8.5rem;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      border-radius: 14px;
      overflow: hidden;
      z-index: 1 !important;
      .over-view {
        font-size: 1.2rem;
        font-weight: bold;
      }
      .icon-view {
        width: 4.24rem;
        height: 4.24rem;
        background-color: aliceblue;
      }
    }
    .right {
      float: left;
      flex-grow: 1;
      .item-cont {
        width: 100%;
        .item-title {
          width: 6.26rem;
          font-size: 0.9rem;
          color: #000;
          //多余的重复的代码
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-subtitle {
          width: 100px;
          font-size: 0.8rem;
          color: #565656;
          //多余重复的代码
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>