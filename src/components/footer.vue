<template>
    <v-footer
    default
    fixed
    absolute
    class="primary"
    >
      <v-card-text class="text-center">
          <v-btn
            v-for="icon in footerItems"
            :key="icon.icon"
            class="mx-4"
            icon
            link :to="icon.route"
          >
            <v-icon size="35px" class="white--text">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
    </v-footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading",
    }),
    footerItems() {
      let menuItems = [
        { title: "Home", icon: "mdi-view-dashboard", route: "/" },
        { title: "Sign Up", icon: "mdi-account-plus", route: "/signUp" },
        { title: "Sign In", icon: "mdi-login", route: "/login" },
        { title: "About", icon: "mdi-information", route: "/about" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          // { title: "Logout", icon: "mdi-logout", route: "/logout", extBlack:true },
          { title: "About", icon: "mdi-information", route: "/2" },
          { title: "User Profile", icon: "mdi-account-circle", route: "/user_profile" },
          { title: "Home", icon: "mdi-view-dashboard", route: "/" },
          { title: "Rewards", icon: "mdi-gift", route: "/rewards"},
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    myAvatar () {
      if (!this.userIsAuthenticated) {
        return 'https://www.shareicon.net/data/128x128/2016/07/26/802043_man_512x512.png'
      } else {
        return this.$store.state.userImage
      }
    },
    myName () {
      if (!this.userIsAuthenticated) {
        return "Roche System"
      } else {
        return this.$store.state.userFname + ' ' + this.$store.state.userLname 
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    onAddNewDay() {
      console.log("Adding New Day...");
      this.$store.dispatch("addNewDay");
    },
    onTest() {
      this.$store.dispatch("testButton")
    },
  },
};
</script>