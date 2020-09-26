<template>
  <div>
    <v-container>
      <v-layout row v-if="alert">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="alert.message" :type="alert.type"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update User Profile</span>
          <v-form class="mt-12" @submit.prevent="onUpdateUser">
            <v-flex row xs12>
              <v-avatar class="mt-2 ml-2">
                <img :src=uData.img />
              </v-avatar>
              <uploadPic :myLabel="myLabel" class="mb-2" v-on:childImage="childImage($event)"></uploadPic>
            </v-flex>
            <v-flex>
              <v-text-field label="Email" v-model="email" disabled></v-text-field>
              <v-text-field label="First Name" v-model="fname" required></v-text-field>
              <v-text-field label="Last Name" v-model="lname" required></v-text-field>
            </v-flex>
            <v-flex class="d-flex justify-end">
              <v-btn
                type="submit"
                small
                color="primary mr-1"
                :disabled="loading"
                :loading="loading"
              >
                Submit
                <span slot="loader" class="custom-loader">
                  <v-icon light class="font-italic caption">Loading...</v-icon>
                </span>
              </v-btn>
              <v-btn small color="error" to="/user_profile">Cancel</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import uploadPic from "@/components/uploadPic.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    uploadPic: uploadPic,
  },
  data() {
    return {
      uid: this.$store.state.user,
      email: this.$store.getters.userData.email,
      fname: this.$store.getters.userData.fname,
      lname: this.$store.getters.userData.lname,
      image: null,
      myLabel: "Change Avatar",
    };
  },
  computed: {
    ...mapGetters ({
      user: 'user',
      alert: 'alert',
      loading: 'loading',
      uData: 'userData'
    })
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
    onUpdateUser() {
      const userData = {
        uid: this.uid,
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        image: this.image,
      };
      this.$store.dispatch("updateUser", userData);
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    },
  },
};
</script>