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
		const getDB = store.commit("readUserChamps")
		return{store, getChamps, getDB}
	},
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
@media (max-width: 420px){
	
}
</style>
