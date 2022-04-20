<template>
	<nav>
		<NavbarComp />
		<router-view />
	</nav>
</template>

<script>
import NavbarComp from "./components/NavbarComp.vue";
import {useStore } from "vuex";

export default {
	setup(){
		const store = useStore(); 
		const getChamps = store.dispatch("getChamps")
		return{store, getChamps}
	},
	components: { NavbarComp },
};
</script>

<style>

</style>
