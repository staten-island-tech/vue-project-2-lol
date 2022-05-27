<template>
	<form @submit.prevent="handleSubmit">
		<div class="form">
			<h1 class="form-header">Login</h1>
			<input class="email" type="email" name="email" id="email" v-model="email" placeholder="Email" required />
			<input class="password" type="password" name="password" id="password" v-model="password" placeholder="Password" required />
			<button class="form-button">Login</button>
			<div v-if="error">{{ error }}</div>
		</div>
	</form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
	setup() {
		const email = ref("");
		const password = ref("");

		const store = useStore();
		const router = useRouter();
		const error = ref(null);

		const handleSubmit = async () => {
			try {
				await store.dispatch("login", {
					email: email.value,
					password: password.value,
				});
				router.push("/");
			} catch (err) {
				error.value = err.message;
			}
		};
		return { handleSubmit, email, password, error };
	},
};
</script>

<style scoped>
body {
	background: #ecf0f3;
}

form {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
}
.form {
	font-size: 5rem;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	row-gap: 3rem;
	align-items: center;
	border-radius: 2rem;
	background: #ecf0f3;
	box-shadow: 15px 15px 15px #cbced1, -15px -15px 15px #ffffff;
	padding: 4rem;
	width: 40vw;
	height: 60vh;
}

.form-header {
	font-weight: bold;
	font-size: 5rem;
}

.email,
.password {
	padding: 1rem;
	width: 35vw;
	padding: 1.5rem;
	padding-left: 4rem;
	padding-right: 4rem;
	border: none;
	outline: none;
	background: none;
	color: #555;
	border-radius: 2rem;
	box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
}

.form-button {
	width: 20rem;
	padding: 1rem;
	border: none;
	background-color: black;
	color: white;
	border-radius: 1rem;
	margin-top: 1rem;
}

.form-button:active {
	transform: scale(0.95);
	transition-duration: 0.1s;
}
@media (max-width: 420px) {
	.form {
		width: 100vw;
		padding: 0rem;
	}
	.email,
	.password {
		width: 95vw;
	}
}
</style>
