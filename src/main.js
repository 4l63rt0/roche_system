import Vue from 'vue'
import VueSkycons from 'vue-skycons'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import AlertCmp from './components/shared/alert.vue'
import * as firebase from 'firebase'

Vue.use(VueSkycons)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
