<template>
	<nav>
		<template v-if="authIsReady">
			<div>
				<router-link to="/">Home</router-link> | 
				<router-link to="search">Search</router-link>
			</div>
			<div v-if="user">
				<router-link to="user">User</router-link> | 
				<span>Logged in as {{ user.email }}</span> | 
				<button @click="handleClick">Logout</button>
			</div>
			<div v-if="!user">
				<router-link to="signup">Sign Up</router-link> |
				<router-link to="login">Login</router-link>
			</div>
		</template>
	</nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();

		const handleClick = () => {
			store.dispatch("logout");
		};

		return {
			handleClick,
			user: computed(() => store.state.user),
			authIsReady: computed(() => store.state.authIsReady),
		};
	},
};
</script>
