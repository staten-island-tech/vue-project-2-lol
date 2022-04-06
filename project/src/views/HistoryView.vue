<template>
	<div v-if="!loaded">
		<MatchComp />
	</div>
	<div v-else>LOADING...</div>
</template>

<script>
import MatchComp from "../components/MatchComp.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
	components: { MatchComp },
	setup() {
		const store = useStore();
		const loaded = computed(() => store.state.isLoaded);
		let metaData = null;

		return { metaData, store, loaded };
	},
};
</script>

<style scoped>
.loadingimg {
	width: 100vw;
	height: 100vh;
}
</style>
