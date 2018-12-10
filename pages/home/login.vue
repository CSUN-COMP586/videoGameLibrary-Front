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
    }),
    computed: {
      user () {
        return this.$store.getters.activeUser
      }
    },
    watch: {
      user (value) {
        if (value) {
          this.$router.push('/u/collection')
        }
      }
    },
    methods: {
      async handleSubmit() {
        await this.$store.dispatch('loginToFirebaseAndServer', {
          'email': this.email,
          'password': this.password
        })
        .then(() => {
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          console.log('Error logging in.', err)
        })
      }
    }
  }  
</script>