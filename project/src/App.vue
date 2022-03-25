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
</style>
