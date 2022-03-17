import { createStore } from "vuex";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    searchName: "",
    summonerData: [],
    puuid: 0,
    summonerIcon: "",
    summonerLevel: 0,
    summonerName: "",
    numberOfMatches: 0,
    userData: null,
    db: getDatabase(),
  },
  mutations: {
    updateSummoner(state, name) {
      state.searchName = name;
      console.log(name);
    },
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    writeUserData(state) {
      set(ref(state.db, "users/" + state.user.uid), {
        accounts: [state.summonerName],
      });
    },
  },
  actions: {
    async signup(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("unable to sign up");
      }
    },
    async login(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res);
      } else {
        throw new Error("unable to login");
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null, null);
    },
    getData() {
      async function getPuuid() {
        try {
          console.log(store.state);

          const apiPuuid = await fetch(
            `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${store.state.searchName}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
          ).then((api) => api.json());

          const puuid = Object.values(apiPuuid)[2];
          const icon = Object.values(apiPuuid)[4];
          const level = Object.values(apiPuuid)[6];
          const name = Object.values(apiPuuid)[3];

          store.state.puuid = puuid;
          store.state.summonerIcon = icon;
          store.state.summonerLevel = level;
          store.state.summonerName = name;

          // eslint-disable-next-line no-inner-declarations
          async function getAccount() {
            try {
              const apiAccount = await fetch(
                `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${store.state.numberOfMatches}&api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
              ).then((api) => api.json());

              let apiMatches = [];

              for (const matchID of apiAccount) {
                const apiMatch = await fetch(
                  `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
                ).then((api) => api.json());
                const summonerInfo = apiMatch.info.participants.filter(
                  (summoner) => summoner.summonerName === name
                )[0];
                // eslint-disable-next-line no-inner-declarations
                async function getItems() {
                  let results = [];

                  const spell1 = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
                  )
                    .then((response) => response.json())
                    .then((spell) => Object.values(spell.data))
                    .then((spell) =>
                      spell.filter(
                        (spell) => spell.key == summonerInfo.summoner1Id
                      )
                    )
                    .then((spell) => spell[0].id);
                  results.splice(0, 0, spell1);

                  const spell2 = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
                  )
                    .then((response) => response.json())
                    .then((spell) => Object.values(spell.data))
                    .then((spell) =>
                      spell.filter(
                        (spell) => spell.key == summonerInfo.summoner2Id
                      )
                    )
                    .then((spell) => spell[0].id);
                  results.splice(1, 0, spell2);

                  const rune1 = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
                  )
                    .then((response) => response.json())
                    .then(
                      (rune) =>
                        rune.filter(
                          (rune) =>
                            rune.id == summonerInfo.perks.styles[0].style
                        )[0]
                    )
                    .then((rune) => rune.slots[0].runes)
                    .then(
                      (rune) =>
                        rune.filter(
                          (rune) =>
                            rune.id ==
                            summonerInfo.perks.styles[0].selections[0].perk
                        )[0].icon
                    );
                  results.splice(2, 0, rune1);

                  const rune2 = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
                  )
                    .then((response) => response.json())
                    .then(
                      (rune) =>
                        rune.filter(
                          (rune) =>
                            rune.id == summonerInfo.perks.styles[1].style
                        )[0]
                    )
                    .then((rune) => rune.icon);
                  results.splice(3, 0, rune2);

                  return results;
                }
                const possible = [
                  summonerInfo.item0,
                  summonerInfo.item1,
                  summonerInfo.item2,
                  summonerInfo.item3,
                  summonerInfo.item4,
                  summonerInfo.item5,
                ];
                const items = [];
                for (let i = 0; i < 6; i++) {
                  if (possible[i] != 0) {
                    items.push(possible[i]);
                  }
                }
                const combos = [];
                const pos = [
                  summonerInfo.doubleKills,
                  summonerInfo.tripleKills,
                  summonerInfo.quadraKills,
                  summonerInfo.pentaKills,
                ];
                if (pos[3] != 0) {
                  combos.push("Pentakill");
                } else if (pos[2] != 0) {
                  combos.push("Quadrakill");
                } else if (pos[1] != 0) {
                  combos.push("Triplekill");
                } else if (pos[0] != 0) {
                  combos.push("Doublekill");
                }
                getItems().then(function (results) {
                  apiMatches.push({
                    info: apiMatch.info,
                    metadata: apiMatch.metadata,
                    summonerInfo: summonerInfo,
                    runesSpells: results,
                    items: items,
                    combos: combos,
                  });
                });
              }

              await console.log(apiMatches);

              store.state.summonerData = apiMatches;

              return apiMatches;
            } catch (error) {
              console.log(error);
            }
          }
          getAccount();
        } catch (error) {
          console.log(error);
        }
      }
      getPuuid();
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

export default store;
