<template>
  <div class="text-center">
    <v-bottom-sheet v-model="dialog.status">
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title>{{ dialog.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="px-0 pt-0">
          <list-item/>
        </v-container>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListItem from "./playBar/ListItem.vue";

export default {
  
  components: { ListItem },
  data: () => ({}),
  methods: {
    close() {
      this.$store.commit("setListView", {status: false});
    },
  },
  computed: {
    ...mapState(["listShow"]),
    dialog: {
      get() {
        return this.listShow;
      },
      set(newValue) {
        this.$store.commit("setListView", { status: newValue});
      },
    },
  },
  watch: {
     listShow:{
         deep: true,
         handler(newValue, oldValue) {
            
         }
     } 
  }
};
</script>

<style lang="less" scoped>
.bar {
  position: relative;
  z-index: 9 !important;
  opacity: 1;
  background-color: #fff;
}
</style>