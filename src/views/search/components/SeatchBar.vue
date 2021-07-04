<template>
  <v-menu offset-y :value="keyword" eager>
    <template v-slot:activator="{ on }">
      <v-text-field
        dense
        class="px-4 pt-4"
        prepend-inner-icon="mdi-magnify"
        v-model="keyword"
        rounded
        filled
        :solo="!!keyword"
        @keydown="keypress"
        v-on="on"
      >
      </v-text-field>
    </template>
    <div class="list">
      <v-list max-height="500">
        <div class="item" v-if="items.length > 0">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="itemClick(item.name)">{{
              item.name
            }}</v-list-item-title>
          </v-list-item>
        </div>
        <div class="text-center" v-else>无结果</div>
      </v-list>
    </div>
  </v-menu>
</template>

<script>
import { suggest } from "../../../network/search";
import { search } from "../../../network/search";
import { Bus } from "../../../utils/enentBus";
export default {
  data: () => ({
    keyword: "",
    items: [],
    data: "",
    status: false,
  }),
  methods: {
    //选择搜索建议
    itemClick(keyword) {
      this.$emit("show", true);
      this.keyword = keyword;
      setTimeout(() => {
        Bus.$emit("songsData", keyword);
      }, 20);
      //   this.search(keyword, 1);
    },
    //搜索建议
    async searchSuggest(newV) {
      if (!newV) return;
      let data = await suggest(newV);
      let result = data.data.result;
      let artists = result.artists || "";
      let songs = result.songs || "";
      let playlists = result.playlists || "";
      this.items = [];
      this.items.push(...artists, ...songs, ...playlists);
    },
    keypress(e) {
      let event = window.event || e;
      let code = event.keyCode || event.which || event.charCode;
      if (code === 13) {
        this.$emit("show", this.keyword);
        setTimeout(() => {
          Bus.$emit("songsData", this.keyword);
        }, 20);
      }
    },
  },
  computed: {},
  watch: {
    async keyword(newV, oldV) {
      if (!newV) {
        this.$emit("show", false);
      }
      this.searchSuggest(newV);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  position: relative;
  z-index: 10;
}
</style>