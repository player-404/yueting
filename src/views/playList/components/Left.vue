<template>
  <div class="play-left">
    <new-scroll
      class="wrapper"
      ref="wrapper"
      :scrollY="true"
      :probeType="3"
      :toScroll="true"
      :listenScroll="true"
      @scroll="scrollEnd"
      @scrollBy="scrollBy"
      :data="tags"
      @pullingUpHandler="pullUpLoad"
    >
      <div class="content">
        <div class="box" v-for="(item, index) in tags" :key="index" ref="item">
          {{ item.name }}
        </div>
      </div>
    </new-scroll>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import NewScroll from "../../../components/newScroll";
export default {
  data: () => ({
    itemHeight: null,
    scroll: {},
    cat: {
      name: "华语",
      id: 5001,
    },
    currentIndex: null,
    scrollY: 0
  }),
  props: {
    type: Number,
  },
  components: { NewScroll },
  async mounted() {
    if (this.type === 3) {
      await this.getQualityTag();
    }
    if (this.type === 6) {
      //获取歌单分类标签数据
      await this.getSub();
      setTimeout(() => {
        this.getIndex();
      }, 500);
    }
    //选中框高度
    this.itemHeight = this.$refs.item[0].offsetHeight + 10;
  },
  methods: {
    ...mapActions("list", ["getQualityTag"]),
    ...mapMutations("list", ["setTagIndex", "setTags", "setSelectName"]),
    scrollEnd(pos) {
      this.scrollY = Math.abs(pos.y);
      this.currentIndex = Math.round(this.scrollY / this.itemHeight);
      this.setTagIndex(this.currentIndex);
    },
    //歌单分类标签
    async getSub() {
      let tags;
      //获取当前路径
      this.tbaseUrl = `${this.$route.path}/`;
      //没有本地缓存
      if (!localStorage.getItem("/playList/songList")) {
        const data = await songList();
        tags = data.data.sub;
      }
      //🈶️本第缓存
      tags = JSON.parse(localStorage.getItem("/playList/songList"));
      this.setTags(tags);
    },
    scrollBy(fn) {
      this.scroll.scrollBy = fn;
    },
    pullUpLoad(fn) {
      this.scroll.finishPullUp = fn;
    },
    //标签栏滚动
    tagScroll(newValue) {
      const scrollHeight = newValue* this.itemHeight;
      console.log('scrollHeight', scrollHeight);
      const scrollToY = scrollHeight - this.scrollY;
      console.log('scroll', scrollToY);
      this.scroll.scrollBy(0, -scrollToY, 300);
    },
    getIndex() {
      console.log("this tags", this.tags);
      if (!this.selectName) return;
      this.currentIndex = this.tags.findIndex((item) => {
        return item.name === this.selectName;
      });
      this.setSelectName("");
    },
  },
  computed: {
    ...mapState("list", ["tags", "selectName"]),
  },
  watch: {
    async currentIndex(newValue, oldValue) {
      if (isNaN(newValue)) return;
      console.log("newValue", newValue);
      this.tagScroll(newValue);
    },
  },
};
</script>

<style lang="less" scoped>
.play-left {
  width: 25%;
  height: 100%;
  position: relative;
  .wrapper {
    margin: 0 8px;
    height: 30px;
    width: calc(100% - 16px);
    border: solid 2px #58AED8;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 14px;
    .content {
      width: 100%;
      .box {
        box-sizing: border-box;
        padding: 2px 0;
        width: 100%;
        height: 30px;
        line-height: 25px;
        text-align: center;
        margin-bottom: 10px;
        font-size: 0.9rem;
      }
    }
  }
}
</style>