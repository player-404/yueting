<template>
  <v-bottom-sheet fullscreen :value="normalPlay">
    <!-- <v-snackbar v-model="status" timeout="1000" top rounde="pill" >{{tipsBar.message ? '收藏成功' : '出错啦'}}</v-snackbar> -->
    <tips :status="tipsBar.message" :scesMessage="tipsBar.successMsg" :errorMessage="tipsBar.errorMsg" :snackbar="tipsBar.status" @newStatus="setNewStatus"/>
    <v-sheet height="100%" width="100%">
      <!-- 播放界面 -->
      <div class="normal-play">
        <!-- 播放页面导航 -->
        <play-nav @setView="setView" />
        <!-- 播放页面主体内容 -->
        <play-content/>
        <!-- 播放页面底部 -->
        <play-bottom/>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import PlayContent from "./playContent";
import PlayNav from "../PlayNav.vue";
import PlayBottom from "./PlayBottom.vue";
import { mapMutations, mapState } from 'vuex';
import Tips from '../Tips.vue';
export default {
  data: () => ({
      currentItem: '',
      lyricStr: '',
      lyricIndex: '',
      canPlay:'',
      duration:'',
      currentTime: '',
      durationSecond: '',
      currentSecond: '',
  }),
  methods: {
    ...mapMutations('playBar', ['setTips']),
    setView(status) {
      this.$store.commit("setNormalPlay", status);
    },
    playControl() {},
    setNewStatus(status) {
      this.setTips({status: status})
    }
  },
  computed: {
      ...mapState(['normalPlay']),
      ...mapState('playBar', ['tipsBar']),
  },
  components: {
    PlayContent,
    PlayNav,
    PlayBottom,
    Tips,
  },
};
</script>

<style lang="less" scoped>
.normal-play {
  height: 100%;
  width: 100%;
  z-index: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-content: space-around;
}
</style>