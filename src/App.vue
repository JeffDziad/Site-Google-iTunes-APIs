<template>
    <v-app id="main">
      <app-drawer @toggleDrawerItem="toggleDrawerItem"></app-drawer>
      <v-container>
        <cart-component :google-api-vis="apis.google_open" :itunes-api-vis="apis.itunes_open"></cart-component>

      </v-container>
    </v-app>
</template>

<script>
import CartComponent from "./components/common/Cart.vue";
import AppDrawer from "./components/common/AppDrawer.vue";

export default {
  name: "App",

  components: {
    CartComponent,
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
