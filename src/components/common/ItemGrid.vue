<template>
    <div>
        <v-row>
            <v-col cols="12" sm="12" md="12" lg="6" xl="4" v-for="(item, index) in query.array" :key="index" class="align-center pa-5">
                <component :is="item.media.type.str" :item="item" :cart="cart"></component>
            </v-col>
        </v-row>
        <v-row v-if="query.total > query.maxResults">
            <v-col class="align-center">
                <div class="text-center">
                    <v-pagination v-model="page" :length="Math.ceil(query.total / query.maxResults)"
                        :total-visible="7" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    // Import all components that will be using a grid
    import Book from '../GoogleApi/Book.vue';

    export default {
        props: {
            query: Object,
            cart: Object
        },
        components: {
            Book
        },
        data: () => {
            return {
                page: 1
            }
        },
        methods: {},
        watch: {
            page: function () {
                this.$emit('turnPage', this.page);
            },
            // Watch query - reset page if new searchTerm is used 
            query: function (newV, oldV) {
                if (oldV.searchTerm !== newV.searchTerm && newV.searchTerm) {
                    this.page = 1;
                }
            }
        }
    }
</script>

<style scoped>

</style>