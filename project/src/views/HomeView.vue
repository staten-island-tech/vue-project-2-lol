<template>
  <div class="home">
    <h1 class="intro">Welcome to Better.GG!</h1>
    <h2 class="intro_sub">YOUR HUB TO IMPROVE YOUR LEAGUE PLAY</h2>
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
@import url(../root.css);
.home{
  background: var(--Background-light
  );
}
.intro {
  display: block;
  width: 100vw;
  font-size: 15rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 3rem;
  color: var(--header);
  -webkit-text-stroke: 0.3rem var(--supporting-text);
}
.intro_sub {
  display: block;
  width: 100vw;
  font-size: 4rem;
  text-align: center;
  font-weight: 900;
  margin-bottom: 10rem;
  color: var(--supporting-text);
}
</style>