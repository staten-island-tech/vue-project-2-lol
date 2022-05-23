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
    <atropos id="my-atropos">
      <img
        src="https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png"
      />
    </atropos>
    <div class="website-info">
    <h2 data-aos="flip-up"
    data-aos-duration="800"
    data-aos-delay="300"
    class="info-intro">ON OUR WEBSITE YOU CAN...</h2>
    <div class="funct">
      <div class="info-box" data-aos="fade-right" data-aos-delay="400">
        <img class="image" src="../home/book-and-pen.png" alt="book and pen" >
         <h3 class='subhead'>Research Champs</h3>
         <p>Get all the stats and abilities for your favorite league champs</p>
      </div>
    <div class ="filler"></div>
    <div class ="filler"></div>
      <div class="info-box" data-aos="fade-left" data-aos-delay="400">
          <img class="image" src="../home/binoculars.png" alt="binoculars" >
          <h3 class="subhead">Scout Your Opponents</h3>
          <p>Get a headstart on the competition by looking at your opponents profiles</p>
      </div>
      <div class="info-box" data-aos="fade-right" data-aos-delay="400">
         <img class="image" src="../home/star.png" alt="star" >
         <h3 class="subhead">Save Your Favorite Players</h3>
         <p>Like a player? Save their profile to your account to be able to check them at a moments notice</p>
      </div>
      <div class ="filler"></div>
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
html, body *{
  font-family: "BeaufortforLOL-Bold";
}
h3, h2{
  color:#66fcf1;
}
.image{
  width:25%;
  height: auto;
  filter: invert(95%) sepia(91%) saturate(615%) hue-rotate(94deg) brightness(99%) contrast(100%);
}
.website-info{
  font-family: "BeaufortforLOL-Bold";
    height: 100rem;
}
.info-intro{
  display: flex;
  font-size: 8rem;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 2rem;
  width: 110rem;
  font-family: "BeaufortforLOL-Bold";
  background: #1f2833;
  border: #45a29e 3px solid;
}
.home {
  height: 500vw;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background: #0b0c10;
}
.funct{
  font-family: "BeaufortforLOL-Bold";
   color: #c5c6c7;
   display:flex; 
   justify-content: center;
   align-items: center;
   column-gap: 10rem;
   margin: 5rem;
   flex-wrap: wrap;
  
   }
.filler{
  width:50%;
  height: 350px;
  filter: invert(56%) sepia(55%) saturate(383%) hue-rotate(128deg) brightness(90%) contrast(89%);
}
.info-box{
  font-family: "BeaufortforLOL-Bold";
  font-size: 6rem;
  width: 25%;
  height: 350px;
  box-sizing: border-box;
  border: #45a29e 5px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #1f2833;
  margin-top: 5rem;
}
#my-atropos {
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
