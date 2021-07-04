<template>
  <div class="play-content d-flex justify-center" @click="click">
    <!-- 封面 -->
    <transition name="fade">
      <music :data="currentItem" v-if="status" />
      <!-- 歌词 -->
      <lyric v-else v-bind="$attrs"/>
    </transition>
    <!-- 列表 -->
    <music-list />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Lyric from "./Lyric.vue";
import Music from "./Music.vue";
import MusicList from "./MusicList.vue";
export default {
  data: () => ({
    status: true,
  }),
  methods: {
    click() {
      this.status = !this.status;
    },
  },
  components: {
    MusicList,
    Music,
    Lyric,
  },
  computed: {
    ...mapState(["listShow"]),
    ...mapState('playBar', ['currentItem'])
  },
};
</script>

<style lang="less" scoped>
.play-content {
  position: relative;
  flex-grow: 1;
  .fade-leave-active {
    animation: hide 0.3s;
  }
  .fade-enter-active {
    animation: hide 0.3s reverse;
  }
  @keyframes hide {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>