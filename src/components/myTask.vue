<template>
  <v-layout>
    <v-flex
      v-for="r in routines"
      :key="r.id"
      d-flex>
        <v-card class="mb-2 mr-2" >
            <v-card-text class="text-center" >
                <v-avatar>
                    <img :src=r.img>
                </v-avatar>
                <span>{{r.name}}</span>
            </v-card-text>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    "routines"
  ]
}
</script>