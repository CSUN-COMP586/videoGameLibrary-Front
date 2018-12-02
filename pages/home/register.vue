<template>
  <v-container fluid>
    <h3 alight='center'>Register Account</h3>    
    <v-text-field label="Username" v-model="username"></v-text-field>
    <v-text-field label="First Name" v-model="firstName"></v-text-field>
    <v-text-field label="Last Name" v-model="lastName"></v-text-field>
    <v-text-field label="Date Of Birth" v-model="dateOfBirth"></v-text-field>
    <v-text-field label="E-mail Address" v-model="email"></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-btn @click.native="formValidation">Submit</v-btn>
  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'Register',
    data: () => ({
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      formattedDate: '',
      registrationResponse: ''
    }),
    methods: {
      async submitRegistration() {
        await this.$axios ({
          method: 'post',
          url: 'http://localhost:8080/account/register',
          headers: {'Content-Type': 'application/json'},
          data: {
            username: this.username,
            firstname: this.firstName,
            lastname: this.lastName,
            dateofbirth: this.formattedDate,
            email: this.email,
            password: this.password            
          } 
        }).then(res => {
          this.registrationResponse = res.data;
          console.log(this.registrationResponse)
        }).catch(err => {
          console.log(err);
        })
      },
      formValidation() {
        this.formattedDate = moment(this.dateOfBirth).format('YYYY-MM-DD')        

        this.submitRegistration()
      }
    }
  };
</script>
