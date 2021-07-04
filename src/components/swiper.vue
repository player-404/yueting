<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in result"
        :key="index"
        :v-if="result"
        :name="item.id"
        @click="goto(item.id)"
      >
        <v-img :src="item.picUrl" width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
import { personalized } from "../network/index";
export default {
  data: () => ({
    result: null,
    init: false,
  }),
  created() {
    personalized(6).then((data) => {
      this.result = data.data.result;
      this.$store.commit('activeImg', this.result[0].picUrl)
      this.$emit("activeName", this.result[0].name);
      this.$store.commit('getSwiper', this.result);
    });
  },
  mounted() {
    const _this = this;
    new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 20,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      centeredSlides: true,
      on: {
        init() {
          this.init = true;
        },
        slideChangeTransitionEnd() {
          _this.$emit("activeName", _this.result[this.activeIndex].name);
          _this.$store.commit('activeImg', _this.result[this.activeIndex].picUrl)
        },
      },
    });
  },
  methods: {
    goto(id) {
      // ''('id =>', id);
      this.$router.push({
        name: 'songList',
        query: {
          id: id,
          type: 1
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  .swiper-slide {
    width: 11.75rem;
    height: 13rem;
    border-radius: 1rem;
    overflow: hidden;
  }
}
</style>