<template>
  <v-list-tile> 
    <v-list-tile-content>
      <v-list-tile-title class="test">{{ name }}</v-list-tile-title>  
    </v-list-tile-content>    
    <v-list-tile-action>
      <v-btn left small flat @click.native="onAdd">Add</v-btn>
    </v-list-tile-action>    
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
    methods: {
      onAdd() {        
      }
    }
  }
</script>

<style scoped>
  .test {
    width: 100%
  }
</style