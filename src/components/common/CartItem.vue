<template>
  <div>
    <v-card>
      <v-card-title>{{item.title}}</v-card-title>
      <v-card-text>{{cardItem.qty}}|{{authors}}</v-card-text>
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
      let origin = this.cardItem.authors;
      return origin;
    }
  }
}
</script>

<style scoped>

</style>