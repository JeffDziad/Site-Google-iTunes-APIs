<template>
    <div class="ma-0 pa-0 top-corner" style="z-index: 4;">
        <v-card dark class="rounded-0">
            <v-navigation-drawer permanent expand-on-hover>
                <v-list>
                    <v-list-item class="px-2">
                        <v-list-item-avatar>
                            <v-icon>mdi-play-network-outline</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title><h3>Library Browser</h3></v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list nav dense>
                    <v-list-item link @click="$emit('toggleDrawerItem', 'google_open')">
                        <v-list-item-icon>
                            <v-icon>mdi-book-open-variant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Books Library</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="$emit('toggleDrawerItem', 'itunes_open')">
                        <v-list-item-icon>
                            <v-icon>mdi-music</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Media Library</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>

<script>
export default {
    emits: ['google-open', 'itunes-open'],
}
</script>

<style scoped>
    .top-corner {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>