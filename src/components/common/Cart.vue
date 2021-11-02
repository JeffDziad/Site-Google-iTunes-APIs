<template>
  <div>
    <google-book-api :cart="cart" v-show="googleApiVis"></google-book-api>
    <i-tunes-api :cart="cart" v-show="itunesApiVis"></i-tunes-api>
    <v-btn class="mx-2" fixed fab dark bottom right color="secondary" @click="dialog = true">
      <v-badge :content="totalItems" :value="totalItems" color="green">
        <v-icon dark>
          mdi-cart
        </v-icon>
      </v-badge>
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="800"
    >
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
              editable
          >
            Cart Confirmation
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="e1 > 2"
              step="2"
              editable
          >
            Payment Information
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" editable>
            Checkout Summary
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
                class="mb-12"
                color="grey lighten-1"

            >
              <div v-if="items.length > 0">
                <div v-for="item in items" :key="item.id">
                  <card-item :card-item="item"></card-item>
                </div>
              </div>
              <div v-else>
                <v-card>
                  <v-card-title>Cart Empty</v-card-title>
                </v-card>
              </div>

            </v-card>

            <v-btn
                color="primary"
                @click="e1 = 2"
            >
              Confirm
            </v-btn>

            <v-btn text @click="dialog = false">
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>

            <v-btn
                color="primary"
                @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text @click="dialog = false">
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            >

            </v-card>

            <v-btn
                color="primary"
                @click="e1 = 1"
            >
              Submit Order
            </v-btn>

            <v-btn text @click="dialog = false">
              Cancel
            </v-btn>
          </v-stepper-content>

        </v-stepper-items>

      </v-stepper>

    </v-dialog>
  </div>

</template>

<script>
import GoogleBookApi from "../GoogleApi/GoogleBookApi.vue";
import iTunesApi from "../iTunesApi/iTunesApi.vue";
import CardItem from "./CartItem.vue";
import {Cart} from "@/models/CartModel";

export default {
  name: "Cart",
  components: {
    CardItem,
    GoogleBookApi,
    iTunesApi
  },
  props: {
    googleApiVis: Boolean,
    itunesApiVis: Boolean
  },
  data: () => {
    return {
      e1: 1,
      dialog: false,
      cart: new Cart()
    }
  },
  computed: {
    totalItems: function () {
      return this.cart.getQuantity()
    },
    items: function () {
      return this.cart.getItems();
    }
  },
  methods: {
    toggleDialog() {
      console.log("Toggling");
      this.dialog = !this.dialog;
    }
  }
}
</script>

<style scoped>
  .scrollable-list {
    max-height: 800px;
    overflow: scroll;
  }
</style>