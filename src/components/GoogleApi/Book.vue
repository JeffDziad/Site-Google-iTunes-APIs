<template>
    <div>
        <v-card class="mx-auto" max-width="650" outlined elevation="8">
            <v-list-item>
                <v-list-item-avatar tile size="250" color="white">
                    <v-img contain
                        lazy-src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fst4.depositphotos.com%2F14953852%2F22772%2Fv%2F600%2Fdepositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fvector-images%2Fno-image-available.html&tbnid=_3a8DGLxJcsFQM&vet=12ahUKEwiUusS7u-7zAhWGB50JHa_aDbEQMygEegUIARCKAQ..i&docid=LDnLiJ-oRy4-NM&w=600&h=600&q=no%20image&ved=2ahUKEwiUusS7u-7zAhWGB50JHa_aDbEQMygEegUIARCKAQ"
                        :src="item.media.thumbnail"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <div class="card-actions">
                        <v-btn text outlined color="secondary" @click="dialog = true">Details</v-btn>
                    </div>
                    <v-list-item-title class="text-wrap headline mb-1">{{
                        fLength(this.item.media.title, titleMax)
                        }}</v-list-item-title>
                    <v-divider></v-divider>
                    <v-list-item-title v-if="item.media.authors" class="text-wrap mb-1">{{
                        fLength(authors, authorMax)
                        }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <!-- Dialog Header -->
                <v-card-title style="height: 60px;" class="white--text secondary justify-center">
                    <v-btn class="close-dialog-btn" icon outlined color="white" @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- Dialog Body -->
                    <v-container>
                        <v-row align="center" cols="12">
                            <v-col cols="12" xs="2" sm="5" md="6" lg="6" xl="4">
                                <v-list>
                                    <v-img class="detail-img" contain :src="item.media.thumbnail"></v-img>
                                </v-list>
                            </v-col>
                            <v-col cols="12" xs="10" sm="7" md="6" lg="6" xl="8">
                                <!-- Book Information -->
                                <v-row class="my-n5">
                                    <v-col class="text-right">
                                        <!-- Title -->
                                        <span class="text-h4 underline">{{item.media.title}}</span>
                                    </v-col>
                                </v-row>
                                <v-row class="my-n5">
                                    <v-col class="text-right">
                                        <!-- Authors -->
                                        <span class="text-h6">{{authors}}</span>
                                    </v-col>
                                </v-row>
                                <v-row class="my-n5">
                                    <v-col class="text-right">
                                        <!-- Publish Date -->
                                        <span class="text-h6">{{item.media.publishDate}}</span>
                                    </v-col>
                                </v-row>
                                <v-row class="my-n10">
                                    <v-col>
                                        <p class="text-h5">Description</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <!-- Descrption -->
                                        <div v-if="item.media.description">
                                            <div v-if="item.media.description.length > descriptionMax">
                                                <div v-if="!descriptionExtended">
                                                    <span>
                                                        {{fLength(item.media.description, descriptionMax)}}
                                                        <a @click="descriptionExtended = true">&nbsp;More</a>
                                                    </span>
                                                </div>
                                                <div v-else>
                                                    <span>
                                                        {{item.media.description}}
                                                        <a @click="descriptionExtended = false">&nbsp;Less</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div v-else><span>{{item.media.description}}</span></div>
                                        </div>
                                        <div v-else><span>No description available.</span></div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <div style="flex: 1 1 auto"></div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object,
        },
        data: () => {
            return {
                // Vars 
                descriptionMax: 400,
                titleMax: 50,
                authorMax: 50,

                // Models
                dialog: false,
                descriptionExtended: false
            };
        },
        methods: {
            fLength(str, maxLen) {
                if (!str) return str;
                if (str.length > maxLen) {
                    let formatted = "";
                    for (let i = 0; i < maxLen; i++) {
                        formatted += str[i];
                    }
                    formatted += "...";
                    return formatted;
                }
                return str;
            },
        },
        computed: {
            authors: function () {
                let a = this.item.media.authors;
                if (a) {
                    if (Array.isArray(a)) return this.item.media.authors.join(", ");
                    else return a;
                }
                return "";
            },
        },
    };
</script>

<style scoped>
    .card-actions {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .close-dialog-btn {
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .detail-img {
        -webkit-box-shadow: 0px 0px 50px -10px #000000;
        box-shadow: 0px 0px 50px -10px #000000;
    }

    .underline {
        text-decoration: underline;
        -webkit-text-decoration-color: rgba(63, 81, 181, 0.25);
        /* Safari */
        text-decoration-color: rgba(63, 81, 181, 0.25);
    }
</style>