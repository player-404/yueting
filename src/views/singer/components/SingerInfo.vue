<template>
  <div class="wrap">
    <div class="infos">
      <div class="info-title">艺人百科</div>
      <div class="info-more">
        <p class="singer-name">艺人名: {{ singerInfo.name }}</p>
        <p class="singer-dec">歌手简介: {{ singerInfo.briefDesc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import newScroll from "../../../components/newScroll.vue";
import { singerInfo, singerDesc } from "../../../network/singer";
export default {
  components: { newScroll },
  data: () => ({
    singerInfo: {
      name: "",
      briefDesc: "",
    },
  }),
  props: {
    singerId: Number,
  },
  created() {
    this.getInfo(this.singerId);
  },
  methods: {
    async getInfo(id) {
      let data = await singerInfo(id);
      let datas = data.data.data.artist;
      this.singerInfo.name = datas.name;
      this.getDec(id);
    },
    async getDec(id) {
      let data = await singerDesc(id);
      // console.log("歌手描述", data);
      this.singerInfo.briefDesc = data.data.briefDesc;
      this.$emit("ready");
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  .infos {
    width: 100%;
    padding: 0 10px 10px 10px;
    .info-title {
      width: 100%;
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
      padding: 10px 0;
    }
    .singer-name {
      font-size: 0.9rem;
      margin: 0;
      padding: 0 10px 10px 10px;
    }
    .singer-dec {
      width: 100%;
      white-space: pre-wrap;
      font-size: 0.9rem;
      padding: 0 10px 10px 10px;
    }
  }
}
</style>