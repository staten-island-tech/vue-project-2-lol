<template>
  <div class="search">
    <p>{{ uid }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
/* import { computed } from "vue";
import { useStore } from "vuex";
import{ getDatabase } from "firebase/database"

export default {
	name: "HomeView",
	setup() {
		const store = useStore();

		const uid = computed(() => store.state.user.uid)
		console.log(getDatabase())

		return { uid }
	},
}; */
</script>

<style>
html,
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
}
</style>
