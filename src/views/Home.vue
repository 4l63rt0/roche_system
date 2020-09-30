<template>
  <div>
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

      <v-layout row wrap class="justify-space-around">

          <v-flex xs12 sm3 md2>
            <v-flex text-center>
              <v-flex class="display-1">
                <span>{{ myDay }}</span>
              </v-flex>
              <v-flex class="display-1">
                <span>{{ myTime }}</span>
              </v-flex>
              <v-flex class="display-1">
                <span>{{ myDate }}</span>
              </v-flex>
            </v-flex>

            <v-flex text-center>
              <v-flex>
                <span class="display-1">{{ currentTemp }} F</span>
              </v-flex>
              <v-flex>
                <skycon :condition="currentIcon" :width=100 :height=100 />
              </v-flex>
              <v-flex>
                <p>{{ currentSum }}</p>
              </v-flex>
            </v-flex>

            <v-flex class="headline" text-center>
              <span>{{ hourlySum }}</span>
            </v-flex>

          </v-flex>

          <v-flex xs12 sm6 md8>
            <v-flex v-if="dailyScoreDateAvailable === true">
              <p class="display-2">Tasks and Routines</p>
            </v-flex>

            <v-flex row v-if="dailyScoreDateAvailable === true">

              <v-flex v-for="routine in dailyScore[0]['routine']" :key="routine.id" class="mr-1 ml-1">
                <v-card
                class="mx-auto mb-4"
                max-width="275"
                hover
                >
                  <v-img
                    class="white--text align-end"
                    height="125px"
                    :src='routine.img'
                  >
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
                        <v-img :src='kid.img'></v-img>
                      </v-avatar>
                      {{ kid.name }}
                    </v-chip>
                    
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-flex>
          </v-flex>

          <v-flex xs12 sm3 md2 v-if="dailyScoreDateAvailable === true">
            <v-flex>
              <p class="display-2">Score</p>
              <scoreCard :dailyScore="dailyScore"></scoreCard>
            </v-flex>
            <v-divider class="mb-4"></v-divider>
            <v-flex>
              <p class="display-2">Rewards</p>
              <rewardCard :dailyScore="dailyScore"></rewardCard>
            </v-flex>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import db from '@/firebase/init'
