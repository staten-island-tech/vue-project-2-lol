<template>
	<div class="history">
		<h1 class="header">Match History</h1>
		<div class="summonerInfo">
			<h1 class="profile">{{ name }}</h1>
			<h1 class="profile">Level {{ level }}</h1>
			<img class="profile" :src="iconURL()" />
			<button
				v-if="user"
				@click="
					toggleButton()
					// writeData();
				"
				class="favorite-button"
			>
				<span v-if="found" :class="[isActive ? 'found-disabled-empty' : 'found-active']">&#9734;</span>
				<span v-if="found" :class="[isActive ? 'found-active' : 'found-disabled']">&#9733;</span>
				<span v-if="!found" :class="[isActive ? 'nfound-active' : 'nfound-disabled']">&#9734;</span
				><span v-if="!found" :class="[isActive ? 'nfound-disabled-full' : 'nfound-active']">&#9733;</span>
			</button>
		</div>
		<div class="matchHistory">
			<div v-for="match in summonerData" :class="`matchHistory-data ` + match.info.participants.filter(summoner => summoner.summonerName === name)[0].win" :key="match">
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
								<img class="spellsImg" :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${match.runesSpells[0]}.png`" alt="spell Image 1" />
								<img class="spellsImg" :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${match.runesSpells[1]}.png`" alt="spells Image 2" />
							</div>
							<div class="matchHistoryDataSetMidChampImgRunes">
								<img class="runesImg" :src="`https://ddragon.canisback.com/img/${match.runesSpells[2]}`" alt="runes 1" />
								<img class="runesImg rune2" :src="`https://ddragon.canisback.com/img/${match.runesSpells[3]}`" alt="runes 2" />
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
								<p v-if="metaData.challenges === undefined">
									{{ metaData.totalMinionsKilled }}
									cs
								</p>
								<p v-else>
									{{
										metaData.totalMinionsKilled +
										Math.round(metaData.challenges.alliedJungleMonsterKills) +
										Math.round(metaData.challenges.enemyJungleMonsterKills) +
										metaData.challenges.wardTakedowns
									}}
									cs
								</p>
								<p>
									{{ (metaData.totalMinionsKilled / (match.info.gameDuration / 60)).toFixed(1) }}
									cs/min
								</p>
							</div>
						</div>
					</div>
					<div class="matchHistoryDataSetMidInv">
						<div class="matchHistoryDataSetMidItems">
							<img class="items" v-for="item in match.items" :src="`https://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${item}.png`" alt="item" :key="item" />
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
import { computed } from "vue";
import { useStore } from "vuex";

export default {
	data() {
		return {
			isActive: false,
		};
	},
	setup() {
		const store = useStore();
		const user = computed(() => store.state.user);
		const name = computed(() => store.state.summonerName);
		const summonerData = computed(() => store.state.summonerData);
		const icon = computed(() => store.state.summonerIcon);
		const level = computed(() => store.state.summonerLevel);
		const puuid = computed(() => store.state.puuid);
		const found = computed(() => store.state.accountInDatabase);
		const iconURL = () => `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${icon.value}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1652335123873`;
		let metaData = null;

		//const readData = store.commit("readUserData");
		const apiMatches = store.dispatch("getData");
		console.log(found.value);

		store.state.numberOfMatches = 12;

		return {
			icon,
			found,
			name,
			summonerData,
			apiMatches,
			level,
			puuid,
			iconURL,
			metaData,
			store,
			user,
		};
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
			return `https://ddragon.leagueoflegends.com/cdn/12.7.1/img/champion/${this.metaData.championName}.png`;
		},
		/*     writeData() {
      this.store.commit("readUserData");
      if (this.isActive === false) {
        console.log(this.isActive);
        this.store.commit("deleteUserData");
      } else if (this.isActive) {
        this.store.commit("writeUserData");
      }

      this.store.commit("readUserData");
    }, */
		toggleButton() {
			this.store.commit("foundUpdate");
			this.isActive = !this.isActive;
		},
	},
};
</script>

<style scoped>
.favorite-button {
	font-size: 5rem;
	background-color: transparent;
	border: none;
	color: #ffd752;
}

.found-active {
	display: none;
}

.found-disabled {
	display: inline;
}

.found-disabled-empty {
	color: black;
	display: inline;
}

.nfound-active {
	display: none;
}

.nfound-disabled {
	display: inline;
	color: black;
}

.nfound-disabled-full {
	display: inline;
}

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
	margin: auto;
	margin-bottom: 5rem;
	width: 90rem;
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
	width: 70rem;
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
	justify-content: left;
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

@media (max-width: 1100px) {
	.summonerInfo {
		width: 70rem;
	}
	.profile {
		font-size: 3.5rem;
		margin: 0 2rem;
	}
	.matchHistory-data {
		width: 60rem;
	}
	.items {
		width: 5rem;
		height: 5rem;
	}
	.champIcon {
		width: 9rem;
		height: 9rem;
	}
}

@media (max-width: 750px) {
	.summonerInfo {
		width: 70rem;
	}
	.profile {
		font-size: 3.5rem;
		margin: 0 2rem;
	}
	.matchHistory-data {
		width: 60rem;
	}
	.items {
		width: 5rem;
		height: 5rem;
	}
	.champIcon {
		width: 9rem;
		height: 9rem;
	}
	.matchHistoryDataSetMidItems {
		display: flex;
		flex-wrap: wrap;
		height: 12.5rem;
		row-gap: 0.5rem;
		column-gap: 0.5rem;
		width: 19rem;
	}
}

@media (max-width: 420px) {
	body {
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.matchHistory-data {
		font-size: -10%;
		width: 100vw;
	}
	.matchHistoryDataSetMid {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.summonerInfo {
		margin-left: 20rem;
		width: 100vw;
	}
	img.profile {
		margin: 1rem;
		width: 10rem;
	}
	.profile {
		font-size: 3rem;
	}
}
</style>
