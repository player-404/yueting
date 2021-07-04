<template>
  <v-btn
    small
    depressed
    rounded
    outlined
    :color="followStatus ? '#EFEFEF' : 'red'"
    @click="follow()"
    >{{ followStatus ? "已关注" : "关注" }}</v-btn
  >
</template>

<script>
import { mapState } from 'vuex';
import { sub } from '../../../network/search'
export default {
  data: () => ({
    followStatus: false,
  }),
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
    },
  },
  methods: {
    async follow() {
      if (!this.loginStatus) return;
      if (this.followStatus) {
        let data = await sub(this.id, 0);
        this.followStatus = false;
      } else {
        let data = await sub(this.id, 1);
        this.followStatus = true;
      }
    },
  },
  computed: {
    ...mapState(['loginStatus'])
  },
  watch: {
    status: {
      immediate: true,
      handler(newV, oldV) {
        this.followStatus = newV;
      },
    },
  },
};
</script>

<style>
</style>