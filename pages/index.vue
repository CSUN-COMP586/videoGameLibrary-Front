<template>
  <v-container fluid>
    <v-layout
      column
      justify-center
      align-center>
      <v-flex
        xs12
        sm8
        md6>
        <div class="text-xs-center">
          <logo/>
          <vuetify-logo/>
        </div>
        <v-card>
          <v-card-title><h3>Video Game Collection</h3></v-card-title>
          <v-card-text>
            Welcome to Kevin Enario's CSUN-COMP586 final project.<br> 
            The goal of this class was to teach Object Oriented Software Development<br>
            principles as well as develop an application using those principles.<br>          
          </v-card-text>                      

          <v-card-title><h3>Requirements:</h3></v-card-title>
          <v-card-text>
            Model-View-Controller architecture<br> 
            Object Relational Mapping<br>
            Dependency Injection<br>
            Single Page Application<br>
            Authentication with JSON Web Token<br>
          </v-card-text>

          <v-card-title><h3>Technology Used:</h3></v-card-title>
          <v-card-text>
            Front end:<br> 
            Nuxt (Scaffolding), Vue, Vue-Router, Vuex (state),<br> 
            Firebase (auth), Axios (API)<br>
            <br>
            Back end:<br>
            Go, PostgresSQL, GORM (ORM), Gorilla/Mux (Routing)<br>
            net/http (API), Firebase (auth)<br>            
          </v-card-text>

          <v-card-title><h3>Instructions: </h3></v-card-title>
          <v-card-text>
            Registration has not been fleshed out.  If you register,<br>
            you don't need email confirmation so test emails can be used.<br>
            After registration click logout and log back in.<br>
            <br>
            1.  Login<br>
            2.  You should be redirected to the collection page.<br>
            3.  You can use the buttons on the navbar to navigate.<br>
            4.  You can search for a video game on the search page.<br>
            5.  Clicking add will add the game to your collection.<br>            
          </v-card-text>

          <v-card-title><h3>Notes:</h3></v-card-title>
          <v-card-text>
            More information regarding how this web application was<br>
            built can be found at repository below:<br>
            <a class="link" href="https://github.com/CSUN-COMP586">Github Repository</a>            
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

<style scoped>
  .link {
    color: white;

  }
  .link:hover {
    color: lightblue;
  }
</style>
