<template>
    <div>
        <div style="text-align: center">
            <h2>Media Library</h2>
        </div>
        <v-container class="">
            <v-row>
                <v-col align="center">

                    <v-btn style="display: inline-block" class="ma-2" outlined fab color="secondary" @click="search">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <div style="display: inline-block; width: 400px">
                        <v-text-field v-model="searchTerm" label="Search Term" outlined clearable></v-text-field>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <!-- Search Results -->
                <!--//TODO: Add tabs to hold each type of media item. (Song, Album, Movie, Show, ...)-->
                <section-tabs></section-tabs>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {MediaCollection} from "@/models/iTunesModels";
    import SectionTabs from './SectionTabs.vue';

    const url = 'https://itunes.apple.com/search?';
    const itemLimit = 40;

    export default {
        name: "iTunesApi",
        props: {
          cart: Object
        },
        components: {
            SectionTabs
        },
        data: () => {
            return {
                searchTerm: null,
                collection: new MediaCollection()
            }
        },
        methods: {
            search() {
                //TODO: search the iTunes API using this.searchTerm
                fetch(
                    url +
                    new URLSearchParams({
                        term: this.searchTerm,
                        limit: itemLimit
                    })
                )
                    .then((res) => res.json())
                    .then((data) => (this.collection = new MediaCollection(data))
                    .catch((err) => console.error(err)))
            }
        }
    };

//TODO: Create models here. (MediaCollection, Song, Album, Movie, Show, ...)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>