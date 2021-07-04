<template>
  <div class="search">
    <!-- 搜索栏 -->
    <seatch-bar @show="show" />
    <!-- 热搜榜 -->
    <trending v-if="!status" @show="show" />
    <!-- 搜索结果展示 -->
    <library v-else />
  </div>
</template>

<script>
import Library from "./components/Library.vue";
import SeatchBar from "./components/SeatchBar.vue";
import Trending from "./components/Trending.vue";
export default {
  data: () => ({
    name: "search",
    status: null,
  }),
  methods: {
    show(value) {
      this.status = value;
    },
  },
  components: { SeatchBar, Trending, Library },
};
</script>
<style lang="less" scoped>
.search {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
}
</style>
