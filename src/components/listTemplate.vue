<template>
  <v-layout>
    <v-flex>
        <v-list>
          <v-list-item
          v-for="i in info"
          :key="i.name+i.lname"
          >
            <v-list-item-avatar>
              <v-img :src=i.img></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ i.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="i.time">Time: {{ i.time }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="i.score">Score: {{ i.score }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="i.price">Price: {{ i.price }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon >
              <v-btn icon :to="'/update_' + address + '/' + i.id">
                <v-icon color="grey" >mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon>
              <modal :info=i.name :img=i.img :address=address></modal>
            </v-list-item-icon>
            <v-switch
              v-model=i.status
              @change='changeStatus(i.id)'
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-flex>
  </v-layout>
</template>

<script>

import modal from "@/components/modal.vue"

export default {
  components: {
    modal: modal
  },
  props: [
    "info",
    "address"
  ],
  methods: {
    changeStatus(id) {
      let payload = {
        id: id,
        address: this.address
      }
      console.log(payload);
      this.$store.dispatch('changeStatus', payload)
    }
  }
}
</script>