<template>
  <v-container fluid>
    <h1>THE COLLECTION</h1>

    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="(game, index) in games"
            :key=index                             
          >
            <v-card            
              height="380px"
              width="550px"
              color="grey darken-2"
            >              
              <v-flex>
                <span v-text="game.GameName"></span>  
              </v-flex>              

              <v-container>                                
                <v-img 
                  :src="game.ImageURL"
                  height="100px"
                  width="100px"
                  style="margin-bottom:10px;"
                >
                </v-img>                
                <v-card
                  height="200px"
                  width="500px"
                  color="grey lighten-3" 
                >
                  <v-container
                    id="scroll-target"
                    style="max-height: 200px;"
                    class="scroll-y"
                  >
                    <v-card-text v-scroll>
                      <span style="color: black">{{ game.Summary }}</span>
                    </v-card-text>                  
                  </v-container>
                </v-card>                                
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  import env from '@/middleware/env'

  export default {
    name: 'Collection',
    data: () => ({
      games: [],
      token: null
    }),
    methods: {
      async getCollectionOfGames() {
        await this.$axios ({
          method: 'get',
          url: env.getGamesAPI,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(res => {
          this.games = res.data.data          
        })
        .catch(err => {
          console.log('Error getting game collection: ', err)
        })
      }
    },
    created() {
      if (this.$store.getters.authToken) {
        this.token = this.$store.getters.authToken
      }
      this.getCollectionOfGames()      
    }
  }
</script>
