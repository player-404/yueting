<template>
  <v-card height="20rem" class="con" ref="card" color="rgba(0,0,0, 0)" flat>
    <div class="top"><span @click="goAll">推荐歌单 >></span></div>
    <div class="slide">
      <swiper @activeName="activeName"></swiper>
    </div>
    <div class="bottom">
      <div class="titles">
        {{ name }}
      </div>
    </div>
  </v-card>
</template>

<script>
import Swiper from "../../../components/swiper.vue";
export default {
  data: () => ({
    personalized: [],
    isChecked: false,
    active: 0,
    width: 0,
    name: "",
  }),
  components: {
    Swiper,
  },
  methods: {
    activeName(data) {
      this.name = data;
    },
    goAll() {
      this.$router.push({
        name: "playList",
        query: {
          type: 1,
        },
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.con {
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    font-size: 1.2rem;
  }
  .slide {
    flex: 1;
    display: flex;
    .btn {
      width: 12rem;
      height: 12rem;
      overflow: hidden;
    }
  }
  .bottom {
    height: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .titles {
      font-weight: normal;
      font-size: 1rem;
      width: 80%;
      height: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 4rem;
      color: #fff;
    }
  }
}
</style>