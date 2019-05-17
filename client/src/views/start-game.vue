<template>
  <div>
    <audio autoplay loop>
      <source
        src="https://drive.google.com/file/d/1_ApZ-Oc0J54f8AOUPE-harLbQuEPvE6O/view"
      >
    </audio>

    <div class="container my-4" v-if="!disable">
      <img src="https://media.giphy.com/media/vZRdMe89bFkTm/giphy.gif" alt="waiting">
      <br>
      <p class="waiting">Waiting...another player</p>
    </div>
    <div id="allthethings" v-if="disable">
      <img src="https://images5.alphacoders.com/321/thumb-1920-321887.jpg" id="bg" alt>
      <router-link to="/roomgame">
        <div id="single">START GAME</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "@/api/firebase";
export default {
  data() {
    return {
      disable: false,
      room: {}
    };
  },
  mounted() {
    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        this.room = doc.data();
      });
  },
  watch: {
    room() {
      if (this.room.players.length !== 2) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    }
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Shadows+Into+Light);

/* html { 
  background: url() no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
} */
#bg {
  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
#exit {
  height: 30px;
  width: 30px;
  background: #006680;
  border: 1px solid black;
  border-radius: 50px;
  position: Absolute;
  top: -30px;
  z-index: 50;
  right: -15px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
}
.waiting{
  color: whitesmoke;
    font-family: "Macondo Swash Caps", cursive;

}
#exit:after {
  content: "";
  display: block;
  height: 15px;
  width: 15px;
  background: transparent;
  border-radius: 50px;
  position: absolute;
  top: 5px;
  left: 5px;

  border: 3px solid orange;
  border-top-color: transparent;
}

#exit:before {
  content: "";
  display: block;
  height: 10px;
  width: 3px;
  background: orange;
  z-index: 70;
  position: Absolute;
  right: 13px;
  top: 6px;
}
#circle {
  height: 40px;
  width: 40px;
  background: transparent;
  border: 1px solid white;
  border-radius: 50px;
  position: absolute;
  top: -35px;
  z-index: 40;
  right: -20px;
}

#exit:hover {
  background: #7a0000;
}

#allthethings {
  width: 0px;
  height: 0px;

  border-left: 300px solid transparent;
  border-right: 300px solid transparent;
  border-top: 300px solid transparent;
  border-radius: px;
  position: relative;
  margin: auto;
  top: 5px;
  left: 2px;
}

#single {
  position: relative;
  bottom: 100px;
  right: 300px;
  height: 50px;
  width: 600px;
  background: #006680;
  text-align: center;
  font-size: 50px;
  background-size: 1px 300%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  color: orange;
  font-family: shadows into light;

  cursor: pointer;
}

#single:hover {
  background: #7a0000;
  color: white;
  -webkit-transform: rotate(-1deg);
  transform: rotate(-2deg);
}

#multiplayer:hover {
  background: #7a0000;
  color: white;

  -webkit-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

#credits:hover {
  background: #7a0000;
  color: white;
  -webkit-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

#options:hover {
  background: #7a0000;
  color: white;
  -webkit-transform: rotate(-2deg);
  transform: rotate(-2deg);
}

#left {
  height: 100px;
  width: 600px;
  background: orange;
  position: absolute;
  z-index: 6;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  top: -175px;
  right: -104px;
  border-top: 1px solid white;
}
#right {
  height: 100px;
  width: 600px;
  background: orange;
  position: absolute;
  top: -229px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  z-index: 7;
  left: -56px;
  border-top: 1px solid white;
}

#single p {
  position: relative;
  top: 2px;
  right: 4px;
}

#multiplayer {
  height: 50px;
  width: 500px;
  background: #006680;
  position: relative;
  bottom: 345px;
  right: 240px;
  text-align: center;
  font-size: 30px;
  font-family: shadows into light;
  color: orange;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
}
#multiplayer p {
  position: relative;
  top: 0px;
  right: 9px;
}

#options {
  height: 50px;
  width: 400px;
  background: #006680;
  position: relative;
  bottom: 360px;
  right: 200px;
  font-size: 30px;
  text-align: center;
  font-family: shadows into light;
  color: orange;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
}

#options p {
  position: relative;
  top: 0px;
  right: 4px;
}

#credits {
  height: 50px;
  width: 300px;
  position: relative;
  background: #006680;
  bottom: 375px;
  font-size: 30px;
  right: 150px;
  text-align: center;
  font-family: shadows into light;
  color: orange;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
}

#credits p {
  position: relative;
  top: 0px;
}
</style>
