<template>
  <v-container>
    <v-layout row v-if="alert">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert
          @dismissed="onDismissed"
          :text="alert.message"
          :type="alert.type"
        ></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
        <v-flex row>
          <v-card outlined elevation="3" class="ml-2">
            <v-list-item>
              <v-list-item-content>
                <v-flex text-center>
                  <v-list-item-subtitle class="overline">
                    {{myDay}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="overline">
                    {{myTime}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="overline">
                    {{myDate}}
                  </v-list-item-subtitle>
                </v-flex>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-flex class="align-self-center text-center">
            <span class="headline">Routines Timeline</span>
          </v-flex>
        </v-flex>
    </v-layout>
    <myTimeLine class="scroll" :routines="userData.routines" :kids="userData.kids" />
    <span class="headline">My Tasks</span>
    <myTask :routines="userData.routines" />
    <myTask :routines="userData.routines" />
    <myTask :routines="userData.routines" />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import myTimeLine from '@/components/myTimeLine.vue'
import myTask from '@/components/myTask.vue'

export default {
  components: {
    myTimeLine,
    myTask,
  },
  data() {
    return {
      myTime: null,
      myDay: null,
      myDate: null,
    };
  },
  mounted: function() {
    this.time()
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading",
      userData: "userData"
    }),
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    time() {
      var self = this;
      this.myTime = moment().format("h:mma");
      this.myDay = moment().format("dddd");
      this.myDate = moment().format("MMM, D");

      setTimeout(self.time, 1000);
    },
  },
};
</script>