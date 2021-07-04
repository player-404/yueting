<template>
  <div class="songList">
    <div class="titles px-4 py-4"><span @click="goTo()">歌单分类 >></span></div>
    <scroll :data="data" :size="'small'" :title="true" :pathName="'playList'" :typeNum="6"/>
  </div>
</template>

<script>
import { songList } from "../../../network/index";
import Scroll from "../../../components/Scroll.vue";
export default {
  components: { Scroll },
  data: () => ({
    data: null,
    bg: [
      require("@/assets/bg1.jpeg"),
      require("@/assets/bg2.jpeg"),
      require("@/assets/bg3.jpeg"),
      require("@/assets/bg4.jpeg"),
    ],
  }),
  methods: {
    async getSongList() {
      const data = await songList();
      if (!localStorage.getItem("/playList/songList")) {
        //设置歌单分类标签
        this.setSub(data);
      }
      //获取展示的是个标签
      this.getSub();
    },
    goTo() {
      this.$router.push({ name: "playList", query: { type: 6 } });
    },
    setSub(data) {
      localStorage.setItem("/playList/songList", JSON.stringify(data.data.sub));
    },
    getSub() {
      this.data = JSON.parse(localStorage.getItem("/playList/songList")).slice(
        0,
        10
      );
      this.data.forEach((item) => {
        const index = Math.floor(Math.random() * 4);
        const pic = this.bg[index];
        item.picUrl = pic;
      });
    },
  },
  mounted() {
    this.getSongList();
  },
  computed: {},
  watch: {},
};
</script>

<style>
</style>