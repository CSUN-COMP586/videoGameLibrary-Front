// this index initializes vuex

import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { auth } from '@/services/fireinit'

// declare vuex-persist plugin
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    tokenStorage: ({token: state.token})
  })
})

const store = () => new Vuex.Store({
  state: () => ({
    user: null,
    token: null
  }),
  plugins: [
    vuexLocalStorage.plugin
  ],
  getters: {
    activeUser: (state) => {
      return state.user
    },
    authToken: (state) => {
      return state.token
    },
    getTokenStorage: (state) => {
      return state.tokenStorage
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
        })
        .then(() => {
          dispatch('registerOnServer', registration)  // call api to register on server           
        })
    },
    registerOnServer ({commit}, registration) {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8080/account/register',
        headers: {'Content-Type': 'application/json'},
        data: registration
      })
      .then(res => console.log(res))      
    },    
    loginToFirebaseAndServer ({commit, dispatch}, credentials) {
      auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(res => {                              
          auth.currentUser.getIdToken()               // get token from firebase
            .then((idToken) => {              
              commit('setUser', auth.currentUser)     // set user state
              commit('setAuthToken', idToken)         // set token state
              // localStorage.setItem('token', idtoken)  // store token in local storage        
            })
            .then(() => {
              dispatch('loginToServer', credentials)  // login to server              
            })
          })
    },
    loginToServer ({commit, state, dispatch}, credentials) {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8080/account/login',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        },
        data: credentials
      })
      .then(res => {console.log(res)})
      .catch(err => {
        console.log('Error logging in to server, logging out of firebase: ', err)
        dispatch('logout')
      })
    },
    logout ({commit}) {
      auth.signOut()
        .then(() => {
          commit('setUser', null)
          commit('setAuthToken', null)
          // localStorage.removeItem('token')
        })        
    }
  }
})

export default store