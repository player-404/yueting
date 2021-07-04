<template>
  <!-- <div class="wrapper" ref="wrapper"> -->
  <new-scroll
    class="wrapper"
    ref="wrapper"
    :scrollX="true"
    :probeType="3"
    :click="true"
    :eventPassthrough="'vertical'"
    :data="data"
  >
    <div class="content pl-4" ref="content">
      <slot></slot>
      <cover-view
        v-for="(item, index) in data"
        :key="index"
        :cover="cover"
        :item="item"
        :subTitle="subTitle"
        :dataType="item.coverImgUrl ? 0 : item.album ? 1 : 2"
        :round="round"
        :size="size"
        :title="title"
        :pathName="pathName"
        :typeNum="typeNum"
      />
    </div>
  </new-scroll>
  <!-- </div> -->
</template>

<script>
import CoverView from "./CoverView.vue";
import NewScroll from "./newScroll.vue";
export default {
  data: () => ({
    coverWidth: 0,
  }),
  props: {
    list: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
    subTitle: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "normal",
    },
    title: {
      type: Boolean,
      default: false,
    },
    pathName: {
      require: true,
      type: String,
    },
    typeNum: {
      type: Number,
      default: null,
    },
  },
  components: {
    CoverView,
    NewScroll,
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  .content {
    display: inline-block;
    white-space: nowrap;
  }
}
</style>