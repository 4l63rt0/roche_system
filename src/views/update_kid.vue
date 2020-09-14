<template>
  <div>
    <v-container>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update {{getInfo.name}}</span>
          <v-form>
            <v-flex row class="ml-2">
              <v-avatar class="mt-2">
                  <img :src=getInfo.img />
              </v-avatar>
              <uploadPic :myLabel="myLabel" class="mb-2" v-on:childImage="childImage($event)"></uploadPic>
            </v-flex>
            <v-text-field
            label="First Name"
            :value=getInfo.name
            ></v-text-field>
            <v-text-field
            label="Last Name"
            :value=getInfo.lname
            ></v-text-field>
            <v-switch
            label="Status"
            v-model=getInfo.status
            ></v-switch>
            <v-flex class="d-flex justify-end">
              <v-btn small color="primary mr-1">Update</v-btn>
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

export default {
  components: {
    uploadPic: uploadPic,
  },
  data() {
    return {
      name: "",
      lname: "",
      status: "",
      image: "https://www.shareicon.net/data/128x128/2016/07/26/802043_man_512x512.png",
      myLabel: "Change Avatar"
    }
  },
  methods: {
    childImage: function (childImage) {
      this.image = childImage;
    },
  },
  computed: {
    getInfo() {
      return this.$store.state.userData["kids"][String(this.$route.params.kid)]
    }
  }
}
</script>