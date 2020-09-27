<template>
  <div>
    <v-container>
      <v-layout row v-if="alert">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert
            @dismissed="onDismissed"
            :text="alert.message"
            :type="alert.type"
          ></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update Reward</span>
          <v-form @submit.prevent="onUpdateReward">
            <v-flex row class="ml-2">
              <v-avatar class="mt-2">
                <img :src="getInfo.img" />
              </v-avatar>
              <uploadPic
                :myLabel="myLabel"
                class="mb-2"
                v-on:childImage="childImage($event)"
              ></uploadPic>
            </v-flex>
            <v-text-field
              label="Reward Name"
              v-model="name"
            ></v-text-field>
            <v-text-field 
              label="Price" 
              v-model="score"
            ></v-text-field>
            <v-switch
              label="Reward Status"
              v-model="status"
            ></v-switch>
            <v-flex class="d-flex justify-end">
              <v-btn type="submit" small color="primary mr-1">Update</v-btn>
              <v-btn small color="error" :to="'/user_profile'">Cancel</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import uploadPic from "@/components/uploadPic.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    uploadPic: uploadPic,
  },
  data() {
    return {
      rewardId: this.$store.state.userData["rewards"][String(this.$route.params.id)].id,
      name: this.$store.state.userData["rewards"][String(this.$route.params.id)].name,
      score: this.$store.state.userData["rewards"][String(this.$route.params.id)].score,
      status: this.$store.state.userData["rewards"][String(this.$route.params.id)].status,
      image: null,
      myLabel: "Change Avatar",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading"
    }),
    getInfo() {
      return this.$store.state.userData["rewards"][
        String(this.$route.params.id)
      ];
    },
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
    onUpdateReward() {
      const rewardData = {
        id: this.rewardId,
        name: this.name,
        score: this.score,
        status: this.status,
        image: this.image,
      };
      this.$store.dispatch('updateReward', rewardData)
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    },
  },
};
</script>