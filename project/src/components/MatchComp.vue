<template>
	<div class="main">
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
					:key="match"
					v
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
	</div>
</template>

<script>
import { computed } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();
		const name = computed(() => store.state.summonerName);
		const summonerData = computed(() => store.state.summonerData);
		const icon = computed(() => store.state.summonerIcon);
		const level = computed(() => store.state.summonerLevel);
		const puuid = computed(() => store.state.puuid);
		const iconURL = () => `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${icon.value}.png`;
		store.state.numberOfMatches = 3;

		onMounted(() => getData(store));

		return { store, name, summonerData, icon, level, puuid, iconURL, getData };
	},
	methods: {
		fancyTimeFormat: function (duration) {
			// Hours, minutes and seconds
			var hrs = ~~(duration / 3600);
			var mins = ~~((duration % 3600) / 60);
			var secs = ~~duration % 60;

			// Output like "1:01" or "4:03:59" or "123:03:59"
			var ret = "";

			if (hrs > 0) {
				ret += "" + hrs + "hr " + (mins < 10 ? "0" : "");
			}
			if (mins > 0) {
				ret += "" + mins + "min " + (secs < 10 ? "0" : "");
				ret += "" + secs + "sec";
			} else {
				ret += "" + secs + "sec";
			}

			return ret;
		},

		getTime: function (stamp) {
			const time = new Date(stamp).toLocaleTimeString("en-US");
			const hourMin = time.slice(-0, -6);
			const suffix = time.slice(-2);
			const betterTime = `${hourMin} ${suffix}`;

			return betterTime;
		},
		getDate: function (date) {
			return new Date(date).toLocaleDateString("en-US");
		},
		getGameData(match, name) {
			const metaData = match.info.participants.filter(summoner => summoner.summonerName === name)[0];
			this.metaData = metaData;
		},
		championName() {
			return `https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${this.metaData.championName}.png`;
		},
	},
};

