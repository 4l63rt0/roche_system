<template>
  <v-app>
    <Navbar />

    <v-content class="blue lighten-5">
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },

  data: () => ({

  }),
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
};
</script>
