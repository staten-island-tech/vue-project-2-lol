<template>
	<div class="signup">
		<form @submit.prevent="handleSubmit">
			<h1>Sign up</h1>
			<input type="email" name="email" v-model="email" required />
			<input type="password" name="password" v-model="password" required />
			<button>Sign up</button>
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
