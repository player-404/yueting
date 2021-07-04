<template>
  <new-scroll
    :slide="true"
    class="wraper"
    :scrollX="true"
    :slideOption="slideOption"
    :probeType="3"
    :eventPassthrough="'vertical'"
    :click="true"
  >
    <div class="content">
      <div class="page" v-for="(item, index) in 2" :key="index">
        <singer-info :singerId="singerId" v-if="index === 0" ref="info" />
        <hot-song
          :singerId="singerId"
          v-if="index === 1"
          :style="activeIndex != index && !taller ? style : ''"
          ref="hotSong"
        />
      </div>
    </div>
  </new-scroll>
</template>
  
  <script>
import { mapState } from "vuex";
import newScroll from "../../../components/newScroll";

import HotSong from "./Hotsong";
import SingerInfo from "./SingerInfo";
export default {
  data: () => ({
    refresh: false,
    singerId: "",
    slideOption: {
      loop: false,
      threshold: 100,
      autoplay: false,
    },
    scroll: {},
    style: {
      height: "100vh",
    },
    taller: false,
    activeIndex: null
  }),
  created() {
    this.singerId = this.$route.query.id;
  },
  mounted() {
    this.height();
  },
  methods: {
    height() {
      const hostSongHeight = this.$refs.hotSong[0].$el.offsetHeight;
      if (hostSongHeight < 800) {
        this.taller = true;
        console.log('小于800');
      }
    },
  },
  components: { newScroll, HotSong, SingerInfo },
  computed: {
    ...mapState(["currentIndex"]),
  },
  watch: {
    currentIndex: {
      immediate: true,
      handler(newv, oldv) {
        console.log('index changed');
        this.activeIndex = newv;
      }
    },
    taller(newv, oldv) {
      console.log('taller', newv);
    }
  },
};
</script>

<style lang="less" scoped>
.wraper {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  .content {
    display: inline-block;
    padding-bottom: 56px;
    .page {
      display: block;
      width: 100%;
      padding: 0 20px 20px 20px;
      float: left;
      .all-songs  {
        width: 100%;
        text-align: center;
        margin: 10px 0;
      }
    }
  }
}
</style>

