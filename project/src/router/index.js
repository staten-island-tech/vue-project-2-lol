import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import HistoryView from "../views/HistoryView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import ChampionsView from "../views/ChampionsView.vue";
import ChampParams from "../views/ChampParams.vue";
import Create from "../views/CreateView.vue";

const routes = [
  {
    path: "/history",
    name: "history",
    component: HistoryView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user",
    name: "user",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/UserView.vue");
    },
  },
  {
    path: "/Champions",
    name: "Chammpions",
    component: ChampionsView,
  },
  {
    path: "/Champions/:name",
    name: "ChampParams",
    component: ChampParams,
  },
  {
    path: "/Create",
    name: "CreateVue",
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
