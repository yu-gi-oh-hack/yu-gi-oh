<template>
    <div>
        <form @submit.prevent="createRoom">
            <label for="nameRoom">Room</label>
            <input type="text" name="nameRoom" id="nameRoom" v-model="name_room">
            <button type="submit">submit</button>
        </form>
        <br>
        <div>
            <div v-for="(room,index) in list_rooms" :key="index">
                <li>{{room.data.room_name}}</li>
                <li>{{room.data.players.length}}/2 players</li>
                <button @click="joinRoom(room)">join</button>
            </div>
        </div>
    </div>
</template>

<script>
    import db from "@/api/firebase"

    export default {
        name: 'createroom',
        data() {
            return {
                name_room: '',
                list_rooms: []
            }
        },
        methods: {
            createRoom() {
                this.list_rooms = []
                console.log('hehehe')
                db.collection("rooms").add({
                        room_name: this.name_room,
                        players: [{
                            player1: {
                                player_name: localStorage.username
                            }
                        }]
                    })
                    .then((docRef) => {
                        console.log(docRef)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getRooms() {
                this.list_rooms = []
                console.log(this.list_rooms,'beforeeeeeeeee')
                db.collection('rooms')
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let room = {
                                id: doc.id,
                                data: doc.data(),
                            }
                            this.list_rooms.push(room)
                            console.log(room,'=========')
                        })
                            // return this.list_rooms.filter(el => el.id !== doc.id)
                        // console.log(doc.data())
                    })
            },
            joinRoom(room) {
                this.list_rooms = []
                db.collection("rooms").doc(room.id)
                    .update({
                        players: [room.data.players[0], {
                            player2: {
                                player_name: localStorage.username
                            }
                        }]
                    })
                    .then(() => {
                        console.log('berhasil')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.getRooms()
        },
        watch:{
            list_rooms(){
                this.list_rooms = this.list_rooms
            }
        }
    }
</script>

<style>

</style>