<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data: () => ({
    currentPageIndex: 0,
  }),
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1,
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 列表的数据
     */
    data: {
      default: null,
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20,
    },
    // 滚动
    slide: {
      type: Boolean,
      default: false,
    },
    //滚动动画
    momentum: {
      type: Boolean,
      default: true,
    },
    //回弹动画
    bounce: {
      type: Boolean,
      default: true,
    },
    //阻止事件冒泡
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    //是否派发sldiechange事件
    slideWillChange: {
      type: Boolean,
      default: false,
    },
    scrollH: {
      type: Boolean,
      default: false,
    },
    slideOption: {
      type: Object,
    },
    //派发刷新事件
    isRefresh: {
      type: Boolean,
      default: false,
    },
    resert: {
      type: Number,
    },
    funRest: {
      type: Function,
    },
    //下拉
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    eventPassthrough: {
      type: String,
    },
    tap: {
      type: Boolean,
      default: false,
    },
    toScroll: {
      type: Boolean,
      default: false,
    },
    scrollEl: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.init();
    // }, 20);
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      if (!this.$refs.wrapper) {
        return;
      }
      console.log(this.eventPassthrough);
      //scroll初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        momentum: this.momentum,
        bounce: this.bounce,
        stopPropagation: this.stopPropagation,
        slide: this.slide ? this.slideOption : this.slide,
        pullUpLoad: this.pullUpLoad,
        eventPassthrough: this.eventPassthrough,
      });
      this.$emit("finishPullUp", this.scroll.finishPullUp);
      if (this.toScroll) {
        this.$emit("scrollBy", this.scroll.scrollBy);
      }
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on("scrollEnd", (pos) => {
          this.$emit("scroll", pos);
        });
        this.scroll.on("scroll", (pos) => {
          this.$emit("scrolling", pos);
        });
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
      //slideChange事件
      if (this.slideWillChange) {
        this.scroll.on("slideWillChange", (page) => {
          this.$emit("slideWillChange", page);
        });
      }

      if (this.slide) {
        this.scroll.on("slideWillChange", (page) => {
          // ''(page.pageX);
          this.$store.commit("setCurrentIndex", page.pageX);
        });
      }

      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUpHandler", this);
          // this.scroll.finishPullUp();
        });
      }

      if (this.scrollEl) {
        this.$emit("scrollToElement", this.scrollToElement);
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    pullingUpHandler() {
      this.scroll && this.scroll.pullingUp.apply(this.scroll, arguments);
    },
    scrollBy() {
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments);
    },
    stop() {
      this.scroll && this.scroll.stop.apply(this.scroll);
    },
  },
  watch: {
    isRefresh: {
      immediate: true,
      handler(newValue, oldValue) {
        let timer;
        timer = setTimeout(() => {
          this.refresh();
          clearTimeout(timer);
        }, 20);
      },
    },
    data: {
      deep: true,
      handler(newv, oldv) {
        setTimeout(() => {
          this.refresh();
        }, 200);
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>