<template>
	<div class="user">
		<button
			v-for="{ icon, level, name } in accountData"
			:key="name"
			v-on:click="
				handleSubmit(name);
				toHistory();
			"
		>
			<div>
				<div>{{ name }}</div>
				<div class="account-icon">
					<img :src="`http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${icon}.png`" />
				</div>
				<div class="account-level">
					<span>{{ level }}</span>
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
		const accounts = computed(() => store.state.accounts);
		const accountData = toRaw(store.state.accountData);
		const accountData2 = store.dispatch("logAccountData");

		console.log(accountData);
		const handleSubmit = async name => {
			store.state.searchName = name;
			store.commit("updateSummoner", name);
		};

		return {
			store,
			accounts,
			accountData,
			accountData2,
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
