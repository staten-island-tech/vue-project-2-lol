<template>
  <div class="user">
    <div v-for="account in accounts" class="accounts" :key="account">
      {{ account }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const accounts = computed(() => store.state.accounts);

    return {
      accounts,
    };
  },
};
</script>
