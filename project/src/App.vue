<template>
	<nav>
		<NavbarComp />
		<router-view />
	</nav>
</template>

<script>
import NavbarComp from "./components/NavbarComp.vue";

export default {
	components: { NavbarComp },
};
</script>

<style>
button {
	cursor: pointer;
}

html,
body,
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 62.5%;
	font-family: "Roboto", sans-serif;
}
</style>
