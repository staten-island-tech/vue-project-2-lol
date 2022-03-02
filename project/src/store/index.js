import { createStore } from "vuex";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const store = createStore({
	state: {
		user: null,
		authIsReady: false,
		searchName: "",
		summonerData: [],
		puuid: 0,
	},
	getters: {},
	mutations: {
		updateSummoner(state, name) {
			state.searchName = name;
		},
		setUser(state, payload) {
			state.user = payload;
			console.log("user state changed:", state.user);
		},
		setAuthIsReady(state, payload) {
			state.authIsReady = payload;
		},
	},
	actions: {
		async signup(context, { email, password }) {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			if (res) {
				context.commit("setUser", res.user);
			} else {
				throw new Error("unable to sign up");
			}
		},
		async login(context, { email, password }) {
			const res = await signInWithEmailAndPassword(auth, email, password);
			if (res) {
				context.commit("setUser", res.user);
			} else {
				throw new Error("unable to login");
			}
		},
		async logout(context) {
			await signOut(auth);
			context.commit("setUser", null);
		},
		getData(state, count) {
			async function getPuuid() {
				try {
					const apiPuuid = await fetch(
						`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${state.searchName}?api_key=RGAPI-441d0efb-2665-4289-8531-b137b7983d30`
					).then(api => api.json());
					const puuid = Object.values(apiPuuid)[2];
					console.log(puuid);
					state.puuid = puuid;

					// eslint-disable-next-line no-inner-declarations
					async function getAccount() {
						try {
							const apiAccount = await fetch(
								`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=RGAPI-441d0efb-2665-4289-8531-b137b7983d30`
							);

							return apiAccount;
						} catch (error) {
							console.log(error);
						}
						getPuuid().then(function(result){
							return result
						})
			}
			
		}
		catch(error){
				console.log(error)
			}
	}
}
	}
});

const unsub = onAuthStateChanged(auth, user => {
	store.commit("setAuthIsReady", true);
	store.commit("setUser", user);
	unsub();
});

export default store;