<template>
  <div class="play-nav">
    <v-btn icon @click="back">
      <v-icon>mdi-unfold-less-horizontal</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      // console.log(1234);
      this.$emit("setView", false);
    },
    
  },
};
</script>

<style lang="less" scoped>
.play-nav {
  width: 100%;
  padding: 20px 0 0 30px;
  flex-grow: 0;
}
</style>