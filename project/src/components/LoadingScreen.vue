<template>
<div class="history">
			<h1 class="header">Match History</h1>
			<div class="summonerInfo">
				<h1 class="profile">{{ name }}</h1>
				<h1 class="profile">Level {{ level }}</h1>
				<img class="profile" :src="iconURL()" />
			</div>
			<div class="matchHistory">
				<div
					v-for="match in summonerData"
					:class="
						`matchHistory-data ` +
						match.info.participants.filter(summoner => summoner.summonerName === name)[0].win
					"
					:key="match" v
				>
					{{ getGameData(match, name) }}
					<div class="matchHistoryDataSetTop">
						<p>{{ match.info.gameMode }}</p>
						<p>{{ fancyTimeFormat(match.info.gameDuration) }}</p>
						<p id="date">{{ getDate(match.info.gameEndTimestamp) }}</p>
						<p id="time">{{ getTime(match.info.gameEndTimestamp) }}</p>
					</div>
					<div class="matchHistoryDataSetMid">
						<div class="matchHistoryDataSetMidChamp">
							<div class="matchHistoryDataSetMidChampImg">
								<img class="champIcon" :src="championName()" alt="champIcon" :key="metaData" />
								<div class="matchHistoryDataSetMidChampImgSpells">
									<img
										class="spellsImg"
										:src="`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${match.runesSpells[0]}.png`"
										alt="spell Image 1"
									/>
									<img
										class="spellsImg"
										:src="`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${match.runesSpells[1]}.png`"
										alt="spells Image 2"
									/>
								</div>
								<div class="matchHistoryDataSetMidChampImgRunes">
									<img
										class="runesImg"
										:src="`https://ddragon.canisback.com/img/${match.runesSpells[2]}`"
										alt="runes 1"
									/>
									<img
										class="runesImg rune2"
										:src="`https://ddragon.canisback.com/img/${match.runesSpells[3]}`"
										alt="runes 2"
									/>
								</div>
							</div>
							<p>Level {{ metaData.champLevel }}</p>
						</div>
						<div class="matchHistoryDataSetMidStats">
							<div>
								<p>{{ metaData.kills }}/{{ metaData.deaths }}/{{ metaData.assists }}</p>
							</div>
							<div>
								<div class="matchHistoryDataSetMidStatsCs">
									<p>{{ metaData.totalMinionsKilled }} cs</p>
									<p>
										{{ (metaData.totalMinionsKilled / (match.info.gameDuration / 60)).toFixed(1) }}
										cs/min
									</p>
								</div>
							</div>
						</div>
						<div class="matchHistoryDataSetMidInv">
							<div class="matchHistoryDataSetMidItems">
								<img
									class="items"
									v-for="item in match.items"
									:src="`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${item}.png`"
									alt="item"
									:key="item"
								/>
								<img
									class="items"
									:src="`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${metaData.item6}.png`"
									alt="item"
								/>
							</div>
						</div>
					</div>
					<div class="matchHistoryDataSetBotCombos">
						<div class="matchHistoryDataSetBotCombosKills">
							<p v-for="combo in match.combos" :key="combo">{{ combo }}</p>
						</div>
						<div class="timeSpentDead">
							<p>Time Dead: {{ fancyTimeFormat(metaData.totalTimeSpentDead) }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
export default{
setup() {
		const store = useStore();
		const name = computed(() => store.state.summonerName);
		const summonerData = computed(() => store.state.summonerData);
		const icon = computed(() => store.state.summonerIcon);
		const level = computed(() => store.state.summonerLevel);
		const puuid = computed(() => store.state.puuid);
		const iconURL = () => `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${icon.value}.png`;
		let metaData = null;
		const load = computed(() => store.state.isLoading);

		const apiMatches = store.dispatch("getData");
		store.state.numberOfMatches = 10;

		return { icon, name, summonerData, apiMatches, level, puuid, iconURL, metaData, store, load};
	}
  };
const getData =  async () => {
      async function getPuuid() {
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
      store.state.isLoading = true;
    }
</script>

<style scoped>
.spinner-wrapper{
    width: 100%;
    height: 100%;
    background-color: #151515;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner {
    position: relative;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
}

.spinner::before,
.spinner:after{
    content: "";
    position: absolute;
    border-radius: 50%;
}

.spinner:before {
    width: 100%;
    height: 100%;
    background-image:linear-gradient(90deg, #ff00cc 0%,#333399 100% );
    animation: spin .5s infinite linear;
}
.spinner:after {
    width: 90%;
    height: 90%;
    background-color: #151515;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }

}
</style>