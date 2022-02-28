import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import HistoryView from "../views/HistoryView.vue";

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
		path: "/user",
		name: "user",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: function () {
			return import(/* webpackChunkName: "about" */ "../views/UserView.vue");
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
