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
          <span class="display-1">Sign In</span>
          <v-form @submit.prevent="login">
            <v-text-field
              name="email"
              label="eMail"
              id="email"
              v-model="email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="on"
            ></v-text-field>
            <v-flex class="d-flex justify-end">
              <v-btn
                type="submit"
                small
                color="primary mr-1"
                :disabled="loading"
                :loading="loading"
              >
                Sign In
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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
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
    login() {
      this.$store.dispatch("login", {
        email: this.email,
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