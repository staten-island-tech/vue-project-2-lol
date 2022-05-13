import { createStore } from "vuex";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
    accounts: [],
    accountData: [],
    accountInDatabase: false,
    ChampList: [],
    searchValue: "",
    userChampName: "",
    dbChamps: [],
    abilities: "",
    champTitle: "",
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
    updateChampName(state, name) {
      state.userChampName = name;
    },
    updateAbil1(state, name) {
      state.abilities = name;
    },
    updateTitle(state, title) {
      state.champTitle = title;
    },
    createChamp(state) {
      const db = getDatabase();
      set(ref(db, "userChamps/" + state.userChampName), {
        champName: state.userChampName,
        abil1: state.abilities,
        title: state.champTitle,
      });
      state.abilities = [];

      console.log("You ran function");
    },
    readUserChamps(state) {
      const db = getDatabase();
      const userChamps = ref(db, "userChamps/");
      onValue(userChamps, (data) => {
        const champ = data.val();
        state.dbChamps = [];
        for (const cd in champ) {
          state.dbChamps.push(champ[cd]);
        }
      });
    },

    writeUserData(state) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + state.user.uid);
      onValue(userRef, (accounts) => {
        const data = accounts.val();
        if (!data) {
          state.accounts = [];
        } else if (data) {
          const acc = data.accounts;
          state.accounts = acc;
        }
        if (data.length === 0) {
          set(ref(db, "users/" + state.user.uid), {
            accounts: [state.summonerName],
          });
        } else {
          if (!data.includes(state.summonerName)) {
            data.push(state.summonerName);
            set(ref(db, "users/" + state.user.uid), {
              accounts: data,
            });
          }
        }
      });
    },
    deleteUserData(state) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + state.user.uid);
      onValue(userRef, (accounts) => {
        const data = accounts.val();
        if (!data) {
          state.accounts = [];
        } else if (data) {
          const acc = data.accounts;
          state.accounts = acc;
        }
        if (data != []) {
          if (data.includes(state.summonerName)) {
            console.log(
              data.filter(function (el) {
                return el != state.summonerName;
              })
            );
            set(ref(db, "users/" + state.user.uid), {
              accounts: data.filter(function (el) {
                return el != state.summonerName;
              }),
            });
          }
        }
      });
    },
    readUserData(state) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + state.user.uid);
      onValue(userRef, (accounts) => {
        const data = accounts.val();
        if (!data) {
          state.accounts = [];
        } else if (data) {
          const acc = data.accounts;
          state.accounts = acc;
        }
      });
    },
    searchedChamp(state, inputValue) {
      state.searchValue = inputValue;
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
    getChamps() {
      async function getChar() {
        try {
          const Characters = await fetch(
            "http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json"
          ).then((res) => res.json());
          console.log(Characters.data);
          for (const Champ in Characters.data) {
            store.state.ChampList.push(Characters.data[Champ]);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getChar();
    },
    logAccountData(store) {
      store.state.accountData = [];
      store.state.accounts.forEach(function (account) {
        async function storeData() {
          try {
            const puuid = await fetch(
              `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${account}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
            ).then((api) => api.json());

            const icon = Object.values(puuid)[4];
            const level = Object.values(puuid)[6];
            const name = Object.values(puuid)[3];

            store.state.accountData.push({
              icon: icon,
              level: level,
              name: name,
            });
          } catch (error) {
            console.log(error);
          }
        }
        storeData();
      });
    },
    getData() {
      async function getPuuid2() {
        try {
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
          console.log(store.state.summonerName);
          store.state.accountInDatabase = false;

          const accounts = store.state.accounts;
          console.log(accounts);

          for (let i = 0; i < accounts.length; i++) {
            if (accounts[i] === name) {
              console.log("found");
              store.state.accountInDatabase = true;
            }
          }

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
                    "https://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/summoner.json"
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
                    "https://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/summoner.json"
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
                    "https://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/runesReforged.json"
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
                    "https://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/runesReforged.json"
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
                  summonerInfo.item6,
                ];
                const items = [];
                for (let i = 0; i < 7; i++) {
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
      getPuuid2();
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

export default store;
