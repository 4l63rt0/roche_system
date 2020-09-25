import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/firebase/init'
import router from '@/router/index'
import moment from 'moment'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    userEmail: null,
    userFname: null,
    userLname: null,
    userImage: null,
    userData: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.id,
      state.userEmail = payload.email,
      state.userFname = payload.fname,
      state.userLname = payload.lname,
      state.userImage = payload.image
    },
    setUserData(state, payload) {
      state.userData = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    testButton () {
      console.log("test button");
    },
    createNewDailyRoutine() {
      console.log('Create new daily routine!!!!')
    },
    deleteInfo ({ commit, getters }, payload) {
      commit('setLoading', true)
      commit('clearError')
      console.log(payload);
      console.log(payload.address);
      console.log(payload.info);
      console.log(getters.user);
      db.collection('user').doc(getters.user).set({ 
        [payload.address] : {
          [payload.info]: firebase.firestore.FieldValue.delete()
        }
      }, {merge: true})
      .then(function() {
        commit('setLoading', false)
        console.log('Delete successful')
      })
      .catch((error) => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      // Create user identifier and user base document
      // Add user to Firebase/Authentication 
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            // Set user to store.state for future use
            const newUser = {
              id: user.user.uid,
              email: user.user.email
            }
            commit('setUser', newUser)
          }
        ).then ( info => {
          console.log(info);
          // Create object with user uid number and payload information for user base document
          let user = firebase.auth().currentUser;
          const userDocInfo = {
            uid: user.uid,
            email: payload.email,
            fname: payload.fname,
            lname: payload.lname,
          }
          // Create user base document with user.uid idintifier
          let key
          db.collection('user').doc(user.uid).set(userDocInfo)
            .then(function(docRef) {
              console.log(docRef);
              key = user.uid
              return key
            })
              .then(key => {
                // Upload user selected image to Firebasse/Storage using user.uid for main folder and user.uid for image name
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('user/' + key + '/' + key + ext).put(payload.image)
              })
                .then(fileData => {
                  // Get image URL and update user base document
                  firebase.storage().ref('/'+fileData.ref.fullPath).getDownloadURL()
                    .then((url) =>{
                      const newUser = {
                        id: user.uid,
                        email: user.email,
                        fname: user.fname,
                        lname: user.lname,
                        image: url
                      }
                      commit('setUser', newUser)
                      // Update user profile (Firebase/Authentication) information
                      firebase.auth().currentUser.updateProfile({
                        displayName: payload.fname,
                        photoURL: newUser.image
                      })
                      // Update user document.img with image URL
                      return db.collection('user').doc(key).update({img: url})
                    })
                    .then(
                      commit('setLoading', false),
                      router.push('/')
                    )
                })
                  .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                  })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    login({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          userData => {
            const newUser = {
              id: userData.user.uid,
              email: userData.user.email,
              fname: userData.user.displayName,
              image: userData.user.photoURL
            }
            commit('setUser', newUser)
            console.log("Loading User Profile...");
            db.collection("user").doc(newUser.id)
              .onSnapshot(res => {
                console.log("This is Res: ",res.data());
                commit('setUserData', res.data())
                commit('setLoading', false)
              })
            console.log("...User profile loaded");
            router.push("/user_profile")
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      db.collection('user').where('uid', '==', payload.uid).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(u) {
          let user = u.data()
          commit('setUser', {
            id: user.uid,
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            image: user.img
          })
        })
      })
      db.collection("user").doc(payload.uid)
        .onSnapshot(res => {
          console.log("This is Res: ",res.data());
          commit('setUserData', res.data())
          commit('setLoading', false)
        })
      
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      const toLogout = {
        id: null,
        email: null,
        fname: null,
        lname: null,
        image: null
      }
      commit('setUser', toLogout)
      console.log("Successfuly logged out");
      router.push('/', () => {})
    },
    checkMissingInfo ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')
      let userID = getters.user
      db.collection('user').where('uid', '==', userID).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(u) {
          let data = u.data()
          let user = {}
          if (data.kids) {
            user.kids = true
          }
          if (data.routines) {
            user.routines = true
          }
          if (data.rewards) {
            user.rewards = true
          }
          console.log('Info checked')
        })
      })
      
    },
    addNewDay ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')
      let userId = getters.user
      let myDate = moment().format('YYMMDD')
      let kids = {}
      let routines = {}
      db.collection('user').doc(userId).get()
        .then(myValues => {
          console.log(myDate)
          let kValue = Object.values(myValues.data().kids)
          let rValue = Object.values(myValues.data().routines)
          for (let k in kValue) {
            let kName = kValue[k]['fname']
            kids[kName] = {
              'fname': kValue[k]['fname'],
              'lname': kValue[k]['lname'],
              'img': kValue[k]['img'],
              'score': kValue[k]['score'],
              'scoreStatus': kValue[k]['scoreStatus'],
              'status': kValue[k]['status']
            }
          }
          for (let r in rValue) {
            console.log(rValue[r].name)
            routines[rValue[r].name] = {
              'img': rValue[r].img,
              'name': rValue[r].name,
              'score': rValue[r].score,
              'status': rValue[r].status,
              'time': rValue[r].time,
              'kids': kids
            }
          }
          console.log("this is kids: ", kids)
          db.collection('user').doc(userId).collection('dailyScore').doc(myDate).set({
            'routines': routines,
            'kids': myValues.data().kids,
            'rewards': myValues.data().rewards
          },{merge: true})
            .then(function() {
              console.log('Write successful')
          })
          .catch((error) => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    })
    },
    clearError({ commit }) {
      commit('clearError')
    },
    loadDailyScores ({ commit }) {
      commit('setLoading', true)
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
          console.log('dailyscore')
          console.log(self.dailyScore['0'].id)
        })
      })
      .catch(function(error) {
        console.log('Error getting document: ', error);
      });
    },
    addRoutine({ commit, getters }, payload) {
      commit('setLoading', true)
      commit('clearError')
      console.log("Creator ID: ", getters.user)
      let creatorId = getters.user
      const routine = {
        name: payload.name,
        score: Number(payload.score),
        status: true,
        time: payload.time
      }
      console.log(routine)
      db.collection('user').doc(creatorId).set({
          routines: {
            [routine.name]: routine
            }
          },
          {merge: true})
        .then(function() {
          console.log('Write succeeded!')
        })
          .then(key => {
            console.log('this is key: ',key)
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref(
              'user/'+
              creatorId +
              '/routines/' +
              routine.name + ext).put(payload.image)
          })
            .then(fileData => {
              console.log(fileData.ref.fullPath)
              firebase.storage().ref('/'+fileData.ref.fullPath).getDownloadURL()
                .then((url) =>{
                  console.log('this is url: ',url)
                  return db.collection('user').doc(creatorId).set({
                    routines: {
                      [routine.name]: {
                        img: url
                      }
                    }
                  },{ merge: true})
                })
                .then(
                  commit('setLoading', false),
                  router.push('/user_profile')
                )
            })
              .catch((error) => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              })
    },
    // Update user profile
    updateUser({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      let key
      // Update user document
      db.collection('user').doc(payload.uid).set({
        email: payload.email,
        fname: payload.fname,
        lname: payload.lname
      },{merge: true})
        .then(function(docRef) {
          console.log('This is docRef: ',docRef)
          key = payload.uid
          return key
        })
          .then(key => {
            // Add new image if available
            if (!payload.image)  {
              commit('setLoading', false)
              const newUser = {
                fname: payload.fname,
                lname: payload.lname
              }
              commit('setUser', newUser)
              router.push('/')
            }
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('user/' + key + '/' + key + ext).put(payload.image)
          })
            .then(fileData => {
              // Get and update the new image URL
              firebase.storage().ref('/'+fileData.ref.fullPath).getDownloadURL()
                .then((url) =>{
                  const newUser = {
                    fname: payload.fname,
                    lname: payload.lname,
                    image: url
                  }
                  commit('setUser', newUser)
                  return db.collection('user').doc(key).update({img: url})
                })
                .then(
                  commit('setLoading', false),
                  router.push('/')
                )
            })
              .catch((error) => {
                commit('setLoading', false)
                // commit('setError', error)
                console.log(error)
              })
    },
    addKid({ commit, getters }, payload) {
      commit('setLoading', true)
      commit('clearError')
      let creatorId = getters.user
      const kid = {
        name: payload.name,
        lname: payload.lname,
        status: true,
        scoreStatus: false,
        score: 0
      }
      console.log("This is Kid: ",kid);
      db.collection('user').doc(creatorId).set({
          kids: {
            [kid.name]: kid
            }
          },
          {merge: true})
        .then(function() {
        })
          .then(key => {
            console.log("This is Key: ",key)
            console.log('This is the image name: ', payload.image.name)
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref(
              'user/'+
              creatorId +
              '/kids/' +
              kid.name + ext).put(payload.image)
          })
            .then(fileData => {
              console.log(fileData.ref.fullPath)
              firebase.storage().ref('/'+fileData.ref.fullPath).getDownloadURL()
                .then((url) =>{
                  console.log('this is url: ',url)
                  return db.collection('user').doc(creatorId).set({
                    kids: {
                      [kid.name]: {
                        img: url
                      }
                    }
                  },{ merge: true})
                })
                .then(
                  commit('setLoading', false),
                  router.push('/')
                )
            })
              .catch((error) => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
              })
    },
    addReward({ commit, getters }, payload) {
      commit('setLoading', true)
      commit('clearError')
      let userId = getters.user
      const reward = {
        name: payload.name,
        score: payload.price,
        status: true
      }
      db.collection('user').doc(userId).set({
          rewards: {
            [reward.name]: reward
            }
          },
          {merge: true})
        .then(function() {
        })
          .then(key => {
            console.log("This is key: ", key);
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref(
              'user/'+
              userId +
              '/rewards/' +
              reward.name + ext).put(payload.image)
          })
            .then(fileData => {
              firebase.storage().ref('/'+fileData.ref.fullPath).getDownloadURL()
                .then((url) =>{
                  return db.collection('user').doc(userId).set({
                    rewards: {
                      [reward.name]: {
                        img: url
                      }
                    }
                  },{ merge: true})
                })
                .then(
                  commit('setLoading', false),
                  )
                })
                .catch((error) => {
                  commit('setLoading', false)
                  commit('setError', error)
                  console.log(error)
                })
      router.push('/user_profile')
    },
  },
  
  getters: {
    user(state) {
      return state.user
    },
    userName(state) {
      return state.userFname
    },
    userImage(state) {
      return state.userImage
    },
    userData(state) {
      return state.userData
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})