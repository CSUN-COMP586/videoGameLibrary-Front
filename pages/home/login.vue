<template>
  <v-container fluid>
    <h3 alight='center'>Login</h3>        
    <v-text-field label="E-mail Address" v-model="email"></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-btn @click.native="handleSubmit">Submit</v-btn>
  </v-container>
</template>

<script>
import { auth } from '@/services/fireinit'

  export default {
    name: 'Login',
    data: () => ({
      email: '',
      password: '',
      idToken: '',
      loginResponse: ''
    }),
    methods: {            
      handleSubmit() {
        auth.signInWithEmailAndPassword(this.email, this.password).then(res => { // sign in to firebase
          this.getIdToken()
        }).catch(err => {console.log(err)})
      },
      getIdToken() {
        auth.currentUser.getIdToken(true).then(res => { // get id token
          this.idToken = res
          this.handleApiLogin()
        }).catch(err => {console.log(err)})
      },
      handleApiLogin() {
        this.$axios ({
          method: 'post',
          url: 'http://localhost:8080/account/login',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.idToken
            },
          data: {            
            password: this.password,            
          }
        }).then(res => {          
          this.loginResponse = res.data          
          if (this.loginResponse['message'] == true) {
            this.$router.push('/u/account/collection')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }  
</script>