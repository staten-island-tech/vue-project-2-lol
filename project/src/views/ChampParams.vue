<template>
  <div class="page">
    <div class="Title">
      <h2 class="name">{{ this.Results.title }}</h2>
      <h2 class="name">{{ this.Results.name }}</h2>
      <div class="BG">
        <img class="splashImg" :src="getSplash" alt="" />
      </div>
    </div>

    <div class="buttons">
      <button class="abilBTN" @click="toggleAbil">Abilities</button>
      <button class="loreBTN" @click="toggleLore">Lore</button>
    </div>

    <div v-if="this.Ability == true" class="abilities">
      <PassiveDiv
        class="PassiveDiv"
        :ablName="this.Passive.name"
        :ablDes="this.Passive.description"
        :ablID="this.PassIMG"
      />

      <div class="body1" v-for="spell in this.Spells" :key="spell.id">
        <SpellDiv
          :ablName="spell.name"
          :ablDes="spell.description"
          :ablID="spell.id"
        />
      </div>
    </div>
    <div v-if="this.Lore == true" class="font2">
      {{ this.Results.lore }}
    </div>

    <div v-if="this.Lore == true" class="tipsContain">
      <div class="container">
        <div class="tipsLeft">
          <ul v-for="tip in this.Results.allytips" :key="tip">
            {{
              tip
            }}
          </ul>
        </div>
        <div class="tipsRight">
          <ul v-for="tip in this.Results.enemytips" :key="tip">
            {{
              tip
            }}
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpellDiv from "../components/SpellDiv.vue";
import PassiveDiv from "../components/PassiveDiv.vue";

export default {
  data() {
    const Results = [];
    const Spells = [];
    const Passive = [];
    const PassIMG = [];
    const Lore = false;
    const Ability = true;

    return {
      Results,
      Spells,
      Passive,
      PassIMG,
      Lore,
      Ability,
    };
  },
  components: {
    SpellDiv,
    PassiveDiv,
  },
  computed: {
    getSplash: function () {
      return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.Results.id}_0.jpg`;
    },
  },
  methods: {
    toggleAbil: function () {
      this.Ability = true;
      this.Lore = false;
    },
    toggleLore: function () {
      this.Ability = false;
      this.Lore = true;
    },
  },

  async mounted() {
    await fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion/${this.$route.params.name}.json`
    )
      .then((res) => res.json())
      .then((data) => (this.Results = data.data));
    const b = [
      "<physicalDamage>physical damage</physicalDamage>",
      "<magicDamage>magic damage</magicDamage>.<br><br>",
    ];
    this.Results = Object.values(this.Results)[0];
    this.Results.title = this.Results.title.toUpperCase();
    this.Results.name = this.Results.name.toUpperCase();
    this.Spells = this.Results.spells;
    this.Passive = this.Results.passive;
    this.PassIMG = this.Passive.image.full;
    console.log(this.Passive);
    this.PassFixed = b.forEach((word) => {
      this.Passive.description = this.Passive.description.replace(
        word,
        "damage "
      );
    });
  },
};
</script>

<style scoped>
@import url(//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);
.font2 {
  font-size: 2rem;
  width: 60%;
  margin: auto;
  text-align: center;
}
.tipsContain {
  font-size: 6rem;
  margin: auto;
  width: 60%;
}
button {
  background-color: transparent;
  height: 4rem;
  font-family: "BeaufortforLOL-Bold";
  border: none;
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 3rem;
  color: white;
}
.buttons {
  text-align: center;
  margin: auto;
  margin-bottom: 1rem;
}
.abilBTN {
  border-bottom: 0.25rem transparent solid;
  transition: 0.25s;
}
.abilBTN:hover {
  border-bottom: 0.25rem orange solid;
}
.loreBTN {
  border-bottom: 0.25rem transparent solid;
  transition: 0.1s;
}
.loreBTN:hover {
  border-bottom: 0.25rem orange solid;
}
.container {
  display: flex;
  width: 100%;
}
.tips-Left {
  text-align: center;
}
.tips-Right {
  text-align: center;
}
.page {
  background-color: rgb(0, 9, 19);
  color: #ffff;
  z-index: 2;
}
.name {
  text-align: center;
  font-size: 8rem;
  font-family: "BeaufortforLOL-Bold";
  color: #ffff;
  z-index: 2;
}
.splashImg {
  margin: auto;
  display: block;
  z-index: 1;
}
.blurBG {
  filter: blur(8px);
  margin: auto;
  display: block;
  width: 100%;
  position: relative;
  z-index: 0;
}
.Title {
  position: relative;
  z-index: 2;
  margin-top: 2rem;
}
.body1 {
  font-size: 2rem;
}
.abilities {
  margin: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: grey;
}
.passive {
  font-size: 2rem;
}
.PassiveDiv {
  margin: 0;
  padding: 0;
}
</style>
