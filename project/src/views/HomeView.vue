<template>
	<div class="search">
		<p>{{ uid }}</p>
	</div>
</template>

<script>
// @ is an alias to /src
import { computed } from "vue";
import { useStore } from "vuex";
import{ getDatabase } from "firebase/database"

export default {
	name: "HomeView",
	setup() {
		const store = useStore();

		const uid = computed(() => store.state.user.uid)
		console.log(getDatabase())

		return { uid }
	},
};
</script>
