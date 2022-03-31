<template>
	<nav>
		<template v-if="authIsReady" >
			<div class="navbar">

				<div class="left">
					<router-link to="/">Home</router-link> | 
					<router-link to="/search">Search</router-link>
					<router-link to="/Champions">Champions</router-link>
					
			
				</div>
				<div v-if="user" class="right">
					<router-link to="user">User</router-link> | 
					<span>Logged in as {{ user.email }}</span> | 
					<button @click="handleClick">Logout</button>
				</div>
				<div v-if="!user" class="right">
					<router-link to="/signup">Sign Up</router-link> |
					<router-link to="/login">Login</router-link>
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
	#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}


.navbar{
background-color: black;
 margin-top: 2rem;

 display:flex;
 align-items: center;
 padding: 3rem;
 justify-content: space-around;
}


nav a {
	padding: 3rem;
	font-weight: bold;
	color: #FFF;
	font-size: 2rem;

	transition: 500ms;
	text-decoration: underline ;
	text-decoration-color: transparent;

	
	
}
nav a:hover {
	color: #FFD700;
	text-decoration-color: #FFD700;
}

nav a.router-link-exact-active {
	color: #FFD700;
	text-decoration-color: #FFD700;
}
</style>