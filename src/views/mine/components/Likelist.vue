<template>
  <div class="like-list px-4 my-4" v-if="likeData" @click="goTo(likeData.id)">
    <div class="like-card d-flex align-center px-5">
      <div class="card-left">
        <v-icon class="like-icon">mdi-cards-heart</v-icon>
        <img :src="likeData.coverImgUrl"/>
      </div>
      <div class="card-right px-6">
        <div class="like-text">{{likeData.name}}</div>
        <div class="like-num">{{likeData.trackCount + 1}}首</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    likeData: null
  }),
  props: {
    userInfo: {
      type: Object
    }
  },
  methods: {
    // 跳转至歌单详情
    goTo(id) {
      // console.log(id);
      this.$router.push({name: 'songList', query: {id: id, type: 8}})
    }
  },
  computed: {
    ...mapState(["myMusic"]),
  },
  watch: {
    myMusic(newValue, oldValue) {
       this.likeData = newValue;
      }
  }
};
</script>

<style lang="less" scoped>
.like-list {
  width: 100%;
  height: 7rem;
  .like-card {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    .card-left {
      width: 5rem;
      height: 5rem;
      background-color: red;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .like-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
      }
    }
    .card-right {
      .like-text {
        font-size: 1rem;
      }
      .like-num {
        font-size: 0.9rem;
        color: #818181;
      }
    }
  }
}
</style>