<template>
	<div class="history">
		<h1>{{ searchName }}</h1>
		<h1>{{ summonerData }}</h1>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();

		const searchName = computed(() => store.state.searchName);
		const summonerData = computed(() => store.state.summonerData);
		console.log(summonerData);

		const apiAccount = store.dispatch("getData", 5);

		apiAccount.then(api => api.json());

		async function getMatches() {
			try {
				let apiMatches = [];
				for (const matchID of apiAccount) {
					const apiMatch = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
					).then(api => api.json());
					apiMatches.push(apiMatch);
					console.log(apiMatch);
				}
				return apiMatches;
			} catch (error) {
				console.log(error);
			}
		}

		getMatches();

		return { searchName, summonerData };
	},
};
</script>
