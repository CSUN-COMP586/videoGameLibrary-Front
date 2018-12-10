<template>
  <v-container fluid >
    <v-layout wrap justify-center align-center>
      <v-flex lg4>
        <v-card>
          <v-toolbar>
            <v-text-field
              label="Search"
              hint="Search for a video game..."
              v-model="searchQuery"
            ></v-text-field>

            <v-btn @click.native="onSearch">Search</v-btn>
          </v-toolbar>
        </v-card>
        
        <v-card>
          <v-card-title>Test Results</v-card-title>
          <v-card-text>{{ searchResults }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'Home',
    data: () => ({
      searchQuery: '',
      cleanedQuery: '',
      searchResults: '',
      token: null
    }),    
    methods: {
      async searchForGame() {  // search for a video game using IGDB api
        await this.$axios ({
          method: 'get',
          url: 'http://localhost:8080/search/game/' + this.cleanedQuery,  // testing
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
            }
        }).then(res => {
          this.searchResults = res.data;                    
        }).catch(err => {
          console.log(err);
        })
      },
      onSearch() {  // check for empty query and clean query and call search endpoint 
        if (this.$store.getters.authToken) {
          this.token = this.$store.getters.authToken          
        }
        else {
          this.token = this.$store.getters.getTokenStorage          
        }        
        if (this.searchQuery == '') {return} 
        else {
          this.cleanedQuery = this.searchQuery.replace(/[^A-Z0-9]+/ig, '+')                
          this.searchForGame()
        }
      }      
    }
  };
</script>