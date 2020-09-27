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
          <span class="display-1">Update {{ getInfo.name }}</span>
          <v-form @submit.prevent="onUpdateKid">
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
              label="First Name"
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="lname"
            ></v-text-field>
            <v-switch
              label="Kid Status"
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
      kidId: this.$store.state.userData["kids"][String(this.$route.params.id)].id,
      name: this.$store.state.userData["kids"][String(this.$route.params.id)].name,
      lname: this.$store.state.userData["kids"][String(this.$route.params.id)].lname,
      status: this.$store.state.userData["kids"][String(this.$route.params.id)].status,
      image: null,
      myLabel: "Change Avatar",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading",
    }),
    getInfo() {
      return this.$store.state.userData["kids"][
        String(this.$route.params.id)
      ];
    },
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
    onUpdateKid() {
      const kidData = {
        id: this.kidId,
        name: this.name,
        lname: this.lname,
        status: this.status,
        image: this.image,
      };
      this.$store.dispatch("updateKid", kidData);
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    },
  },
};
</script>