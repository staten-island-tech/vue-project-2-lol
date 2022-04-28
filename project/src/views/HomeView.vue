<template>
  <div>
    <h1 class="Intro">Welcome to Better.GG!</h1>
    <h2 class="Intro_sub">YOUR HUB TO IMPROVE YOUR LEAGUE GAME</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup() {
    const store = useStore();

    console.log(store.state.user);
    return { store };
  },
};
</script>
<style>

.Intro {
  display: block;
  width: 100vw;
  font-size: 15rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 3rem;
color: #A38036;
  -webkit-text-stroke: 0.3rem #D0AA62;
}
.Intro_sub {
  display: block;
  width: 100vw;
  font-size: 5rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 10rem;
}
</style>