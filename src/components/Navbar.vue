<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RR System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 success" light v-if="userIsAuthenticated" @click="onTest">
        <v-icon left>mdi-run</v-icon>
        <span small>Test Me!</span>
      </v-btn>
      <v-btn class="mr-2 success" light v-if="userIsAuthenticated" @click="onAddNewDay">
        <v-icon left>mdi-plus</v-icon>
        <span small>Add Day</span>
      </v-btn>
      <v-btn light v-if="userIsAuthenticated" @click="onLogout">
        <v-icon left>mdi-logout</v-icon>
        <span small>Logout</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://f0.pngfuel.com/png/1002/560/saitama-clip-art-png-clip-art.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ fname }}</v-list-item-title>
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
      drawer: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    fname() {
      return this.$store.state.userFname;
    },
    urlImage() {
      return this.$store.state.userImage;
    },
    error() {
      return this.$store.getters.error;
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
          { title: "User Profile", icon: "mdi-account-circle", route: "/userProfile" }
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
      console.log("This is my Test");
      this.$store.dispatch("testButton")
    },
  },
};
</script>