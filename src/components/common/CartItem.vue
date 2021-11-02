<template>
  <div>
    <v-card class="ma-5">
      <v-card-title>
        <v-row cols="12">
          <v-col xm="2" sm="2" md="1" lg="1" xl="1"><v-img max-width="50" :src="cardItem.item.media.thumbnail"></v-img></v-col>
          <v-col>
            {{item.title}}
            <br>
            {{cardItem.qty}}
            <br>
            {{authors}}
            <br>
            <v-btn icon @click="cardItem.removeFromCart"><v-icon>mdi-trash</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    cardItem: Object
  },
  computed: {
    item: function() {
      return this.cardItem.item.media;
    },
    authors: function() {
      let a = this.cardItem.item.media.authors;
      if (a) {
        if (Array.isArray(a)) return a.join(", ");
        else return a;
      }
      return "";
    }
  }
}
</script>

<style scoped>

</style>