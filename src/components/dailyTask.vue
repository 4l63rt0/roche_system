<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 md8>
        <v-flex row v-if="dailyScoreDateAvailable === true">
          <v-flex v-for="routine in dailyScore[0]['routine']" :key="routine.id" class="mr-1 ml-1">
            <v-card class="mx-auto mb-4" max-width="275" hover>
              <v-img class="white--text align-end" height="125px" :src="routine.img">
                <v-card-title>{{ routine.name }}</v-card-title>
              </v-img>

              <v-card-actions>
                <v-chip
                  v-for="kid in routine['kid']"
                  :key="kid.id"
                  :class="{ 'success': kid.status}"
                  pill
                  class="mr-1 ml-1"
                  @click="applyTask($event,
                    dailyScore['0'].id,
                    routine.name,
                    kid.name,
                    kid.status,
                    routine.score
                    )"
                  >
                  <v-avatar left>
                    <v-img :src="kid.img"></v-img>
                  </v-avatar>
                  {{ kid.name }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  
}
</script>