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
		summonerIcon: "",
		summonerLevel: 0,
		summonerName: "",
		numberOfMatches: 0,
	},
	mutations: {
		updateSummoner(state, name) {
			state.searchName = name;
			console.log(name);
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
		getData() {
			async function getPuuid() {
				try {
					console.log(store.state);

					const apiPuuid = await fetch(
						`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${store.state.searchName}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
					).then(api => api.json());

					const puuid = Object.values(apiPuuid)[2];
					const icon = Object.values(apiPuuid)[4];
					const level = Object.values(apiPuuid)[6];
					const name = Object.values(apiPuuid)[3];

					store.state.puuid = puuid;
					store.state.summonerIcon = icon;
					store.state.summonerLevel = level;
					store.state.summonerName = name;

					// eslint-disable-next-line no-inner-declarations
					async function getAccount() {
						try {
							const apiAccount = await fetch(
								`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${store.state.numberOfMatches}&api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
							).then(api => api.json());

							let apiMatches = [];

							for (const matchID of apiAccount) {
								const apiMatch = await fetch(
									`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
								).then(api => api.json());
								apiMatches.push(apiMatch);
							}

							await console.log(apiMatches);

							store.state.summonerData = apiMatches;

							return apiMatches;
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
