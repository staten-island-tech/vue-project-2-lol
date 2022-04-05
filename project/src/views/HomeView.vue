<template>
  <div class="search">
    <p>{{ accounts }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
/* import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup() {
    const store = useStore();

    const accounts = computed(() => store.state.accounts);
    location.ready(function () {
      store.commit("readUserData");
    });

    return { accounts };
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
