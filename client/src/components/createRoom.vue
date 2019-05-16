<template>
    <div>
        <form @submit.prevent="createRoom">
            <label for="nameRoom">Room</label>
            <input type="text" name="nameRoom" id="nameRoom" v-model="name_room">
            <button type="submit">submit</button>
        </form>
        <br>
        <div>
            <div v-for="(room,index) in list_rooms2" :key="index">
                <span>{{ index }}.</span>
                <li>{{room.data.room_name}}</li>
                <li>{{room.data.players.length}}/2 players</li>
                <button @click="joinRoom(room)">join</button>
            </div>
        </div>
    </div>
</template>

<script>
    import db from "@/api/firebase"

    function onlyUnique(value, index, self) {
        // console.log(value,'li',index,'ko',self)
        return self.indexOf(value) === index;
    }

    export default {
        name: 'createroom',
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
                        localStorage.setItem('roomlength',count)
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
                        this.getRooms()
                        console.log('berhasil')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
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
                for (let i = 0; i < unique.length; i++){
                    uniqueIndex.push(x.lastIndexOf(unique[i]))
                }
                // console.log([2,5,3].indexOf(2))
                // console.log(uniqueIndex,'iopiop')
                let newest = []
                for(let i = 0; i < uniqueIndex.length; i++){
                    newest.push(this.list_rooms[uniqueIndex[i]])
                }
                this.list_rooms2 = newest
            }
        }
    }
</script>

<style>

</style>