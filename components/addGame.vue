<template>
  <v-list-tile> 
    <v-list-tile-content>
      <v-list-tile-title class="test">{{ name }}</v-list-tile-title>  
    </v-list-tile-content>    
    <v-list-tile-action>
      <v-btn left small flat color="teal accent-4" @click.native="onAdd">Add</v-btn>
    </v-list-tile-action>
    
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-text>Game added to collection.</v-card-text>
      </v-card>
    </v-dialog>
  </v-list-tile>
</template>

<script>
  export default {    
    props: {
      id: Number,
      name: String,
      summary: String,
      cover: Object            
    },    
    data: function() {
      return {
        token: null,
        dialog: false
      }
    },
    methods: {
      async addGameToServer() {
        await this.$axios ({
          method: 'post',
          url: 'http://localhost:8080/game/add',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          },
          data: {
            'gameid': this.id,
            'gamename': this.name,
            'summary': this.summary,
            'imageurl': this.cover.url
          }
        })
        .then(res => {          
          console.log(res)
        })
        .catch(err => {
          console.log('Error adding game to server: ', err)
        })
      },
      onAdd() {
        if (this.$store.getters.authToken) {
          this.token = this.$store.getters.authToken
        }
        this.addGameToServer()
        this.dialog = true
      }
    }
  }
</script>

<style>
  .test {
    width: 100%
  }
</style