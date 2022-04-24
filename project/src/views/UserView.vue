<template>
	<div class="user">
		<button
			v-for="{ icon, level, name } in accountData"
			:key="name"
			v-on:click="
				handleSubmit(name);
				toHistory();
			"
			class="user-button"
		>
			<div>
				<div>{{ name }}</div>
				<div class="account-icon">
					<img :src="`http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${icon}.png`" />
				</div>
				<div class="account-level">
					<span>Level {{ level }}</span>
				</div>
			</div>
		</button>
	</div>
</template>

<script>
import { computed, toRaw } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();
		store.commit("readUserData");
		const accounts = computed(() => store.state.accounts);
		const accountData = toRaw(store.state.accountData);
		store.dispatch("logAccountData");

		console.log(accountData);

		const handleSubmit = async name => {
			store.commit("updateSummoner", name);
		};

		return {
			store,
			accounts,
			accountData,
			handleSubmit,
		};
	},
	methods: {
		toHistory: function () {
			this.$router.push({ name: "history" });
		},
	},
};
</script>

<style scoped>
.user {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	margin: 5rem;
}

.user-button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 22rem;
	height: 22rem;
	margin: 2rem;
}

img {
	width: 15rem;
	height: 15rem;
	border-radius: 10rem;
	margin: 1rem;
}
</style>
