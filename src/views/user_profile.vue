<template>
  <v-container>
    <v-layout row v-if="alert">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="alert.message" :type="alert.alertType"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-card>
        <v-card-title>User Information</v-card-title>
        <v-layout>
          <v-flex>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src=userData.img></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ userData.fname + " " + userData.lname}}</v-list-item-title>
                    <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon >
                    <v-btn icon :to="'/update_user'">
                      <v-icon color="grey" >mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-flex>
        </v-layout> 
      </v-card>

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
import { mapActions, mapGetters} from 'vuex';

export default {
  components: {
    listTemplate: listTemplate,
  },
  data() {
    return {
      addressK: "kids",
      addressRu: "routines",
      addressRe: "rewards"
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      alert: 'alert',
      loading: 'loading',
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions({
      onDismissed: 'clearAlert'
    })
  }
}
</script>