<template>
  <v-app dark>    
    <v-toolbar      
      fixed
      app
      flat
    > 
      <v-btn small flat @click.native="toLandingPage" color="teal accent-4">Landing</v-btn>
      <v-btn small flat @click.native="toCollectionPage" color="teal accent-4">Collection</v-btn>
      <v-btn small flat @click.native="toSearchPage" color="teal accent-4">Search</v-btn>
      <v-spacer></v-spacer>
      <v-btn small flat @click.native="toRegisterPage" color="teal accent-4">Register</v-btn>
      <v-btn small flat v-if="value" @click.native="toLoginPage" color="teal accent-4">Login</v-btn>   
      <v-btn small flat @click.native="handleLogout" color="teal accent-4">Logout</v-btn>
    </v-toolbar>    

    <v-content>
      <nuxt-child />
    </v-content>

    <v-footer      
      app
      flat
    >
      <span>&copy; Kevin Enario</span>
    </v-footer>
  </v-app>
</template>

<script>
  import store from '@/store'    

  export default {    
    data: () => ({
      value: true
    }),
    computed: {
      user () {
        return this.$store.getters.activeUser
      }
    },
    watch: {
      user (value) {  // handles login button visibility on login
        if (value) {
          this.value = false
        }
      }
    },
    created() {
      if (this.$store.getters.authToken) {  // handles login button visibility on reload
       this.value  = false 
      }
    },
    methods: {
      toLandingPage() {
        this.$router.push('/')        
      },
      toCollectionPage() {
        this.$router.push('/u/collection')        
      },
      toSearchPage() {
        this.$router.push('/u/search')        
      },
      toRegisterPage() {
        this.$router.push('/home/register')
      },
      toLoginPage() {
        this.$router.push('/home/login')
      },
      async handleLogout() {
        await this.$store.dispatch('logout')
        .then(() => {          
          this.$router.push('/home/login')
          })
        .catch(err => {console.log('error logging out.', res)})
      }
    }
  }
</script>
