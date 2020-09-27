<template>
  <div>
    <v-app-bar color="primary" dense dark fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RR System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 success" light v-if="userIsAuthenticated" @click="onTest">
        <v-icon left>mdi-run</v-icon>
        <span small>Test</span>
      </v-btn>
      <v-btn light v-if="userIsAuthenticated" @click="onLogout">
        <v-icon left>mdi-logout</v-icon>
        <span small>Logout</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src=myAvatar />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ myName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" link router :to="item.route">
          <v-list-item-icon>
            <v-icon pink>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action></v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading () {
      return this.$store.getters.loading
    },
    menuItems() {
      let menuItems = [
        { title: "Home", icon: "mdi-view-dashboard", route: "/" },
        { title: "About", icon: "mdi-information", route: "/about" },
        { title: "Sign In", icon: "mdi-login", route: "/login" },
        { title: "Sign Up", icon: "mdi-account-plus", route: "/signUp" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: "Home", icon: "mdi-view-dashboard", route: "/" },
          { title: "About", icon: "mdi-information", route: "/about" },
          { title: "Add Reward", icon: "mdi-plus", route: "/add_reward" },
          { title: "Add Routine", icon: "mdi-plus", route: "/add_routine" },
          { title: "Add Kid", icon: "mdi-plus", route: "/add_kid" },
          { title: "Update User", icon: "mdi-account-circle", route: "/update_user" },
          { title: "User Profile", icon: "mdi-account-circle", route: "/user_profile" }
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