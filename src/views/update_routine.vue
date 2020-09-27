<template>
  <div>
    <v-container>
      <v-layout row v-if="alert">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert
            @dismissed="onDismissed"
            :text="alert.message"
            :type="alert.type"
          ></app-alert>
        </v-flex>
      </v-layout>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update Routine</span>
          <v-form @submit.prevent="onUpdateRoutine">
            <v-flex row class="ml-2">
              <v-avatar class="mt-2">
                <img :src="getInfo.img" />
              </v-avatar>
              <uploadPic
                :myLabel="myLabel"
                class="mb-2"
                v-on:childImage="childImage($event)"
              ></uploadPic>
            </v-flex>
            <v-text-field
              label="Routine Name"
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Score"
              v-model="score"
            ></v-text-field>
            <v-select
              :items="time"
              label="Select the Hour"
              v-model="myTime"
            ></v-select>
            <v-switch
              label="Enable Routine"
              v-model="getInfo.status"
            ></v-switch>
            <v-flex class="d-flex justify-end">
              <v-btn type="submit" small color="primary mr-1">Update</v-btn>
              <v-btn small color="error" :to="'/user_profile'">Cancel</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import uploadPic from "@/components/uploadPic.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    uploadPic: uploadPic,
  },
  data() {
    return {
      routineId: this.$store.state.userData["routines"][String(this.$route.params.id)].id,
      name: this.$store.state.userData["routines"][String(this.$route.params.id)].name,
      score: this.$store.state.userData["routines"][String(this.$route.params.id)].score,
      status: this.$store.state.userData["routines"][String(this.$route.params.id)].status,
      myTime: this.$store.state.userData["routines"][String(this.$route.params.id)].time,
      image: null,
      myLabel: "Change Avatar",      
    };
  },
  created() {
    this.time = Array.from(Array(24).keys());
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading",
      uData: "userData",
    }),
    getInfo() {
      return this.$store.state.userData["routines"][
        String(this.$route.params.id)
      ];
    },
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
    onUpdateRoutine() {
      console.log('test routine');
      const routineData = {
        id: this.routineId,
        name: this.name,
        score: this.score,
        status: this.status,
        time: this.myTime,
        image: this.image
      }
      this.$store.dispatch("updateRoutine", routineData)
    },
    onDismissed() {
      this.$store.dispatch("clearAlert");
    },
  },
};
</script>