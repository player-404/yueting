<template>
  <div class="music mt-16">
    <div class="cover">
      <v-img :src="data.al.picUrl" />
    </div>
    <div class="name">
      <div class="music-name pt-4" v-html="data.name"></div>
      <div class="singer-name">
        <artists-inline :artists="data.ar" />
      </div>
    </div>
  </div>
</template>

<script>
import ArtistsInline from "../ArtistsInline.vue";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    ArtistsInline,
  },
};
</script>

<style lang="less" scoped>
.music {
  width: 12rem;
  height: 12rem;
  .cover {
    border-radius: 14px;
    overflow: hidden;
  }
  .name {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .music-name {
      font-size: 1.2rem;
      color: #000;
    }
  }
}
</style>