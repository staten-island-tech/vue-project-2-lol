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
    class="info-intro">ON OUR WEBSITE YOU CAN...</h2>
    <div class="funct">
      <div class="info-box">
         <h3>Research Champs</h3>
      </div>
      <div class="info-box">
          <h3>Scount Your Opponents</h3>
      </div>
      <div class="info-box">
         <h3>Save Your Favorite Players</h3>
      </div>
    </div>      
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
@import url(//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);
.website-info{
  font-family: "BeaufortforLOL-Bold";
    background: #1f2833;
    height: 100rem;
}
.info-intro{
  display: flex;
  font-size: 8rem;
  align-items: center;
  justify-content: center;
  margin: auto;
 width: 110rem;
  color: #c5c6c7;
  font-family: "BeaufortforLOL-Bold";
}
.home {
  height: 500vw;
  width: 100vw;
  overflow: hidden;
}
.funct{
   color: #c5c6c7;
   display:flex; 
   justify-content: center;
   align-items: center;
   column-gap: 10rem;
   margin: 5rem;
}
.info-box{
  font-size: 6rem;
  
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
