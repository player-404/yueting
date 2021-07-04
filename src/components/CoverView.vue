  <template>
  <div class="cont mr-4">
    <div
      @click.stop="go(item.id)"
      class="cover"
      ref="coverView"
      :class="{
        round: round,
        normal: size === 'normal',
        small: size == 'small',
      }"
    >
      <v-overlay :value="cover" absolute class="overlay">{{
        coverText(item)
      }}</v-overlay>
      <v-img :src="picUrl(item)" aspect-ratio="1" />
    </div>
    <div class="subTitle" v-if="subTitle">{{ item.name }}</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({}),
  props: {
    cover: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object,
      default: null,
    },
    subTitle: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: Number,
      default: 0,
    },
    round: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "normal",
    },
    title: {
      type: Boolean,
      default: false,
    },
    pathName: {
      require: true,
      type: String,
    },
    typeNum: {
      type: Number,
      default: null,
    },
  },
  mounted() {},

  methods: {
    ...mapMutations("list", ["setSelectName"]),
    picUrl(item) {
      if (this.dataType === 0) {
        // ''('0 =>', item)
        return item.coverImgUrl;
      }

      if (this.dataType === 1) {
        // ''('1 =>', item)
        return item.album.picUrl;
      }

      if (this.dataType === 2) {
        //  ''('2 =>', item.picUrl);
        return typeof item.picUrl === "String" ? item.picUrl : `${item.picUrl}`;
      }
    },
    coverText(item) {
      // ''("title =>", this.title);
      if (!this.title) return "";
      return item.name;
    },
    go() {
      if (this.typeNum === 6) {
        this.setSelectName(this.item.name);
      }
      this.$router.push({
        name: `${this.pathName}`,
        query: {
          id: this.item.id,
          type: this.typeNum || "",
        },
      });
    },
  },
  computed: {},
  watch: {
    size(newValue, oldValue) {
      ""("newValue =>", newValue);
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
  display: inline-block;
  width: 8.5rem;
  .cover {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    .v-overlay {
      z-index: 3 !important;
    }
    &.normal {
      width: 8.5rem;
      height: 8.5rem;
    }
    &.small {
      width: 8.5rem;
      height: 4rem;
    }
    &.round {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .subTitle {
    font-size: 0.9rem;
    text-indent: 0.5rem;
    height: 2rem;
    width: 100%;
    text-align: center;
    line-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>