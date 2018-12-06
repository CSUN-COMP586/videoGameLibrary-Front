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
    setUser (state, registration) {
      state.user = registration
    },
    setAuthToken (state, registration) {
      state.token = registration
    }
  },
  actions: {    
    registerOnFirebaseAndServer ({commit, dispatch}, registration) {
      auth.createUserWithEmailAndPassword(registration.email, registration.password)
        .then(res => {
          registration.uid = res['user']['uid']                     // get the uid and refresh token from firebase
          registration.refreshtoken = res['user']['refreshToken'] 

          res.user.getIdToken()
            .then((idToken) => {
              commit('setUser', res.user)
              commit('setAuthToken', idToken)
              console.log(registration)
              dispatch('registerOnServer', registration)
            })
            .catch(err => console.log('Error with retrieving firebase token: ' + err))
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
  //     auth.createUserWithEmailAndPassword(this.email, this.password).then(res => { // handles registration on firebase         
  //       this.refreshToken = res['user']['refreshToken']
  //       this.uid = res['user']['uid']          
  //       if (this.uid) {                 // if firebase returned a uid, validate form and register on server as well
  //         this.handleFormValidation()
  //         this.handleApiRegistration()
  //       }          
  //     }).catch(err => {console.log(err)})        
  //   },
  //   async handleApiRegistration() {
  //     await this.$axios ({
  //       method: 'post',
  //       url: 'http://localhost:8080/account/register',
  //       headers: {'Content-Type': 'application/json'},
  //       data: {
  //         uid: this.uid,
  //         username: this.username,
  //         firstname: this.firstName,
  //         lastname: this.lastName,
  //         dateofbirth: this.formattedDate,
  //         email: this.email,
  //         password: this.password,
  //         refreshtoken: this.refreshToken
  //       } 
  //     }).then(res => {          
  //       this.registrationResponse = res.data
  //       if (this.registrationResponse['status'] == true) {
  //         this.$router.push('/home/login')
  //       }
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   },
  //   handleFormValidation() {  // handles form validations
  //     this.formattedDate = moment(this.dateOfBirth).format('YYYY-MM-DD')        
  //   }
