<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <v-card>
          <v-avatar class="mt-2">
            <img :src=userData.img />
          </v-avatar>
          <v-card-title>
            <span>{{ userData.fname }}</span>
          </v-card-title>
          <v-btn class="mr-2" color="primary" light>
            <v-icon left>mdi-pencil</v-icon>
            <span small>Edit</span>
          </v-btn>
        </v-card>
      </v-flex>
      <v-card class="mt-2">
        <v-card-title> Kids </v-card-title>
        <listTemplate :info="userData.kids" :address="addressK"></listTemplate>
      </v-card>
      <v-card class="mt-2">
        <v-card-title> Routines </v-card-title>
        <listTemplate :info="userData.routines" :address="addressRu"></listTemplate>
      </v-card>
      <v-card class="mt-2">
        <v-card-title> Rewards </v-card-title>
        <listTemplate :info="userData.rewards" :address="addressRe"></listTemplate>
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
      userId: this.$store.state.user,
      // name: this.$store.state.userData.fname,
      // image: this.$store.state.userImage,
      // kids: this.$store.state.userData.kids,
      // routines: this.$store.state.userData.routines,
      // rewards: this.$store.state.userData.rewards,
      addressK: "kids",
      addressRu: "routines",
      addressRe: "rewards"
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
    userData () {
      return this.$store.getters.userData
    }
  },
  methods: {
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
}
</script>