import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

Vue.use(Vuex);

export const sock = io("127.0.0.1:3001/lobby");

const guest = { name: `Guest_${new Date().getTime()}` };

sock.emit("new-guest", guest);

export default new Vuex.Store({
  state: { sock, guest },
  mutations: {},
  actions: {}
});
