<template>
  <!-- 消息框 -->
  <v-snackbar
   v-model="showStatus"
    app
    top
    text
    :color="status ? 'green' : 'red'"
    flat
    dense
    rounded="pill"
    transition="scroll-y-transition"
    height="100px"
    timeout="1000"
     elevation="24"
    >{{ status ? scesMessage : errorMessage }}</v-snackbar
  >
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: true,
    },
    scesMessage: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    snackbar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showStatus: {
      get() {
        return this.snackbar
      },
      set(val) {
        this.$emit('newStatus', val)
      }
    }
  },
};
</script>

<style>
</style>