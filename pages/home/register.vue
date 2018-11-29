<template>
  <v-container fluid>
    <h3 alight='center'>Register Account</h3>    
    <v-text-field label="Username" v-model="username"></v-text-field>
    <v-text-field label="First Name" v-model="firstName"></v-text-field>
    <v-text-field label="Last Name" v-model="lastName"></v-text-field>
    <v-text-field label="Date Of Birth" v-model="dateOfBirth"></v-text-field>
    <v-text-field label="E-mail Address" v-model="email"></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
  </v-container>
</template>

<script>
  export default {
    name: 'Register',
    data: () => ({
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: ''
    })
  };
</script>
