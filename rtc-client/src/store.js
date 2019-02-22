import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

Vue.use(Vuex);

export const sock = io("127.0.0.1:3001/lobby");

const guest = {name: `Guest_${new Date().getTime()}`};

const players = [];

const store = new Vuex.Store({
  state: {sock, guest, players},
  mutations: {
    updateGuest(state, guest) {
      state.guest = guest;
    },
    updatePlayers(state, players) {
      state.players = players;
    },
    moveTo(state, pos) {
      sock.emit("move-to", pos);
    },
  },
  actions: {},
});

sock.emit("new-guest", guest, g => {
  store.commit("updateGuest", g);
});

sock.on("list-players", players => {
  store.commit("updatePlayers", players);
});

window.addEventListener("beforeunload", _ => {
  sock.emit("bye-bye");
});

export default store;
