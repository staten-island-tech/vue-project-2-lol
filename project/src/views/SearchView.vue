<template>
	<div class="search">
		<form @submit.prevent="handleSubmit" class="form" id="form">
			<h1 class="header">BETTER.GG</h1>
			<input
				id="summonerName"
				type="text"
				name="summoner"
				v-model="summoner"
				placeholder="Enter Summoner Name"
				spellcheck="false"
				autocomplete="off"
				required
			/>
			<router-link novalidate to="/history" v-on:click="handleSubmit()" id="enterButton">Search</router-link>
		</form>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const summoner = ref("");

		const store = useStore();

		const searchName = computed(() => store.state.searchName);

		const handleSubmit = async () => {
			store.commit("updateSummoner", summoner.value);
		};

		return { handleSubmit, summoner, searchName };
	},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Source+Sans+Pro:wght@700&display=swap");

html,
body,
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 62.5%;

	font-family: "Roboto", sans-serif;
}

:root {
	--main-bg-color: #ecf0f3;
	--search-box-color: #e3e5e9;
	--error-message-color: #ff5148;
}

body {
	background: var(--main-bg-color);
}

.form {
	display: flex;
	align-items: center;
	flex-direction: column;
	row-gap: 4rem;
	font-size: 10rem;
	justify-content: center;
	
}

.header {
	display: block;
	width: 100vw;
	font-size: 15rem;
	text-align: center;
	font-weight: 900;
	margin-bottom: 10rem;
}

#summonerName {
	text-align: center;
	outline: none;
	padding: 3.5rem;
	width: 100rem;
	border: none;
	border-radius: 1rem;
	background-color: var(--search-box-color);
	font-weight: 500;
	color: rgb(58, 58, 58);
}

#enterButton {
	border: none;
	border-radius: 1rem;
	padding: 3rem;
	font-size: 4rem;
	width: 25rem;
	font-weight: 700;
	letter-spacing: 0.25rem;
	color: white;
	background: linear-gradient(135deg, #2b69ee, #9246ee);
}

#enterButton:active {
	transform: scale(0.9, 0.9);
}

#retryButton {
	justify-content: center;
	border: none;
	border-radius: 1rem;
	padding: 3rem;
	font-size: 4rem;
	width: 35rem;
	font-weight: 700;
	letter-spacing: 0.25rem;
	color: white;
	background: linear-gradient(135deg, #2b69ee, #9246ee);
	margin-top: 8rem;
}

#retryButton:active {
	transform: scale(0.9, 0.9);
}

.error {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	row-gap: 4rem;
}

.errorMessage {
	background-color: var(--error-message-color);
	color: rgb(255, 251, 251);
	width: 80vw;
	padding: 6rem;
	font-size: 10rem;
	text-align: center;
	border-radius: 1rem;
	font-weight: 500;
}

.errorMessage2 {
	display: block;
	width: 100vw;
	font-size: 4rem;
	text-align: center;
	font-weight: 400;
	color: #74767c;
}
</style>
