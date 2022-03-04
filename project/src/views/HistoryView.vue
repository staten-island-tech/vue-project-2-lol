<template>
	<div class="history">
		<h1>{{ name }}</h1>
		<h1>{{ level }}</h1>
		<h1>{{ puuid }}</h1>
		<img :src="iconURL()">
		<div v-for="match in summonerData" :key="match">
			{{champName}}
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
		const icon = computed(() => store.state.summonerIcon);
		const level = computed(() => store.state.summonerLevel);
		const puuid = computed(() => store.state.puuid);
		const iconURL = (() => `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${icon.value}.png`)
		const apiMatches = store.dispatch("getData");
		store.state.numberOfMatches = 10;
		const champName = summonerData.value.forEach(function (item) { item.info.participants.filter(summoner => summoner.summonerName.value === name.value)[0]});
		return { icon, name, summonerData, apiMatches, level, puuid, iconURL, champName};
	},

};
</script>


<style>

.history{
	font-size: 20em;
}

</style>