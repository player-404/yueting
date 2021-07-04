<template>
  <div class="hotSinger">
    <div class="titles px-4 py-4"><span @click="goAll">热门歌手 >></span></div>
    <scroll :data="data" :round="true" :subTitle="true" :cover="false" :typeNum="7" :pathName="'singer'"/>
  </div>
</template>

<script>
import { hotSinger } from "../../../network/index";
import Scroll from "../../../components/Scroll.vue";
export default {
  data: () => ({
    data: null,
  }),
  components: { Scroll },
  mounted() {
    this.getHotSinger();
  },
  methods: {
    getHotSinger() {
      hotSinger(7).then((data) => {
        this.data = data.data.artists;
      });
    },
    goAll() {
      this.$router.push({ name: "playList", query: { type: 5 } });
    },
  },
};
</script>

<style>
</style>