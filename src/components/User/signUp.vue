<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-layout>
        <v-flex class="signup container">
          <span class="display-1">Sign Up</span>
          <v-form @submit.prevent="onSignUp">
            <v-text-field
              name="email"
              label="eMail"
              id="email"
              v-model="email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              label="First Name"
              v-model="fname"
              required
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="lname"
              required
            ></v-text-field>
            <uploadPic
              class="mb-2"
              v-on:childImage="childImage($event)"
            ></uploadPic>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              name="confirmPass"
              label="Confirm Password"
              id="confirmPass"
              v-model="confirmPass"
              type="password"
              :rules="[comparePasswords]"
            ></v-text-field>
            <v-flex class="d-flex justify-end">
              <v-btn
                type="submit"
                small
                color="primary mr-1"
                :disabled="loading"
                :loading="loading"
              >
                Sign Up
                <span slot="loader" class="custom-loader">
                  <v-icon light class="font-italic caption">Loading...</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import uploadPic from "@/components/uploadPic.vue";

export default {
  components : {
    uploadPic
  },
  data() {
    return {
      email: "",
      fname: "",
      lname: "",
      image: "",
      password: "",
      confirmPass: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPass ? "Password do not match" : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
    onSignUp() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        image: this.image,  
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
</style>