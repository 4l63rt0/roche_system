<template>
  <div>
    <v-container>
      <v-layout row v-if="alert">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="alert.message" :type="alert.type"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Add Routine</span>
          <v-form @submit.prevent="onAddRoutine">
            <v-text-field
            label="Routine Name"
            v-model="name"
            required
            ></v-text-field>
            <v-text-field
            label="Score"
            v-model="score"
            type="number"
            required
            ></v-text-field>
            <v-select
              :items="selectTime"
              label="Select the Hour"
              v-model="time"
              required
            ></v-select>
            <uploadPic class="mb-2" v-on:childImage="childImage($event)"></uploadPic>
            <v-flex class="d-flex justify-end">
              <v-btn 
              @click="$router.push('/')" small color="error mr-1" >Cancel</v-btn>
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
      selectTime: [],
      name: '',
      score: '',
      time: '',
      image: '' 
    }
  },
  computed: {
    ...mapGetters ({
      user: 'user',
      alert: 'alert',
      loading: 'loading',
    })
  },
  created() {
    this.selectTime = Array.from(Array(24).keys())
  },
  methods: {
    childImage: function(childImage) {
      this.image = childImage;
    },
    onAddRoutine () {
      const routineData = {
        name: this.name,
        score: this.score,
        time: this.time,
        image: this.image
      }
      this.$store.dispatch('addRoutine', routineData)
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    }
  }
}
</script>