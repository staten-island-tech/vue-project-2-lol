<template>
<<<<<<< HEAD
	<Suspense>
<template #default>
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
<template #fallback>
	<div class="spinner-wrapper">
		<div class="spinner"></div>
	</div>
</template>
		</Suspense>
=======
	<div v-if="!loaded">
		<MatchComp />
	</div>
	<div v-else>LOADING...</div>
>>>>>>> bd2e694d2cdcc0249f2a32fff429e0ac58416be4
</template>

<script>
import MatchComp from "../components/MatchComp.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
	components: { MatchComp },
	setup() {
		const store = useStore();
		const loaded = computed(() => store.state.isLoaded);
		let metaData = null;

		return { metaData, store, loaded };
	},
};
</script>

<style scoped>
.loadingimg {
	width: 100vw;
	height: 100vh;
}
</style>
