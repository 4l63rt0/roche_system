<template>
  <v-layout>
    <v-flex>
      <v-card
        class="mx-auto"
      >
        <v-list dense>
          <v-subheader>MISSING INFORMATION</v-subheader>
          <v-list-item-group>
            <v-list-item
            v-for="i in missing"
            :key="i.title" link router :to="i.route"
            >
              <v-list-item-icon>
                <v-icon v-text="i.icon" color="red"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="i.title"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      missing: [
        {title: "Kid", icon: "mdi-baby-face", alert: "mdi-alert-circle", route: "/add_kid"},
        {title: "Routine", icon: "mdi-calendar-clock", alert: "mdi-alert-circle", route: "/add_routine"},
        {title: "Reward", icon: "mdi-gift", alert: "mdi-alert-circle", route: "/add_reward"}
      ]
    }
  }
}
</script>