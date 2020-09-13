<template>
  <div>
    <v-container>
      <v-flex class="mt-6 mb-6 d-flex justify-center">
        <v-btn
          v-if="dailyScoreDateAvailable === false"
          x-large
          rounded
          color="success"
          @click="$emit('createdailyscoredocument')"
        >Add new day</v-btn>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["dailyScoreDateAvailable"],
  data() {
    return {};
  },
  methods: {},
};
</script>