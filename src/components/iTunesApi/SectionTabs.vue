<template>
    <div>
        <v-card>
            <!-- <v-tabs v-model="tab" background-color="primary" dark>
                <v-tab :key="tracks">
                    Tracks
                </v-tab>
                <v-tab :key="albums">
                    Albums
                </v-tab>
                <v-tab :key="audiobooks">
                    Audiobooks
                </v-tab>
            </v-tabs> -->

            <!-- <v-tabs-items v-model="tab">
                <v-tab-item :key="tracks">
                    <v-card flat>
                        <h3>Tracks</h3>
                        <item-grid></item-grid>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="albums">
                    <v-card flat>
                        <h3>Albums</h3>
                        <item-grid></item-grid>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="audiobooks">
                    <v-card flat>
                        <h3>Audiobooks</h3>
                        <item-grid></item-grid>
                    </v-card>
                </v-tab-item>
            </v-tabs-items> -->
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "SectionTabs",
        props: {
            query: Object
        },
        data: () => {
            return {
                tab: 1,

            }
        },
        methods: {

        }
    };
</script>

<style scoped>
</style>