import scoreCard from '@/components/scoreCard.vue'
import rewardCard from '@/components/rewardCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'scoreCard': scoreCard,
    'rewardCard': rewardCard,
  },
  data() {
    return {
      weather: [],
      currentTemp: null,
      currentIcon: null,
      currentSum: null,
      hourlySum: null,
      myTime: null,
      myDay: null,
      myDate: null,
      kids: [],
      newKids: [],
      routines: [],
      rewards: [],
      newRoutines: [],
      dailyScore: [],
      dailyScoreDateAvailable: null,
      missingInfoStatus: {
        "kid": null,
        "routine": null,
        "reward": null
      }
    }
  },
  created() {
    
    this.checkIfDateExist()

    // fetch dailyScore document from Firestore
    let myDate = moment().format('YYMMDD')
    var self = this
    db.collection('dailyScore').where('date', '==', myDate).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // console.log(doc.data())
        let qDailyScore = doc.data()
        qDailyScore.id = doc.id
        self.dailyScore.push(qDailyScore)
        self.newRoutines = qDailyScore['routine']
        self.newKids = qDailyScore['kid']
        console.log(self.dailyScore['0'].id)
      })
    })
    .catch(function(error) {
      console.log('Error getting document: ', error);
    });

    // fetch kids data from firestore
    db.collection('kid').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            let kid = doc.data()
            kid.id = doc.id
            this.kids.push(kid)
        })
    })
    .catch(function(error) {
      console.log('Error getting kid document: ', error);
    });

    // fetch routines data from firestore
    db.collection('routine').orderBy('time').get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let routine = doc.data()
            routine.id = doc.id
            this.routines.push(routine)
        })
    })
    .catch(function(error) {
        console.log('Error getting routine document: ', error);
      });

    // fetch rewards data from firestore
    db.collection('reward').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            let reward = doc.data()
            reward.id = doc.id
            this.rewards.push(reward)
        })
    })
    .catch(function(error) {
      console.log('Error getting kid document: ', error);
    });
    
  },
  computed: {
    ...mapGetters({
      user: "user",
      alert: "alert",
      loading: "loading",
    }),
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onDismissed() {
      this.$store.dispatch("clearError");
    },
    checkMissingInfo() {
      this.$store.dispatch("checkMissingInfo")
    },
    // Check if dailyRoutine exist
    checkIfDateExist: function() {
      // console.log('checking Day')
      var self = this
      let myDate = moment().format('YYMMDD')
      // let myDate = "200331"
      db.collection('dailyScore').where('date', '==', myDate).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (doc.exists) {
            // console.log('exist')
            self.dailyScoreDateAvailable = true
          } 
        })
      })
      .catch(function(error) {
        console.log('Error getting document: ', error);
      });
    },
    createDailyScoreDocument: function() {
      var newDayDict = {}
      newDayDict.date = moment().format('YYMMDD')
      var routine = {}
      var kid = {}
      var reward = {}
      const kValues = Object.values(this.kids)
      for (const k in kValues) {
        let kName = kValues[k]['name']
        console.log(kName)
        kid[kName] = {
          "img": kValues[k]['img'],
          "name": kValues[k]['name'],
          "score": kValues[k]['score'],
          "status": kValues[k]['status'],
          "id": kValues[k]['id']
        }
      }
      const rValues = Object.values(this.routines)
      for (const r of rValues) {
          routine[r.name] = {
          "img": r.img,
          "score": r.score,
          "status": r.status,
          "time": r.time,
          "id": r.id,
          "name": r.name,
          "kid": kid
          }
      }
      const reValues = Object.values(this.rewards)
      for (const re of reValues) {
          reward[re.name] = {
          "img": re.img,
          "score": re.score,
          "status": re.status,
          "id": re.id,
          "name": re.name
          }
      }
      newDayDict["routine"] = routine
      newDayDict["kid"] = kid
      newDayDict["reward"] = reward
      db.collection('dailyScore').doc().set(newDayDict)
      .then(function() {
        console.log("dailyScore document created");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      this.dailyScoreDateAvailable = !this.dailyScoreDateAvailable      
    },

    applyTask: function (
        event, 
        dailyScoreID,
        routineName,
        kidName,
        kidStatus,
        routineScore
      ) {
      this.dailyScore[0]['routine'][routineName]['kid'][kidName]['status'] = !kidStatus
      // this.dailyScore[0]['kid'][kidName]['score'] = kidScore
      let kidScore = this.dailyScore[0]['kid'][kidName]['score']
      let status = !kidStatus
      var newScore = 0
      if (kidStatus == false) {
        newScore = kidScore + routineScore
      } else {
        newScore = kidScore - routineScore
      }
      this.dailyScore[0]['kid'][kidName]['score'] = newScore
      let toUpdateStatus = {
        'kid': {
          [kidName]: {
            'score': newScore
          }
        },
        "routine": {
          [routineName]: {
            "kid": {
              [kidName]: {
                "status": status
              }
            }
          }
        }
      }
      db.collection('dailyScore').doc(dailyScoreID).set(toUpdateStatus, {merge: true})
      .catch(function(error) {
        console.log('Error getting document: ', error);
      })
    },
    time() {
      var self = this
      this.myTime = moment().format('h:mm:ss A')
      this.myDay = moment().format('dddd')
      this.myDate = moment().format('MMMM, D')

      setTimeout(self.time, 1000)
    },
  },
  beforeMount: function() {
    this.dailyScoreDateAvailable = false
  },
  mounted: function() {

    this.time()
    let url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cf6831b0376f95a4b8578f907855d955/27.5455981,-99.8153993"
    axios
      .get(url)
      .then(resp => {
        this.weather = resp.data
        this.currentTemp = Math.round(this.weather.currently.temperature)
        this.currentIcon = this.weather.currently.icon
        this.currentSum = this.weather.currently.summary
        this.hourlySum = this.weather.hourly.summary
        // console.log(this.weather)
      })
    .catch(error => {
      console.log(error);
    });
  },
}
</script>

