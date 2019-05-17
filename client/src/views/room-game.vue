<template>
  <div class="container">
    <div>
      <!-- <form @submit.prevent="createRoom">
        <label for="nameRoom">Room</label>
        <input type="text" name="nameRoom" id="nameRoom" v-model="name_room">
        <button type="submit">create new room!</button>
      </form> -->
      <button
        type="button"
        class="btn btn-primary mt-5"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@getbootstrap"
      >create new room!</button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label"></label>
                  <input type="text" class="form-control" name="nameRoom" id="nameRoom" v-model="name_room">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button @click.prevent="createRoom" type="button" class="btn btn-secondary" data-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>
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
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room,index) in list_rooms2" :key="index">
          <th id="numberRoom" scope="row">{{ index+1 }}</th>
          <td>{{ room.data.room_name }}</td>
          <td>{{room.data.players.length}}/2 players</td>
          <td>
            <button v-if="room.data.players.length == 1" @click="joinRoom(room)">join</button>
            <p v-if="room.data.players.length == 2">Playing</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "@/api/firebase";

function onlyUnique(value, index, self) {
  // console.log(value,'li',index,'ko',self)
  return self.indexOf(value) === index;
}

export default {
  data() {
    return {
      name_room: "",
      list_rooms: [],
      list_rooms2: []
    };
  },
  methods: {
    createRoom() {
      // this.list_rooms = []
      db.collection("rooms")
        .add({
          room_name: this.name_room,
          players: [
            {
              player1: {
                player_name: localStorage.username
              }
            }
          ]
        })
        .then(docRef => {
          this.getRooms();
          this.$router.push({ path: "/startgame/" + docRef.id });
          this.$store.dispatch("addRoomData", docRef);
          console.log("create room success", docRef);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRooms() {
      this.list_rooms = [];
      console.log(this.list_rooms, "opopop");
      db.collection("rooms").onSnapshot(querySnapshot => {
        let count = 1;
        querySnapshot.forEach(doc => {
          let room = {
            id: doc.id,
            data: doc.data()
          };
          this.list_rooms.push(room);
          // this.list_rooms2 = this.list_rooms.slice(-(localStorage.roomlength))
          count++;
        });
        localStorage.setItem("roomlength", count);
        // return this.list_rooms.filter(el => el.id !== doc.id)
        // console.log(doc.data())
      });
    },
    joinRoom(room) {
      // this.list_rooms = []
      db.collection("rooms")
        .doc(room.id)
        .update({
          players: [
            room.data.players[0],
            {
              player2: {
                player_name: localStorage.username
              }
            }
          ]
        })
        .then(data => {
          this.$router.push({ path: "/startgame/" + room.id });
          this.getRooms();
          console.log("berhasil");
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions([
      "addRoomData",
      "changeRoomData" //also supports payload `this.nameOfAction(amount)`
    ])
  },
  mounted() {
    this.list_rooms = [];
    this.getRooms();
  },
  watch: {
    list_rooms() {
      // this.list_rooms = this.list_rooms
      let uniqueIndex = [];
      let x = this.list_rooms.map(el => el.id);
      let unique = x.filter(onlyUnique);
      // console.log(unique,'op')
      // console.log(x,'p')
      for (let i = 0; i < unique.length; i++) {
        uniqueIndex.push(x.lastIndexOf(unique[i]));
      }
      // console.log([2,5,3].indexOf(2))
      // console.log(uniqueIndex,'iopiop')
      let newest = [];
      for (let i = 0; i < uniqueIndex.length; i++) {
        newest.push(this.list_rooms[uniqueIndex[i]]);
      }
      this.list_rooms2 = newest;
    }
  }
};
import { mapActions } from "vuex";
</script>

<style>

@charset "UTF-8";
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300, 400, 700);

tr,
th {
  color: wheat;
  font-family: "Macondo Swash Caps", cursive;
}

body {
  font-weight: 300;
  line-height: 1.42em;
  color: #a7a1ae;
  background-color: #1f2739;
}

h1 {
  font-size: 3em;
  font-weight: 300;
  line-height: 1em;
  font-family: "Macondo Swash Caps", cursive;
  text-align: center;
  color: #4dc3fa;
}

h2 {
  font-size: 1em;
  font-weight: 300;
  text-align: center;
  display: block;
  line-height: 1em;
  padding-bottom: 2em;
  color: #fb667a;
}

h2 a {
  font-weight: 700;
  text-transform: uppercase;
  color: #fb667a;
  text-decoration: none;
}
#numberRoom {
  font-family: "Macondo Swash Caps", cursive;
}
.blue {
  color: #185875;
}
.yellow {
  color: #fff842;
}

.container th h1 {
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  color: #185875;
}

.container td {
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
}

.container {
  text-align: left;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
}

.container td,
.container th {
  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 2%;
}

/* Background-color of the odd rows */
.container tr:nth-child(odd) {
  background-color: #323c50;
}

/* Background-color of the even rows */
.container tr:nth-child(even) {
  background-color: #2c3446;
}

.container th {
  background-color: #1f2739;
}

.container td:first-child {
  color: #fb667a;
}

.container tr:hover {
  background-color: #464a52;
  -webkit-box-shadow: 0 6px 6px -6px #0e1119;
  -moz-box-shadow: 0 6px 6px -6px #0e1119;
  box-shadow: 0 6px 6px -6px #0e1119;
}

.container td:hover {
  background-color: #fff842;
  color: #403e10;
  font-weight: bold;

  box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
  transform: translate3d(6px, -6px, 0);

  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
  .container td:nth-child(4),
  .container th:nth-child(4) {
    display: none;
  }
}
</style>
