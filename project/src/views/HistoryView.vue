<template>
	<div class="history">
		<h1>{{ name }}</h1>
		<h1>{{ level }}</h1>
		<h1>{{ puuid }}</h1>
		<img :src="icon">
		<div v-for="match in summonerData" :key="match">
			{{ match.metadata.matchId }}
		</div>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();

		const name = computed(() => store.state.summonerName);
		const summonerData = computed(() => store.state.summonerData);
		const icon = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${computed(() => store.state.summonerIcon)}.png`
		const level = computed(() => store.state.summonerLevel);
		const puuid = computed(() => store.state.puuid);

		const apiMatches = store.dispatch("getData");
		store.state.numberOfMatches = 10;

		return { icon, name, summonerData, apiMatches, level, puuid };
	},
};
</script>


<style>

.history{
	font-size: 20em;
}

</style>