<template>
  <v-row justify="center">
    <v-btn icon>
      <v-icon
      color="grey"
      @click.stop="dialog = true"
      >mdi-delete
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline5">Please confirm if you want to delete: </v-card-title>
        <v-flex row class="ml-5">
          <v-avatar>
            <img
              :src=img
            >
          </v-avatar>
          <v-card-title class="headline1">{{ info }}</v-card-title>
        </v-flex>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="primary" @click="dialog = false">
                No, cancel
          </v-btn>

          <v-btn small color="red" class="white--text" @click="deleteInfo">
                DELETE
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: [
      "info",
      "img",
      "address"
    ],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      deleteInfo() {
        this.dialog = false
        this.$store.dispatch("deleteInfo", {
          info: this.info,
          address: this.address
        });
      }
    }
  }
</script>