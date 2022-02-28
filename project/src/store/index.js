import { createStore } from "vuex";

export default createStore({
	state: {
		user: null,
		searchName: "",
		summonerData: [],
		puuid: 0,
	},
	getters: {},
	mutations: {
		updateSummoner(state, name) {
			state.searchName = name;
		},
		setUser(state, payload){
			state.user = payload
			console.log("user state changed:", state.user);
			
		}
	},
	actions: {
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
							)
							
							return apiAccount;
							
						} catch (error) {
							console.log(error);
						}
					}
					getAccount();
				} catch (error) {
					console.log(error);
				}
			}
			getPuuid();
		},
	},
});
