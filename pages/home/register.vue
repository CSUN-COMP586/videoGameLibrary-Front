<template>
  <v-container fluid>
    <h3 alight='center'>Register Account</h3>    
    <v-text-field label="Username" v-model="username"></v-text-field>
    <v-text-field label="First Name" v-model="firstName"></v-text-field>
    <v-text-field label="Last Name" v-model="lastName"></v-text-field>
    <v-text-field label="Date Of Birth" v-model="dateOfBirth"></v-text-field>
    <v-text-field label="E-mail Address" v-model="email"></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-btn @click.native="handleSubmit">Submit</v-btn>
  </v-container>
</template>

<script>
  import moment from 'moment'    

  export default {
    name: 'Register',
    data: () => ({
      uid: '',
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      refreshToken: ''            
    }),
    computed: {
      user () {
        return this.$store.getters.activeUser
      },
      token () {
        return this.$store.getters.authToken
      }
    },
    watch: {
      user (value) {
        if (value) {
          this.$router.push('/home/login')
        }
      }
    },
    methods: {
      async handleSubmit() {
        this.handleFormValidation()

        await this.$store.dispatch('registerOnFirebaseAndServer', {
          'uid': '',
          'username': this.username,
          'firstname': this.firstName,
          'lastname': this.lastName,
          'dateofbirth': this.dateOfBirth,
          'email': this.email,
          'password': this.password,
          'refreshtoken': ''
        })
      },
      handleFormValidation() {
        this.dateOfBirth = moment(this.dateOfBirth).format('YYYY-MM-DD')    
      }
    }    
  };
</script>
