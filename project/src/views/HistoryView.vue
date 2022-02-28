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

		return { searchName, summonerData };
	},
};
</script>
