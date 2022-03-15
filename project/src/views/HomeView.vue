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

		console.log(store.state.user);
	},
};
</script>

<style>

html, body, * {
margin: 0;
padding: 0;
box-sizing: border-box;
font-size: 62.5%;
}

</style>