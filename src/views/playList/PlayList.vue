<template>
  <div class="playList">
    <app-bar :opacity="0" />
    <div class="play-cont d-flex">
      <left v-if="type != 1 && type != 2 && type != 5" :type="type"/>
      <!-- <div class="pla y-right flex-grow-1" ref="playRight"> -->
      <right :type="type"/>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Left from "./components/Left";
import Right from './components/Right'

export default {
  name: 'playList',
  data: () => ({
    //获取数据的类型
    type: 1,
  }),
  components: { AppBar, Left, Right },
  created() {
    //获取type参数
    this.type = Number(this.$route.query.type);
  },
};
</script>

<style lang="less" scoped>
.playList {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
  .play-cont {
    position: fixed;
    top: 56px;
    bottom: 0;
    width: 100%;
    overflow: hidden;

  
  }
}
</style>