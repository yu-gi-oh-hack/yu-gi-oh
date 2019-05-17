import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    changeRoomData(state,data){
      //state.jokes3.push(data)
      state.rooms = data
    },
    addRoomData(state,data){
      state.rooms.push(data)
    }
  },
  actions: {
    changeRoomData(context,data){
      context.commit("changeRoomData",data)
    },
    addRoomData(context,data){
      context.commit('addRoomData',data)
    }
  }
});
