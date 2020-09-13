<template>
  <div>
    <v-container>
      <v-layout class="justify-center">
        <v-flex class="flex-column" xs12 sm8 md6>
          <span class="display-1">Update Routine</span>
          <v-form>
            <v-text-field
            label="Routine Name"
            ></v-text-field>
            <v-switch
            label="Enable Routine"
            ></v-switch>
            <v-select
              :items="time"
              label="Select the Hour"
            ></v-select>
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
      time: []
    }
  },
  created() {
    this.time = Array.from(Array(24).keys())
  }
}
</script>