<template>
  <div>
    <v-card tile @click="click">
      <v-list dense class="py-0" rounded>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="currentItem.al.picUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentItem.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <artists-inline :artists="currentItem.ar" />
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon>
            <v-btn icon @click.stop="pre" v-if="!fmStatus">
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon @click.stop="play">
              <v-icon v-if="playing">mdi-pause</v-icon>
              <v-icon v-else>mdi-play</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon
            class="ml-0"
            :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
          >
            <v-btn icon @click.stop="next">
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import ArtistsInline from "../ArtistsInline.vue";
import { personalFm } from "../../network/list";
export default {
  data: () => ({
    playing: false,
  }),
  components: { ArtistsInline },
  methods: {
    ...mapActions(["setPlaymusic"]),
    ...mapMutations("playBar", ["setPlayStatus"]),
    ...mapMutations("list", ["setFmIndex"]),
    ...mapMutations(['setTracksId']),
    //上一首
    pre() {
      if (this.musicIndex - 1 < 0) return;
      let index = this.musicIndex - 1;
      this.setMuisc(index);
    },
    play() {
      // ''("click");
      this.playing = !this.playing;
    },
    //下一首
    next() {
      if (this.fmStatus) {
        console.log('is fmstatus');
        this.fmMusic();
        return;
      }
      if (this.tracksId.length - 1 === this.musicIndex) return;
      let index = this.musicIndex + 1;
      this.setMuisc(index);
    },
    setMuisc(index) {
      this.setPlaymusic({ index });
      this.$store.commit("setMusicIndex", { musicIndex: index });
    },
    click() {
      this.$store.commit("setNormalPlay", true);
    },
    async getPersonalFm() {
      const data = await personalFm();
      const ids = data.data.data;
      this.setTracksId(ids);
      console.log("私人fm", this.TracksId);
    },
    async fmMusic() {
      let index = this.fmIndex;
      console.log('fmindex', index);
      if (this.fmIndex >= this.tracksId.length - 1) {
        await this.getPersonalFm();
        index = 0;
      } else {
        index += 1;
      }
      this.setFmIndex(index);
      this.setPlaymusic({ index: index });
    },
  },
  computed: {
    ...mapState(["normalPlay", "musicIndex", "tracksId"]),
    ...mapState("playBar", ["canPlay", "currentItem"]),
    ...mapState("list", ["fmStatus", 'fmIndex']),
  },
  watch: {
    canPlay: {
      immediate: true,
      handler(newv, oldv) {
        // ''("1111", newv);
        this.playing = newv;
      },
    },
    playing(newv, oldv) {
      if (newv) {
        this.setPlayStatus(true);
      } else {
        this.setPlayStatus(false);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>