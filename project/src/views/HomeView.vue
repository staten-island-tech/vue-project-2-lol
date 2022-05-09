<template>
  <div class="home">
    <video
      class="home-display"
      autoplay
      loop
      muted
      playsinline
      src="./displays/animated-season-2015.webm"
    />
    <atropos class="my-atropos">
      <img
        src="https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png"
      />
    </atropos>
  </div>
  <kinesis-container event="scroll">
    <kinesis-element tag="img" :strength="100" type="translate" axis="x" />
  </kinesis-container>
</template>
<script>
import Atropos from "atropos/vue";

export default {
  components: {
    Atropos,
  },
  setup() {},
};
</script>

<style scoped>
.home {
  height: 500vw;
  width: 100vw;
  overflow: hidden;
}

.my-atropos {
  position: absolute;
  width: 100vw;
  top: 20rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-display {
  top: 0;
  width: 100%;
}

.waku {
  position: absolute;
  top: 100rem;
}
</style>
