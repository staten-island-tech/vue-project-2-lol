<template>
	<div class="search">
		<form @submit.prevent="handleSubmit" class="form" id="form">
			<h1 class="heading">BETTER.GG</h1>
			<input id="summonerName" type="text" name="summoner" v-model="summoner" placeholder="Enter Summoner Name" spellcheck="false" autocomplete="off" required />
			<button
				novalidate
				v-on:click="
					handleSubmit();
					toHistory();
				"
				id="enterButton"
			>
				Search
			</button>
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
	methods: {
		toHistory: function () {
			if (this.searchName != undefined) {
				this.$router.push({ name: "history" });
			}
		},
	},
};
</script>

<style scoped>
.form {
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	row-gap: 4rem;
	font-size: 10rem;
	justify-content: center;
}

.heading {
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
	background-color: #e3e5e9;
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

@media (max-width: 1100px) {
	.heading {
		font-size: 10rem;
	}
	.form {
		margin-left: 8%;
		font-size: 7rem;
	}
	#summonerName {
		width: 70rem;
		padding: 3rem;
	}
	#enterButton {
		padding: 2.5rem;
		font-size: 3.5rem;
		letter-spacing: 0.1rem;
	}
}

@media (max-width: 800px) {
	.heading {
		margin-top: 2rem;
		font-size: 8rem;
	}
	.form {
		font-size: 5rem;
	}
	#summonerName {
		width: 50rem;
		padding: 2.5rem;
	}
	#enterButton {
		width: 20rem;
		padding: 2rem;
		font-size: 3.5rem;
		letter-spacing: 0.05rem;
	}
}
@media (max-width: 550px) {
	.heading {
		margin-bottom: 4rem;
		font-size: 6rem;
	}
	.form {
		font-size: 4rem;
	}
	#summonerName {
		width: 40rem;
		padding: 2rem;
	}
	#enterButton {
		width: 18rem;
		padding: 1.6rem;
		font-size: 2.5rem;
	}
}
@media (max-width: 420px) {
	.heading {
		font-size: 5rem;
	}
	#summonerName {
		margin-left: -10%;
		font-size: 2rem;
		width: 100vw;
	}
}
</style>