function getData(store) {
	async function getPuuid() {
		try {
			store.state.isLoading = true;
			console.log(store.state.isLoading);

			const apiPuuid = await fetch(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${store.state.searchName}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
			).then(api => api.json());

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
					).then(api => api.json());

					let apiMatches = [];

					for (const matchID of apiAccount) {
						const apiMatch = await fetch(
							`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=RGAPI-e3586229-1e3c-4aa3-93d5-db15c2359cf3`
						).then(api => api.json());
						const summonerInfo = apiMatch.info.participants.filter(
							summoner => summoner.summonerName === name
						)[0];
						// eslint-disable-next-line no-inner-declarations
						async function getItems() {
							let results = [];

							const spell1 = await fetch(
								"https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
							)
								.then(response => response.json())
								.then(spell => Object.values(spell.data))
								.then(spell => spell.filter(spell => spell.key == summonerInfo.summoner1Id))
								.then(spell => spell[0].id);
							results.splice(0, 0, spell1);

							const spell2 = await fetch(
								"https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
							)
								.then(response => response.json())
								.then(spell => Object.values(spell.data))
								.then(spell => spell.filter(spell => spell.key == summonerInfo.summoner2Id))
								.then(spell => spell[0].id);
							results.splice(1, 0, spell2);

							const rune1 = await fetch(
								"https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
							)
								.then(response => response.json())
								.then(rune => rune.filter(rune => rune.id == summonerInfo.perks.styles[0].style)[0])
								.then(rune => rune.slots[0].runes)
								.then(
									rune =>
										rune.filter(
											rune => rune.id == summonerInfo.perks.styles[0].selections[0].perk
										)[0].icon
								);
							results.splice(2, 0, rune1);

							const rune2 = await fetch(
								"https://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/runesReforged.json"
							)
								.then(response => response.json())
								.then(rune => rune.filter(rune => rune.id == summonerInfo.perks.styles[1].style)[0])
								.then(rune => rune.icon);
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
}
</script>

<style scoped>
.header {
	display: block;
	width: 100vw;
	font-size: 10rem;
	text-align: center;
	font-weight: 600;
	margin-top: 5rem;
	margin-bottom: 5rem;
}
.summonerInfo {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 5rem;
	margin-left: 30vw;
	margin-right: 30vw;
	width: 40vw;
	border-radius: 1rem;
	background: linear-gradient(135deg, #2b69ee, #9246ee);
}

.summonerInfoText {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 1.5rem;
	color: white;
}

.profile {
	font-size: 4.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	margin: 0 3rem;
}

img.profile {
	border-radius: 1rem;
	margin: 5rem;
	width: 15rem;
}

.matchHistory {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3rem;
	flex-direction: column;
	margin-bottom: 20rem;
}

.matchHistory-data {
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	width: 60vw;
	font-size: 10rem;
	border-radius: 1rem;
}

.true {
	background: linear-gradient(135deg, #b5d2f8, #6cb1ff);
}

.false {
	background: linear-gradient(135deg, #ffb6b6, #ff8686);
}

.champIcon {
	width: 10rem;
	border-radius: 1rem;
	margin-top: 1rem;
}

.items {
	width: 6rem;
	height: 6rem;
	border-radius: 1rem;
}

.matchHistoryDataSetTop {
	display: flex;
	flex-direction: row;
	column-gap: 2rem;
	margin-top: 2rem;
	margin-left: 5%;
	margin-right: 5%;
	margin-bottom: 0;
	font-size: 4rem;
	font-weight: 700;
}

#date {
	margin-left: auto;
	font-weight: 400;
	font-size: 2rem;
}

#time {
	font-weight: 400;
	font-size: 2rem;
}

.matchHistoryDataSetMid {
	display: flex;
	flex-direction: row;
	column-gap: 3rem;
	justify-content: space-between;
	margin-left: 5%;
	margin-right: 5%;
	margin-bottom: 0;
	font-weight: 300;
}

.matchHistoryDataSetMidChamp {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 1rem;
}

.matchHistoryDataSetMidChampImg {
	display: flex;
	flex-direction: row;
	column-gap: 1rem;
}

.matchHistoryDataSetMidChampImgSpells {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	justify-content: center;
	row-gap: 0.5rem;
}

.spellsImg {
	width: 4.5rem;
	border-radius: 0.5rem;
}

.matchHistoryDataSetMidChampImgRunes {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	justify-content: center;
	row-gap: 0.5rem;
}

.runesImg {
	width: 4.5rem;
	border-radius: 10rem;
	padding: 0.2rem;
	background-color: rgba(255, 255, 255, 0.452);
}

.rune2 {
	padding: 0.9rem;
}

.matchHistoryDataSetMidStats {
	display: flex;
	flex-direction: column;
	row-gap: 1.5rem;
	align-items: center;
	justify-content: center;
	font-size: 10rem;
	font-weight: 800;
}

.matchHistoryDataSetMidStatsCs {
	display: flex;
	column-gap: 2rem;
	font-weight: 400;
}

.matchHistoryDataSetMidInv {
	display: flex;
	flex-direction: row;
	column-gap: 0.5rem;
	margin: 1.5rem;
}

.matchHistoryDataSetMidItems {
	display: flex;
	flex-wrap: wrap;
	height: 12.5rem;
	row-gap: 0.5rem;
	column-gap: 0.5rem;
	width: 19rem;
}

.matchHistoryDataSetBotCombos {
	display: flex;
	column-gap: 1rem;
	font-size: 5rem;
	justify-content: center;
	margin: 2rem;
	margin-top: 1rem;
	font-weight: 400;
}

.matchHistoryDataSetBotCombosKills {
	display: flex;
	flex-direction: row;
	column-gap: 1rem;
	font-weight: 500;
	margin: 0 10rem;
}

.matchHistoryDataSetBotCombosKillsType {
	border-radius: 10rem;
	background-color: #ffd752;
	padding: 0.5rem;
	padding-left: 1rem;
	padding-right: 1rem;
	margin-right: 0 10rem;
}

.timeSpentDead {
	float: right;
}
</style>
