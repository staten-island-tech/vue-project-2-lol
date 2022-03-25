<template>
	<Suspense>
		<template>
			<MatchComp />
		</template>
		<template>
			<img
				class="loadingimg"
				src="https://media.istockphoto.com/vectors/activity-download-or-load-process-sign-data-loading-bar-froze-or-vector-id1203769610?k=20&m=1203769610&s=170667a&w=0&h=sh3F71aAr18McMQjyKthnYIjgYNPJdhGb4zM6ZOkzMc="
			/>
		</template>
	</Suspense>
</template>

<script>
import MatchComp from "../components/MatchComp.vue";
import { useStore } from "vuex";

export default {
	components: { MatchComp },
	setup() {
		const store = useStore();
		let metaData = null;

		return { metaData, store };
	},
};
</script>

<style scoped>
.loadingimg {
	width: 100vw;
	height: 100vh;
}
</style>
