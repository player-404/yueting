<template>
  <span class="artists-in-line">
    <span v-for="(ar, index) in artists" :key="ar.id">
      <router-link to="#" class="link">{{ar.name}}</router-link>
      <span v-if="index != artists.length - 1"> , </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    artists: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #606060;
  text-decoration: none;
  font-size: .7rem;
}
</style>