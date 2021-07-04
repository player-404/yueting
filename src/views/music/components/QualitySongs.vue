<template>
  <div class="quality-songs">
    <div class="titles px-4 py-4"><span @click="goAll">精品歌单 >></span></div>
    <scroll :data="highQuality" :subTitle="true" :pathName="'songList'" :typeNum="3"></scroll>
  </div>
</template>

<script>
import CoverView from "../../../components/CoverView.vue";
import Scroll from "../../../components/Scroll.vue";
import { quailtySongsTag } from "../../../network/index";
import { quailtySongs } from "../../../network/index";
export default {
  data: () => ({
    //精品歌单标签
    tag: null,
    //精品歌单······
    highQuality: null,
  }),
  components: { Scroll, CoverView },
  mounted() {
    //   this.getSongsTag();
    this.getQualitySongs();
  },
  methods: {
    getSongsTag() {
      quailtySongsTag().then((data) => {
        // console.log("精品歌单标签 =>", data);
        this.tag = data.data.tags;
      });
    },
    getQualitySongs() {
      quailtySongs(7).then((data) => {
        this.highQuality = data.data.playlists;
        console.log("精品歌单 =>", this.highQuality);
      });
    },
    goAll() {
      this.$router.push({name: 'playList', query: {type: 3}})
    }
  },
  watch: {
    tag() {},
  },
};
</script>

    
<style lang="less" scoped>
</style>