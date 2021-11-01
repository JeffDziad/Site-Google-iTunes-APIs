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
    import SectionTabs from './SectionTabs.vue';

    const TYPES = {
        TRACK: {
            id: 0,
            str: "Track"
        },
        ALBUM: {
            id: 1,
            str: "Album"
        },
        AUDIOBOOK: {
            id: 2, 
            str: "Audiobook"
        }
    }

    const url = 'https://itunes.apple.com/search?';
    const itemLimit = 40;

    export default {
        name: "iTunesApi",
        props: {},
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
                    .then((data) => (this.collection = new MediaCollection(data)))
                    .catch((err) => console.error(err));
            }
        }
    };

    class MediaCollection {
        constructor(raw) {
            //! Rethink this...
            this.tracks = [];
            this.albums = [];
            this.audiobooks = [];

            this.raw = {}
            if (raw) {
                console.log("Raw");
                this.raw = raw;
                this.resultCount = this.raw.resultCount;
                this.populate();

            }
        }
        populate() {
            for(let i = 0; i < this.raw.results.length; i++) {
                let item = this.raw.results[i];
                //! Dont like this...
                switch(item.wrapperType) {
                    case "track": 
                        this.add(new Track(item.artistId, item.artistName, item.trackName, item.previewUrl, item.artworkUrl100, item.releaseDate));
                        break;
                    case "collection":
                        if(item.collectionType === "Album") {
                            this.add(new Album(item.artistId, item.artistName, item.collectionName, item.artworkUrl100, item.trackCount, item.releaseDate));
                        }
                        break;
                    case "audiobook":
                        this.add(new Audiobook(item.artistId, item.artistName, item.collectionName, item.artworkUrl100, item.description, item.previewUrl));
                        break;
                    default: break;
                }
            }
            
        }
        add(item) {
            //! Or this...
            switch(item.type.str) {
                case "Track":
                    this.tracks.push(new Media(item));
                    break;
                case "Album":
                    this.albums.push(new Media(item));
                    break;
                case "Audiobook":
                    this.audiobooks.push(new Media(item));
                    break;
            }
        }
        getItems() {
            return {
                tracks: this.tracks,
                albums: this.albums,
                audiobooks: this.audiobooks
            }
        }
    }

    class Media {
        constructor(item) {
            this.item = item;
        }
    }

    class Track {
        constructor(artistId, artistName, trackName, previewUrl, artworkUrl100, releaseDate) {
            this.type = TYPES.TRACK;

            this.artistId = artistId;
            this.artistName = artistName;
            this.trackName = trackName;
            this.previewUrl = previewUrl;
            this.artworkUrl100 = artworkUrl100;
            this.releaseDate = releaseDate;
        }
    }

    class Album {
        constructor(artistId, artistName, collectionName, artworkUrl100, trackCount, releaseDate) {
            this.type = TYPES.ALBUM;

            this.artistId = artistId;
            this.artistName = artistName;
            this.collectionName = collectionName;
            this.artworkUrl100 = artworkUrl100;
            this.trackCount = trackCount;
            this.releaseDate = releaseDate;
        }
    }

    class Audiobook {
        constructor(artistId, artistName, collectionName, artworkUrl100, description, previewUrl) {
            this.type = TYPES.AUDIOBOOK

            this.artistId = artistId;
            this.artistName = artistName;
            this.collectionName = collectionName;
            this.artworkUrl100 = artworkUrl100; 
            this.description = description;
            this.previewUrl = previewUrl;
        }
    }
//TODO: Create models here. (MediaCollection, Song, Album, Movie, Show, ...)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>