<template>
  <div class="info-card">
    <div class="card">
      <div class="head-wrap">
        <div class="head-cover">
          <img :src="singerInfo.cover" />
        </div>
      </div>
      <div class="head-info">
        <div class="head-top">
          <div class="head-name">{{ singerInfo.name }}</div>
          <div class="head-data">
            <span class="head-text">{{ singerInfo.musicSize }}首歌曲</span>
            <span class="head-text">{{ singerInfo.albumSize }}张专辑</span>
          </div>
        </div>
        <div class="head-bototm d-flex justify-center mt-2">
          <v-btn
            :color="subStatus ? '#737373' : 'red'"
            class="fllow-btn"
            rounded
            depressed
            small
            @click.stop="follow"
            :loading="loading"
            :disabled="loading"
            >{{ subStatus ? "已关注" : "关注" }}</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { artistSub } from "../../../network/user";
import { subArtist } from "../../../network/singer";
export default {
  name: "infoCard",
  data: () => ({
    singerId: "",
    subStatus: false,
    loading: false
  }),
  props: {
    singerInfo: {
      type: Object,
    },
  },
  created() {
    this.singerSub();
  },
  methods: {
    async singerSub() {
      if (!this.loginStatus) return;
      this.singerId = this.$route.query.id;
      const data = await artistSub(this.userInfo  .userId);
      console.log("data", data);
      const list = data.data.data;
      let isSub = list.find((item) => {
        return item.id === this.singerId;
      });
      this.subStatus = !!isSub;
    },
    async follow() {
      if (!this.loginStatus) {
        this.$emit("tips", {
          status: false,
          snackbar: true,
          errorMessage: "请先登陆",
        });
        return;
      }
      this.loading = true;
      let t = this.subStatus ? 0 : 1;
      let data = await subArtist(t, this.singerId);
      console.log("关注状态", data);
      if (data.data.code === 200) {
        this.$emit("tips", {
          status: true,
          snackbar: true,
          scesMessage: t === 1 ? "已关注" : "已取消关注",
        });
        this.subStatus = !this.subStatus;
        this.loading = false;
      } else {
        this.loading = false;
        this.$emit("tips", {
          status: false,
          snackbar: true,
          errorMessage: "出错了",
        });
      }
    },
  },
  computed: {
    ...mapState(["loginStatus", "userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.info-card {
  width: 100%;
  height: 10rem;
  .card {
    width: 90%;
    height: 100%;
    margin: -20px auto;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    .head-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      .head-cover {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-top: -2.5rem;
        display: flex;
        justify-content: center;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
    }
    .head-info {
      padding: 5px 0;
      flex-grow: 1;
      width: 100%;
      border-radius: 20px;
      .head-name {
        text-align: center;
        font-size: 5vw;
      }
      .head-data {
        text-align: center;
        .head-text {
          font-size: 10px;
          padding: 0 4px;
        }
      }
      .fllow-btn {
        color: #fff;
      }
    }
  }
}
</style>