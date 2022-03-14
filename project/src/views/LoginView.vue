<template>
	<div class="login">
		<form class="signup-form" @submit.prevent="handleSubmit">
			<h1 class="signup-item header-signup">Login</h1>
			<input class="signup-item email" type="email" name="email" id="email" v-model="email" required />
			<input class="signup-item password" type="password" name="password" id="password" v-model="password" required />
			<button class="signup-item signup-button">Login</button>
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
				await store.dispatch("login", { email: email.value, password: password.value });
				router.push("/");
			} catch (err) {
				error.value = err.message;
			}
		};

		return { handleSubmit, email, password, error };
	},
};
</script>

