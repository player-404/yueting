<template>
  <div class="tap-item">
    <div
      class="home-page px-2"
      v-for="(item, index) in tap"
      :key="index"
      ref="item"
    >
      <span
        class="text"
        :class="{ active: index === activeIndex }"
        >{{ item }}</span
      >
      <span
        class="border"
        v-show="index === 0"
        ref="border"
        :name="index"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    taps: null,
    itemWidth: 0,
    activeIndex: 0,
  }),
  props: {
    tap: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.itemWidth = this.$refs.item[0].offsetWidth;
  },
  methods: {
    tapChange(index) {
      const border = this.$refs.border[0];
      const distanceX = index * this.itemWidth;
      border.style.transform = `translateX(${distanceX}px)`;
      border.style.transition = "all .3s ease";
    }
  },
  computed: {
      ...mapState(["currentIndex"])
  },
  watch: {
      currentIndex(newValue, oldValue) {
        this.tapChange(newValue);
        this.activeIndex = newValue;
      }
  }
};
</script>

<style lang="less" scoped>
.tap-item {
  position: sticky;
  top: 56px;
  display: flex;
  justify-content: center;
  z-index: 4;
  background-color: #EFEFEF;
  .home-page {
    box-sizing: border-box;
    font-size: 0;
    .text {
      font-size: 1rem;
      overflow: hidden;
      color: #818181;
      &.active {
        color: #000;
      }
    }
    .border {
      display: inline-block;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: red;
      position: relative;
    }
  }
}
</style>