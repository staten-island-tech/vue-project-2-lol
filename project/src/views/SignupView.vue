<template>
	<div>
		<form class="form" @submit.prevent="handleSubmit">
			<h1 class="form-item">Sign up</h1>
			<input class="form-item email" type="email" name="email" id="email" v-model="email" required />
			<input class="form-item password" type="password" name="password" id="password" v-model="password" required />
			<button class="form-item signup-button">Sign up</button>
			<div v-if="error">{{ error }}</div>
		</form>
	</div>
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
				await store.dispatch("signup", { email: email.value, password: password.value });
				router.push("/");
			} catch (err) {
				error.value = err.message;
			}
		};

		return { handleSubmit, email, password, error };
	},
};
</script>

<style>
	.form{
		font-size: 5rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin: 10rem 50rem;
		justify-content: center;
		align-items: center;
	}

	.email, .password{
		padding: 1rem;
		width: 50rem;
		padding: 1.5rem;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.form-button{
		width: 20rem;
		padding: 1rem;
		border: none;
		background-color: black;
		color: white;
		border-radius: 1rem;
		margin-top: 1rem;
	}

</style>