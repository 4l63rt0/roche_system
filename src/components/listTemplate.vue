<template>
  <v-layout>
    <v-flex>
        <v-list>
          <v-list-item
          v-for="i in info"
          :key="i.name+i.lname"
          >
            <v-list-item-avatar>
              <v-img :src=i.img></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ i.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="i.time">Time: {{ i.time }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="i.score">Score: {{ i.score }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="i.price">Price: {{ i.price }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon >
              <v-btn icon :to="'/update_' + address + '/' + i.name">
                <v-icon color="grey" >mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-btn icon>
                <v-icon color="grey">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-switch v-model=i.status></v-switch>
          </v-list-item>
        </v-list>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    "info",
    "address"
  ],
}
</script>