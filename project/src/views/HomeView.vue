<template>
	<div class="search"></div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import{ getDatabase } from "firebase/database"

export default {
	name: "HomeView",
	setup() {
		const store = useStore();

		console.log(store.state.user);
		console.log(getDatabase())
	},
};
</script>
