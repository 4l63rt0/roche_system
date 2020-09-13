<template>
  <div>
    <v-container>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update Kid</span>
          <v-form>
            <v-text-field
            label="Kid Name"
            ></v-text-field>
            <v-switch
            label="Enable Kid"
            ></v-switch>
            <v-file-input multiple label="Add Picture"></v-file-input>
            <v-flex class="d-flex justify-end">
              <v-btn small color="primary mr-1">Update</v-btn>
              <v-btn small color="error">Cancel</v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedFile: null
    }
  },
  methods: {

  }

}
</script>