<template>
  <div>
    <v-container>
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Add Kid</span>
          <v-form @submit.prevent="onAddKid">
            <v-text-field
            label="User ID"
            v-model="uid"
            disabled
            ></v-text-field>
            <v-text-field
            label="Parent"
            v-model="parent"
            disabled
            ></v-text-field>
            <v-text-field
            label="First Name"
            v-model="name"
            required
            ></v-text-field>
            <v-text-field
            label="Last Name"
            v-model="lname"
            required
            ></v-text-field>
            <uploadPic class="mb-2" v-on:childImage="childImage($event)"></uploadPic>
            <v-flex class="d-flex justify-end">
              <v-btn 
                type="submit"
                small color="primary mr-1" 
                :disabled="loading"
                :loading="loading"
              >Submit
                <span slot="loader" class="custom-loader">
                  <v-icon light class="font-italic caption">Loading...</v-icon>
                </span>
              </v-btn>
              <v-btn small color="error" to="/">Cancel</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import uploadPic from '@/components/uploadPic.vue'

export default {
  components: {
    'uploadPic': uploadPic
  },
  data() {
    return {
      uid: this.$store.state.user,
      parent: ( this.$store.state.userFname + " " + this.$store.state.userLname ),
      name: '',
      lname: '',
      image: '' 
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
        name: this.name,
        lname: this.lname,
        image: this.image
      }
      this.$store.dispatch('addKid', kidData)
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
}
</script>