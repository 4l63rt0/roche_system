<template>
  <v-layout>
    <v-flex>
        <v-list>
          <v-list-item
          v-for="i in info"
          :key="i"
          >
            <v-list-item-avatar>
              <v-img :src=i.img></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ i.name }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon color="grey">mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon color="grey">mdi-delete</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    "info"
  ],
}
</script>