<template>
  <div class="library">
    <tap-item :tap="['单曲', '歌单', '歌手']" />
    <new-scroll
      class="wrap"
      :scrollX="true"
      :slide="true"
      :probeType="3"
      :slideOption="slideOption"
      :momentum="false"
      :bounce="false"
      :slideWillChange="true"
      @slideWillChange="slideWillChange"
      :eventPassthrough="'vertical'"
    >
      <div class="content d-flex">
        <div class="item mx-2" v-for="(value, index) in tap" :key="index">
          <!-- 单曲 -->
          <list
            :data="songsData"
            v-if="value.type === 1"
            :typeNum="value.type"
          />
          <!-- 歌单 -->
          <list
            :data="playlistData"
            v-if="value.type === 1000"
            :typeNum="value.type"
            :twoline="true"
          />
          <!-- 歌手 -->
          <list
            :data="artists"
            :typeNum="value.type"
            v-if="value.type === 100"
          />
        </div>
      </div>
    </new-scroll>
  </div>
</template>

<script>
import newScroll from "../../../components/newScroll.vue";
import TapItem from "../../../components/TapItem.vue";

import { data } from "../untils/data";

import { Bus } from "../../../utils/enentBus";

import { search } from "../../../network/search";
import List from "./List.vue";
export default {
  data: () => ({
    slideOption: {
      loop: false,
      threshold: 0.5,
      autoplay: false,
      listenFlick: false,
    },
    type: 1,
    keyword: "",
    //搜索歌曲结果
    songsData: [],
    //搜索歌单结果
    playlistData: [],
    artists: [],
  }),
  mounted() {
    this.getSongs();
  },
  methods: {
    slideWillChange(pag) {
      const type = this.tap[pag.pageX].type;
      this.type = type;
    },
    
    getSongs() {
      Bus.$on("songsData", (keyword) => {
        this.keyword = keyword;
        this.getData(keyword);
      });
    },

    //获取数据
    async getData(keyword) {
      let data = await search(keyword, this.type);
      this.setData(this.type, data);
      return data.data.result.songs;
    },

    //设置数据
    setData(type, data) {
      //单曲
      if (type === 1) {
        this.songsData = data.data.result.songs;
      }
      //歌单
      if (type === 1000) {
        this.playlistData = data.data.result.playlists;
      }
      //歌手
      if (type === 100) {
        this.artists = data.data.result.artists;
      }
    },
  },
  components: { newScroll, TapItem, List },
  computed: {
    tap() {
      return data.tap;
    },
  },
  watch: {
    //滑动获取相应数据
    async type(newV, oldV) {
      let data = await search(this.keyword, newV);
      this.setData(newV, data);
    },
  },
  destroyed() {
    Bus.$off("songsData");
  },
};
</script>

<style lang="less" scoped>
.library {
  width: 100%;
  .wrap {
    width: 100vw;
    overflow: hidden;
    .content {
      display: inline-block;
      white-space: nowrap;
    }
    .item {
      display: block;
      max-height: calc(100vh - 176px);
      overflow: auto;
      margin-bottom: 60px;
      border-radius: 8px;
      background-color: #fff;
    }
  }
}
</style>