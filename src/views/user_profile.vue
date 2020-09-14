<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <v-card>
          <v-avatar class="mt-2">
            <img :src=image />
          </v-avatar>
          <v-card-title>
            <span>{{ completeName }}</span>
          </v-card-title>
          <v-btn class="mr-2" color="primary" light>
            <v-icon left>mdi-pencil</v-icon>
            <span small>Edit</span>
          </v-btn>
        </v-card>
      </v-flex>
      <v-card class="mt-2">
        <v-card-title> Kids </v-card-title>
        <listTemplate :info="kids" :address="addressK"></listTemplate>
      </v-card>
      <v-card class="mt-2">
        <v-card-title> Routines </v-card-title>
        <listTemplate :info="routines" :address="addressRu"></listTemplate>
      </v-card>
      <v-card class="mt-2">
        <v-card-title> Rewards </v-card-title>
        <listTemplate :info="rewards" :address="addressRe"></listTemplate>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>

import listTemplate from "@/components/listTemplate.vue";

export default {
  components: {
    listTemplate: listTemplate,
  },
  data() {
    return {
      completeName: ( this.$store.state.userFname + " " + this.$store.state.userLname ),
      image: this.$store.state.userImage,
      kids: this.$store.getters.userData.kids,
      routines: this.$store.getters.userData.routines,
      rewards: this.$store.getters.userData.rewards,
      addressK: "kid",
      addressRu: "routine",
      addressRe: "reward",
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error;
    },
    loading () {
      return this.$store.getters.loading
    },
  },
  methods: {
    childImage: function(childImage) {
      this.image = childImage;
    },
    onAddKid () {
      const kidData = {
        fname: this.fname,
        lname: this.lname,
        image: this.image
      }
      this.$store.dispatch('addKid', kidData).then(
      this.$store.dispatch('checkMissingInfo')
      )
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
}
</script>