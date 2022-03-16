<template>
	<nav>
		<template v-if="authIsReady">
			<div class="navbar">
				<div class="left">
					<router-link to="/">Home</router-link> |
					<router-link to="search">Search</router-link>
				</div>
				<div v-if="user" class="right">
					<router-link to="user">User</router-link> |
					<span class="loggedinas">Logged in as {{ user.email }}</span> |
					<button class="logout" @click="handleClick">Logout</button>
				</div>
				<div v-if="!user" class="right">
					<router-link to="signup">Sign Up</router-link> |
					<router-link to="login">Login</router-link>
				</div>
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
<style scoped>
html,
body,
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 62.5%;
	font-family: "Roboto", sans-serif;
}

.navbar {
	background-color: black;
	display: flex;
	align-items: center;
	padding: 3rem;
	justify-content: space-around;
}

nav a {
	padding: 3rem;
	font-weight: bold;
	color: #fff;
	font-size: 2rem;
	transition: 500ms;
	text-decoration: underline;
	text-decoration-color: transparent;
}
nav a:hover {
	color: #ffd700;
	text-decoration-color: #ffd700;
}

nav a.router-link-exact-active {
	color: #ffd700;
	text-decoration-color: #ffd700;
}

.loggedinas {
	color: white;
	font-size: 2rem;
	padding: 0rem 3rem;
	font-weight: bold;
}
.logout {
	font-weight: bold;
	color: #fff;
	font-size: 2rem;
	background-color: transparent;
	border: none;
	transition: 500ms;
	text-decoration: underline;
	text-decoration-color: transparent;
	padding-left: 3rem;
}

.logout:hover {
	color: #ffd700;
	text-decoration-color: #ffd700;
}
</style>
