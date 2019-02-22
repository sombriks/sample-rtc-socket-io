import Vue from "vue";
import Router from "vue-router";
import Lobby from "./views/Lobby.vue";
import Match from "./views/Match.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/lobby" },
    { path: "/lobby", component: Lobby },
    { path: "/match", component: Match }
  ]
});
