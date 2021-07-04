<template>
  <!-- 热搜榜 -->
  <div class="trending">
    <v-container fluid class="mb-12 d-flex flex-wrap">
      <div class="titles px-8 pb-6">热搜榜</div>
      <div
        class="item d-flex justify-center mb-10"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="wrap d-flex justify-start">
          <div class="item-num" :class="index < 9 ? 'pr-2' : 'pr-1'">
            {{ index + 1 }}
          </div>
          <div class="item-content" @click="goTo(item.searchWord)">
            {{ item.searchWord }}
          </div>
          <div class="item-icon pl-1" v-if="item.iconUrl">
            <img :src="item.iconUrl" alt="icon" />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { trending } from "../../../network/search";

import { Bus } from "../../../utils/enentBus";
export default {
  data: () => ({
    // 热搜
    data: "",
  }),
  created() {
    this.getData();
  },
  methods: {
    //获取热搜详情
    async getData() {
      let data = await trending();
      this.data = data.data.data;
    },
    goTo(keyword) {
      this.$emit("show", keyword);
      setTimeout(() => {
        Bus.$emit("songsData", keyword);
      }, 20);
    },
  },
};
</script>

<style lang="less" scoped>
.trending {
  width: 100%;
  .titles {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .item {
    width: 50%;
    .wrap {
      width: 6.5rem;
      .item-content {
        max-width: 4rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.9rem;
      }
      .item-icon {
        width: 20px;
        height: 10px;
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>