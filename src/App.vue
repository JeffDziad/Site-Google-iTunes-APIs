<template>
    <v-app id="main">
      <app-drawer @toggleDrawerItem="toggleDrawerItem"></app-drawer>
      <v-container>
        <google-book-api v-show="apis.google_open"></google-book-api>
        <i-tunes-api v-show="apis.itunes_open"></i-tunes-api>
      </v-container>
    </v-app>
</template>

<script>
import AppDrawer from "./components/common/AppDrawer.vue";
import GoogleBookApi from "./components/GoogleApi/GoogleBookApi.vue";
import iTunesApi from "./components/iTunesApi/iTunesApi.vue";

export default {
  name: "App",

  components: {
    iTunesApi,
    GoogleBookApi,
    AppDrawer
  },

  data: () => ({
    apis: {
      google_open: true,
      itunes_open: false
    }
  }),

  methods: {
    toggleDrawerItem(page) {
      for(const prop in this.apis) {
        this.apis[prop] = false;
      }
      this.apis[page] = true;
    }
  }
};
</script>

<style scoped>
  #main {
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
</style>
