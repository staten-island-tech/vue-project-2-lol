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
    <div class="website-info">
    <h2 data-aos="flip-up"
    data-aos-duration="800"
    class="info-intro">WHAT CAN YOU DO?</h2>
    <p></p>      
    </div>
    <kinesis-container event="scroll">
    <kinesis-element tag="img" :strength="100" type="translate" axis="x" />
  </kinesis-container>
  </div>
</template>

<script>
import Atropos from "atropos/vue";
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init();
export default {
  components: {
    Atropos,
  },
  setup() {},
};
</script>

<style scoped>
.website-info{
  font-size: 10vw;
}
.info-intro{
  
}
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
  filter:blur(5px);
}

.waku {
  position: absolute;
  top: 100rem;
}
</style>
