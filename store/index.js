// this index initializes vuex

import Vuex from 'vuex'
import { auth } from '@/services/fireinit'

const store = () => new Vuex.Store({
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    activeUser: (state) => {
      return state.user
    },
    authToken: (state) => {
      return state.token
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setAuthToken (state, payload) {
      state.token = payload
    }
  },
  actions: {    
    registerOnFirebaseAndServer ({commit, dispatch}, registration) {
      auth.createUserWithEmailAndPassword(registration.email, registration.password)
        .then(res => {
          registration.uid = res['user']['uid']        // get the uid and refresh token from firebase
          registration.refreshtoken = res['user']['refreshToken'] 

          commit('setAuthToken', '1');                // set value to non-empty for routing
          dispatch('registerOnServer', registration)  // call api to register on server 
        })         
        .catch(err => console.log('Error with creating firebase user: ' + err))
    },
    registerOnServer ({commit}, registration) {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8080/account/register',
        headers: {'Content-Type': 'application/json'},
        data: registration
      })
      .then(res => console.log(res))
      .catch(err => console.log('Error with server login: ' + err))
    }    
  }

})

export default store

// handleSubmit() {
//   auth.signInWithEmailAndPassword(this.email, this.password).then(res => { // sign in to firebase
//     this.getIdToken()                 
//   }).catch(err => {console.log(err)})
// },
// getIdToken() {
//   auth.currentUser.getIdToken(true).then(res => { // get id token
//     this.idToken = res          
//     this.handleApiLogin()
//   }).catch(err => {console.log(err)})
// },
// handleApiLogin() {
//   this.$axios ({
//     method: 'post',
//     url: 'http://localhost:8080/account/login',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + this.idToken
//       },
//     data: {            
//       password: this.password            
//     }
//   }).then(res => {              
//     this.loginResponse = res.data          
//     if (this.loginResponse['message'] == true) {
//       this.$router.push('/u/account/collection')
//     }
//   }).catch(err => {
//     console.log(err)
//   })
// }