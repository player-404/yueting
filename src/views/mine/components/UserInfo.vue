<template>
  <div class="user-info px-2 pt-3 d-flex justify-space-between align-center">
    <div class="user-card py-4 px-4 d-flex">
      <div class="head-portrait" v-if="userInfo.avatarUrl">
        <img :src="userInfo.avatarUrl" />
      </div>
      <div class="user py-3 px-4">
        <div class="user-name">{{ userInfo.nickname }}</div>
        <div class="user-signature">{{ userInfo.signature }}</div>
      </div>
    </div>
    <div class="login-out pr-4">
       <v-icon @click.stop="show">mdi-login-variant</v-icon>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    userInfo: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    show() {
      this.$emit('show');
    }
  },
  components: {
    ...mapState(["userInfo"]),
  },
  watch: {
    userInfo: {
      immediate: true,
      handler(newValue, oldvalue) {
      },
    },
  },
};
</script>

<style lang="less" scoped>
.user-info {
  width: 100%;
  .user-card {
    border-radius: 10px;
    .head-portrait {
      width: 4rem;
      height: 4rem;
      background-color: red;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user {
      .user-name {
        font-size: 1rem;
        font-weight: bold;
      }
      .user-signature {
        font-size: 0.8rem;
        color: #818181;
      }
    }
  }
}
</style>