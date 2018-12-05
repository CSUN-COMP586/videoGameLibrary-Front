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
  import { auth } from '@/services/fireinit'

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
      formattedDate: '',
      registrationResponse: '',
    }),
    methods: {      
      handleSubmit() {
        auth.createUserWithEmailAndPassword(this.email, this.password).then(res => { // handles registration on firebase         
          this.uid = res['user']['uid']          
          if (this.uid) {                 // if firebase returned a uid, validate form and register on server as well
            this.handleFormValidation()
            this.handleApiRegistration()
          }          
        }).catch(err => {console.log(err)})        
      },
      async handleApiRegistration() {
        await this.$axios ({
          method: 'post',
          url: 'http://localhost:8080/account/register',
          headers: {'Content-Type': 'application/json'},
          data: {
            uid: this.uid,
            username: this.username,
            firstname: this.firstName,
            lastname: this.lastName,
            dateofbirth: this.formattedDate,
            email: this.email,
            password: this.password            
          } 
        }).then(res => {
          this.registrationResponse = res.data
          if (this.registrationResponse['status'] == true) {
            this.$router.push('/home/login')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleFormValidation() {  // handles form validations
        this.formattedDate = moment(this.dateOfBirth).format('YYYY-MM-DD')        
      }      
    } 
  };
</script>
