<template>
  <div>
    <v-container>
      <v-layout row v-if="alert">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="alert.message" :type="alert.alertType"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Add Reward</span>
          <v-form @submit.prevent="onAddReward">
            <v-text-field
            label="Reward Name"
            v-model="name"
            type="text"
            ></v-text-field>
            <v-text-field
            label="Price"
            v-model="price"
            type="number"
            ></v-text-field>
            <uploadPic class="mb-2" v-on:childImage="childImage($event)"></uploadPic>
            <v-flex class="d-flex justify-end">
              <v-btn small color="error mr-1" to="/">Cancel</v-btn>
              <v-btn 
                type="submit"
                small color="primary" 
                :disabled="loading"
                :loading="loading"
              >Submit
                <span slot="loader" class="custom-loader">
                  <v-icon light class="font-italic caption">Loading...</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import uploadPic from '@/components/uploadPic.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'uploadPic': uploadPic
  },
  data() {
    return {
      name: '',
      price: '',
      image: '' 
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      alert: 'alert',
      loading: 'loading'
    })
  },
  methods: {
    childImage: function(childImage) {
      this.image = childImage;
    },
    onAddReward () {
      const rewardData = {
        name: this.name,
        price: this.price,
        image: this.image
      }
      this.$store.dispatch('addReward', rewardData)
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    }
  }
}
</script>