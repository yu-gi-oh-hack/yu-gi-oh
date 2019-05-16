<template>
  <div id="app">
    <createuser v-if="!username" @newplayermasuk="newplayer"></createuser>
    <createroom v-if="username"></createroom>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import db from '@/api/firebase'
import createroom from '@/components/createRoom'
import createuser from '@/components/createUser'

export default {
  components: {
    createroom,
    createuser
  },
  data(){
    return {
      username: null
    }
  },
  methods: {
    newplayer(v){
      this.username = v 
    }
  },
  created(){
    this.username = localStorage.username

  }
}
</script>
