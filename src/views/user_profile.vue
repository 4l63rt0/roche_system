<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-avatar>
            <img :src=image />
          </v-avatar>
          <v-card-title>
            <span>{{ completeName }}</span>
          </v-card-title>
          <v-btn class="mr-2" color="primary" light>
            <v-icon left>mdi-pencil</v-icon>
            <span small>Edit</span>
          </v-btn>
        </v-card>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {

      completeName: ( this.$store.state.userFname + " " + this.$store.state.userLname ),
      image: this.$store.state.userImage
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error;
    },
    loading () {
      return this.$store.getters.loading
    },
  },
  methods: {
    childImage: function(childImage) {
      this.image = childImage;
    },
    onAddKid () {
      const kidData = {
        fname: this.fname,
        lname: this.lname,
        image: this.image
      }
      this.$store.dispatch('addKid', kidData).then(
      this.$store.dispatch('checkMissingInfo')
      )
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
}
</script>