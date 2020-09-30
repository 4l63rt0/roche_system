<template>
  <v-layout>
    <v-flex>
      <v-timeline dense clipped>
        <v-timeline-item v-for="(r) in routines" :key="r.id">
          <template v-slot:icon>
            <v-avatar>
              <img :src=r.img>
            </v-avatar>
          </template>
            <v-card
            hover
            outlined
            >
              <v-list-item-title class="ml-2">
                {{ r.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="overline ml-2">
                {{ r.time }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="overline ml-2">
                Score: {{ r.score }}
              </v-list-item-subtitle>

              <v-card-actions class="justify-end">
                
                <v-chip 
                  v-for="kid in kids" 
                  :key="kid.id"
                  :class="{ 'success': kid.status}"
                  pill
                  class="ml-1"
                >
                  <v-avatar left>
                    <v-img :src='kid.img'></v-img>
                  </v-avatar>
                  {{ kid.name }}
                </v-chip>
                
              </v-card-actions>
            </v-card>


        </v-timeline-item>
      </v-timeline>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: [
    "routines",
    "kids"
  ]
}
</script>