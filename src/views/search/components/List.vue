<template>
  <v-list :two-line="twoline">
    <v-list-item class="box" v-for="(item, index) in data" :key="index">
      <!-- index -->
      <v-list-item-icon class="mr-2" v-if="typeNum === 1">{{
        index + 1
      }}</v-list-item-icon>

      <!-- cover -->
      <v-list-item-avatar
        class="cover"
        v-if="typeNum !== 1"
        size="50"
        :rounded="typeNum === 1000 ? 'lg' : 'circle'"
      >
        <img :src="typeNum === 1000 ? item.coverImgUrl : item.img1v1Url" />
      </v-list-item-avatar>

      <v-list-item-content @click="goTo(item.id)">
        <!-- 名称 -->
        <v-list-item-title>{{ item.name }}</v-list-item-title>

        <!-- 歌手名 -->
        <v-list-item-subtitle v-if="typeNum === 1">
          <artists-inline :artists="item.artists" />
        </v-list-item-subtitle>

        <!-- 歌单创建者昵称 -->
        <v-list-item-subtitle v-if="typeNum === 1000">
          <span>&nbsp;by&nbsp;{{ item.creator.nickname }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <!-- 关注按钮 -->
      <v-list-item-action v-if="typeNum === 100">
          <flow-btn :status="item.followed" :id="item.id"/>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapMutations } from 'vuex';
import ArtistsInline from "../../../components/ArtistsInline.vue";
import FlowBtn from './FlowBtn.vue';
export default {
    data: () => ({

    }),
  props: {
    data: {
      type: Array,
      default: [],
    },
    typeNum: {
      type: Number,
      default: 1,
    },
    twoline: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations('list', ['setFmStatus']),
    goTo(id) {
      //单曲
      if (this.typeNum === 1) {
        // ''("歌曲id", id);
        let songs = [];
        songs.push({ id: id });
        this.$store.commit("setRandomId", songs);
        this.$store.commit("setTracksId", songs);
        this.$store.dispatch("listMusic", 0);
         this.setFmStatus(false);
      }
      //歌单
      if (this.typeNum === 1000) {
        // ''("歌单id", id);
        this.$router.push({ name: "songList", query: { id: id, type: 8 } });
      }
      //歌手
      if (this.typeNum === 100) {
        // ''("歌手id", id);
        this.$router.push({ name: "singer", query: {id, id}});
      }
    },
  },
  components: {
    ArtistsInline,
    FlowBtn,
  },
};
</script>

<style lang="less" scoped>
.cover {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>