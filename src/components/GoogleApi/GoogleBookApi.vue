<template>
  <div id="google">
    <div style="text-align: center">
      <h2>Book Browser</h2>
    </div>
    <v-container>
      <v-row>
        <v-col align="center">
          <v-btn style="display: inline-block" class="ma-2" outlined fab color="secondary" @click="search(0)">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <div style="display: inline-block; width: 400px">
            <v-text-field v-model="searchTerm" label="Search Term" outlined clearable></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <!-- Search Results -->
        <!-- //! Need a way of reseting page in item-grid after new search term is provided -->
        <item-grid :query="books.getObject()" @turnPage="turnPage" :cart="cart"></item-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import ItemGrid from "../common/ItemGrid.vue";
  //Data Model Info
  import {LibraryCollection, maxResults} from "@/models/GoogleModels";


  export default {
    name: "GoogleBookApi",
    components: {
      ItemGrid,
    },
    props: {
      cart: Object
    },
    data: () => {
      return {
        books: new LibraryCollection(),
        searchTerm: null,
        page: 1
      };
    },
    methods: {
      search(index) {
        if (this.searchTerm) {
          fetch(
            "https://www.googleapis.com/books/v1/volumes?" +
            new URLSearchParams({
              q: this.searchTerm,
              startIndex: index,
              maxResults: maxResults
            })
          )
            .then((res) => res.json())
            .then((data) => (this.books = new LibraryCollection(data, this.searchTerm)))
            .catch((err) => console.error(err));
        }

      },
      turnPage(page) {
        let index = (page - 1) * maxResults;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.search(index);
      }
    },
    computed: {},
    watch: {
      //? Only runs when this.searchTerm changes
      //~   Filters false values from being the searchTerm (false, , "", ...)
      searchTerm: function (nV, oV) {
        if (nV) {
          this.searchTerm = nV;
        } else {
          this.searchTerm = oV;
        }
      }
    },
  };

  //~ Models


</script>

<style scoped>
</style>