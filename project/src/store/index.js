import { createStore } from "vuex";

export default createStore({
	state: {
		searchName: "",
		summonerData: [],
		puuid: 0,
	},
	getters: {},
	mutations: {
		updateSummoner(state, name) {
			state.searchName = name;
		},
	},
	actions: {
		getData(state) {
			async function getPuuid() {
				try {
					const apiPuuid = await fetch(
						`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${state.searchName}?api_key=RGAPI-9cf9768b-d71a-4de2-9214-9fcde75d8a4f`
					).then(api => api.json());
					const puuid = Object.values(apiPuuid)[2];
					console.log(puuid);
					state.puuid = puuid;

					// eslint-disable-next-line no-inner-declarations
					async function getAccount() {
						try {
							const apiAccount = await fetch(
								`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=RGAPI-9cf9768b-d71a-4de2-9214-9fcde75d8a4f`
							).then(api => api.json());

							let apiMatches = [];

							for (const matchID of apiAccount) {
								const apiMatch = await fetch(
									`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-9cf9768b-d71a-4de2-9214-9fcde75d8a4f`
								).then(api => api.json());
								apiMatches.push(apiMatch);
                console.log(apiMatch);
							}

							state.summonerData = apiMatches;
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
