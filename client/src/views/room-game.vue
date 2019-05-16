<template>
  <div class="container">
    <div>
      <form @submit.prevent="createRoom">
        <label for="nameRoom">Room</label>
        <input type="text" name="nameRoom" id="nameRoom" v-model="name_room">
        <button type="submit">create new room!</button>
      </form>
    </div>
    <div>
      <h1 style="diplay:flex; justify-content: center">ROOM</h1>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Room</th>
          <th scope="col">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room,index) in list_rooms2" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ room.data.room_name }}</td>
          <td>{{room.data.players.length}}/2 players</td>
          <td>
            <button v-if="room.data.players.length == 1" @click="joinRoom(room)">join</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import db from "@/api/firebase"

  function onlyUnique(value, index, self) {
    // console.log(value,'li',index,'ko',self)
    return self.indexOf(value) === index;
  }

  export default {
    data() {
      return {
        name_room: '',
        list_rooms: [],
        list_rooms2: []
      }
    },
    methods: {
      createRoom() {
        // this.list_rooms = []
        db.collection("rooms").add({
            room_name: this.name_room,
            players: [{
              player1: {
                player_name: localStorage.username
              }
            }]
          })
          .then((docRef) => {
            this.getRooms()
            this.$router.push({path: '/startgame/'+docRef.id})
            this.$store.dispatch('addRoomData', docRef)           
            console.log('create room success', docRef)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getRooms() {
        this.list_rooms = []
        console.log(this.list_rooms, 'opopop')
        db.collection('rooms')
          .onSnapshot((querySnapshot) => {
            let count = 1
            querySnapshot.forEach((doc) => {
              let room = {
                id: doc.id,
                data: doc.data(),
              }
              this.list_rooms.push(room)
              // this.list_rooms2 = this.list_rooms.slice(-(localStorage.roomlength))
              count++
            })
            localStorage.setItem('roomlength', count)
            // return this.list_rooms.filter(el => el.id !== doc.id)
            // console.log(doc.data())
          })
      },
      joinRoom(room) {
        // this.list_rooms = []
        db.collection("rooms").doc(room.id)
          .update({
            players: [room.data.players[0], {
              player2: {
                player_name: localStorage.username
              }
            }]
          })
          .then((data) => {
            this.$router.push({path: '/startgame/'+room.id})
            this.getRooms()
            console.log('berhasil')
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapActions([
        'addRoomData',
        'changeRoomData' //also supports payload `this.nameOfAction(amount)` 
      ])
    },
    mounted() {
      this.list_rooms = []
      this.getRooms()
    },
    watch: {
      list_rooms() {
        // this.list_rooms = this.list_rooms
        let uniqueIndex = []
        let x = this.list_rooms.map(el => el.id)
        let unique = x.filter(onlyUnique)
        // console.log(unique,'op')
        // console.log(x,'p')
        for (let i = 0; i < unique.length; i++) {
          uniqueIndex.push(x.lastIndexOf(unique[i]))
        }
        // console.log([2,5,3].indexOf(2))
        // console.log(uniqueIndex,'iopiop')
        let newest = []
        for (let i = 0; i < uniqueIndex.length; i++) {
          newest.push(this.list_rooms[uniqueIndex[i]])
        }
        this.list_rooms2 = newest
      }
    }
  }
  import { mapActions } from 'vuex'
  
</script>

<style>

</style>
