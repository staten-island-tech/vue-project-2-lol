<template>
	<div>
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
						<img :src="`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${icon}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1652335123873`" />
					</div>
					<div class="account-level">
						<span>Level {{ level }}</span>
					</div>
				</div>
			</button>
		</div>
		<h2 class="text">Your Champions</h2>
		<div class="cards">
			<user-champ-r
				v-for="champion in userC"
				:key="champion.champName"
				:imageURL="champion.imageURL"
				:name="champion.champName"
				:title="champion.title"
				:description="champion.description"
			/>
		</div>
	</div>
</template>

<script>
import { toRaw } from "vue";
import { useStore } from "vuex";
import userChampR from "../components/userChampR.vue";

export default {
	setup() {
		const store = useStore();

		const accountData = toRaw(store.state.accountData);
		store.dispatch("logAccountData");
		console.log(accountData);

		const handleSubmit = async name => {
			store.commit("updateSummoner", name);
		};
		const Champions = [];

		return {
			store,
			accountData,
			handleSubmit,
			Champions,
		};
	},
	components: {
		userChampR,
	},
	methods: {
		toHistory: function () {
			this.$router.push({ name: "history" });
		},
	},

	computed: {
		userC: function () {
			const list = [];
			for (const c in this.store.state.dbChamps) {
				if (this.store.state.dbChamps[c].author == this.store.state.user.uid) {
					list.push(this.store.state.dbChamps[c]);
				}
			}

			return list;
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
.text {
	font-size: 7rem;
	text-align: center;
}

.user-button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40rem;
	height: 40rem;
	margin: 2rem;
	font-size: 7rem;
}

img {
	width: 30rem;
	height: 30rem;
	border-radius: 20rem;
	margin: 1rem;
}
.cards {
	display: flex;
	width: 90%;
	margin: auto;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
</style>
