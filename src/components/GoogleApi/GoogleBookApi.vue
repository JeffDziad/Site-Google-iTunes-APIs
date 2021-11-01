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
        <item-grid :query="books.getObject()" @turnPage="turnPage"></item-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import ItemGrid from "../common/ItemGrid.vue";

  // const autocompleteURL = '';

  const TYPE = {
    BOOK: {
      id: 0,
      str: "Book",
    },
  };

  const maxResults = 40;

  export default {
    name: "GoogleBookApi",
    components: {
      ItemGrid,
    },
    props: {},
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

  class LibraryCollection {
    constructor(data, searchTerm) {
      this.searchTerm = searchTerm;
      this.items = [];
      if (data) {
        this.raw = data;
        this.populate();
      } else {
        this.raw = null;
      }
    }
    //? Builds this.items from passed in array
    populate() {
      for (let i = 0; i < this.raw.items.length; i++) {
        let x = this.raw.items[i];
        if (x.volumeInfo.imageLinks) {
          this.items.push(
            new LibraryItem(
              new Book(
                x.id,
                x.volumeInfo.title,
                x.volumeInfo.imageLinks.thumbnail,
                x.volumeInfo.description,
                x.volumeInfo.publishedDate,
                x.volumeInfo.authors
              )
            )
          );
        }
      }
    }
    getObject() {
      let obj = {
        array: [],
        total: 0,
        maxResults: maxResults,
        searchTerm: this.searchTerm
      }
      if (this.raw) {
        obj.array = this.items;
        obj.total = this.raw.totalItems;
      }
      return obj;
    }
  }

  class LibraryItem {
    constructor(media) {
      this.media = media;
    }
  }

  class Book {
    constructor(
      id,
      title,
      thumbnail = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
      description,
      publishDate,
      authors = "No author available."
    ) {
      this.type = TYPE.BOOK;

      this.id = id;
      this.title = title;
      //TODO: Set default image
      this.thumbnail = thumbnail;
      this.description = description;
      this.publishDate = publishDate;
      this.authors = authors;
    }
  }
</script>

<style scoped>
</style>