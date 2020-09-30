<template>
  <v-app>
    <Navbar />

    <v-content class="blue lighten-5 mt-12">
      <router-view></router-view>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer';

export default {
  name: 'App',
  components: { 
    Navbar,
    Footer
    },
  data: () => ({

  }),
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
};
</script>
