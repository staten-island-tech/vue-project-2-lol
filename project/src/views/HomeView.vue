<template>
	<div class="search"></div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";

export default {
	name: "HomeView",
	setup() {
		const store = useStore();
		const Champion = store.dispatch("getChamps");
		console.log(store.state.user);
		return{
			Champion
		}
	},
};
</script>
