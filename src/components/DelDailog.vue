<template>
  <v-dialog persistent v-model="dailog" max-width="290">
    <v-card>
      <v-card-title>{{
        type === "playlist"
          ? "确认删除此歌单？"
          : type === "login"
          ? "退出登陆？"
          : "确认删除此歌曲？"
      }}</v-card-title>
      <v-card-actions>
        <v-btn @click="cancel" depressed color="#fff">取消</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" depressed color="#fff">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { delList, loginout } from "../network/user";
import { markMusic } from "../network/list";
import Cookies from 'js-cookie'
import { mapMutations } from 'vuex';
export default {
  data: () => ({
    dailog: false,
  }),
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    delId: {
      type: Number,
    },
    type: String,
    tracks: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapMutations(['setLoginStatus']),
    cancel() {
      this.dailog = false;
    },
    //确认删除歌单
    async submit() {
      if (this.type === "playlist") {
        let data = await delList(this.delId);
        if (data.data.code === 200) {
          this.$emit("remove");
        }
        this.dailog = false;
        return;
      }
      if (this.type === "login") {
        const data = await loginout();
        if (data.data.code === 200) {
          this.delCookie();
          this.dailog =false;
          return;
        }
      }
      let data = await markMusic("del", this.tracks, this.delId);
      this.dailog = false;
      console.log("删除信息", data.data.status);
      this.$emit("code", data.data.status);
    },
    delCookie() {
      const cookieObj = Cookies.get();
      for(let key in cookieObj) {
        Cookies.set(key, '', {expires: -1})
        this.$router.push({name: 'login'})
      }
      this.setLoginStatus(false);
    }
  },
  watch: {
    status(newv, oldv) {
      if (newv) {
        this.dailog = true;
      }
    },
    dailog(newv, oldv) {
      if (!newv) {
        this.$emit("close", false);
      }
    },
  },
};
</script>

<style>
</style>