<template>
  <div class="wrapper">
    <div class="songs">
      <div class="mark">
        <span class="mark-text mr-2">热门50</span>
      </div>
      <div class="hotSongs">
        <v-list-item
          v-for="(item, index) in songs"
          :key="index"
          class="px-0"
          ref="item"
        >
          <v-list-item-avatar class="px-0 mx-0"
            ><v-icon color="red" v-if="playIndex === index"
              >mdi-volume-medium</v-icon
            >
            <span v-else>{{ index + 1 }}</span></v-list-item-avatar
          >
          <v-list-item-content @click.stop="click(index)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <artists-inline :artists="item.ar" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { song50 } from "../../../network/singer";
import ArtistsInline from "../../../components/ArtistsInline";
import NewScroll from "../../../components/newScroll.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import GetRandom from "../../../utils/getRandom";
export default {
  data: () => ({
    songs: [],
  }),
  props: {
    singerId: Number,
  },
  created() {
    this.getSongs(this.singerId);
  },
  components: {
    ArtistsInline,
    NewScroll,
  },
  methods: {
    ...mapMutations(["setTracksId", "setRandomId"]),
    ...mapMutations("playing", ["getPlayingIndex","setLikeDataChange"]),
    ...mapActions(["setPlaymusic"]),
     isSame(ids) {
      if (this.tracksId.length != ids.length) return false;
      return this.tracksId.every((item, index) => {
        return item.id === ids[index].id;
      });
    },
    setIndex() {
      const index = this.tracksId.findIndex((item, index) => {
        return item.id === this.playSong.id;
      });
      this.getPlayingIndex(index);
    },
    async getSongs(id) {
      let data = await song50(id);
      this.songs = data.data.songs;
      this.$emit("song", this.songs);
      const rand = new GetRandom(this.songs, this.songs.length).getData();
      this.setTracksId(this.songs);
      this.setRandomId(rand);
    },
    click(index) {
      this.setPlaymusic({ index});
      this.getPlayingIndex(index);
    },
  },
  computed: {
    ...mapState('playing', ['playIndex']),
    ...mapState(['tracksId', 'playSong'])
  },
  watch: {
    songs: {
      immediate: true,
      deep: true,
      handler(newV, oldV) {
        if (!this.tracksId) return;
        let status = this.isSame(newV);
        console.log('status', status);
        if (!status) {
          this.getPlayingIndex(-1);
        } else {
          this.setIndex();
        }
      },
    },
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  .mark {
    .mark-text {
      font-size: 1rem;
    }
    .mark-icon {
      font-size: 1.2rem;
    }
  }
}
</style>