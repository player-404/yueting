<template>
  <v-app>
    <tips :snackbar="url" :status="false" :errorMessage="'无版权'" @newStatus="newStatus"/>
    <!-- 主体 -->
    <v-main>
      <keep-alive :include="include">
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </v-main>
    <!-- 底部 -->
    <div class="bot">
      <play-bar class="play-nav" @noUrl="noUrl"/>
      <v-bottom-navigation
        v-if="
          $route.path === '/' ||
          $route.path === '/mine' ||
          $route.path === '/search'
        "
        grow
        color="blue lighten-1"
        v-model="value"
        class="elevation-0"
      >
        <v-btn v-for="(item, index) in footer" :key="index" plain>
          <span>{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <play-view />
    </div>
  </v-app>
</template>

<script>
import PlayBar from "./components/playBar/PlayBar.vue";
import PlayView from "./components/playBar/playView.vue";

import Cookies from "js-cookie";

import { account } from "./network/user";
import { mapState } from "vuex";
import Tips from './components/Tips.vue';
export default {
  name: "App",
  data: () => ({
    url: null,
    footer: [
      {
        title: "我的音乐",
        icon: "mdi-music-box",
        name: "mine",
      },
      {
        title: "音乐馆",
        icon: "mdi-google-assistant",
        name: "music",
      },
      {
        title: "搜索",
        icon: "mdi-magnify",
        name: "search",
      },
    ],
    include: [],
    value: 1,
    path: "",
  }),
  created() {
    this.isLogin();
  },
  methods: {
    newStatus(status) {
      this.url = status;
    },
    noUrl(status) {
      console.log('no url');
      this.url = true;
    },
    async isLogin() {
      const status = Cookies.get("MUSIC_U") ? true : false;
      if (status) {
        let data = await account();
        this.$store.commit("setUserInfo", data.data.profile);
      }
      this.$store.commit("setLoginStatus", status);
    },
  },
  components: { PlayBar, PlayView, Tips },
  computed: {
    ...mapState(["loginStatus"]),
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("status", this.loginStatus);
        if (newValue === 0) {
          this.loginStatus
            ? this.$router.push({ name: "mine" })
            : this.$router.push({ name: "login" });
        }
        if (newValue === 1) {
          this.$router.push({ name: "music" });
        }
        if (newValue === 2) {
          this.$router.push({ name: "search" });
        }
      },
    },
    $route(to, from) {
      const index = this.footer.findIndex(item => {
        return item.name === to.name
      })
      if (index > -1) {
        this.value = index;
      }
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      if (from.meta.keepAlive && from.meta.deep > to.meta.deep) {
        const index = this.include.indexOf(from.name);
        index != -1 && this.include.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
html,
body {
  font-size: 16px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hi;
}
.bot {
  position: fixed;
  width: 100%;
  bottom: 0px;
  z-index: 4;
  .play-nav {
    width: 100%;
  }
}
</style>
