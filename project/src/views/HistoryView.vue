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

		const apiAccount = store.dispatch("getData", 5)

		console.log(apiAccount)
		apiAccount.then(function(result){
			console.log(result)
				async function getMatches(){
				try{
					let apiMatches = [];
						for (const matchID of result) {
							const apiMatch = await fetch(
								`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-9cf9768b-d71a-4de2-9214-9fcde75d8a4f`
							).then(api => api.json());
							apiMatches.push(apiMatch);
		console.log(apiMatch);
								}
								return apiMatches;
				}
				catch(error){
					console.log(error)
				}
			}

			getMatches();
		})

					
		

		return { searchName, summonerData };
	},
};
</script>
