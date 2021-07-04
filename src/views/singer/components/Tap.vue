<template>
  <div class="tap" ref="tap">
    <tap-item :tap="taps" class="py-4" />
    <scroll-list :width="tapWidth" :taps="taps"/>
  </div>
</template>

<script>
import ScrollList from "./ScrollList.vue";
import TapItem from "../../../components/TapItem.vue";
import { mapState } from 'vuex';
export default {
  name: "tap",
  data: () => ({
    taps: ["主页", "歌曲"],
    tapWidth: 0
  }),
  mounted() {
    // this.setWidth(this.$refs.page, this.tapWidth);
  },
  components: { TapItem, ScrollList },
  methods: {
    
  },
  computed: {
    ...mapState(['currentIndex'])
  },
  watch: {
  }
};
</script>

<style lang="less" scoped>
.tap {
  width: 100%;
  height: 100%;
}
</style>