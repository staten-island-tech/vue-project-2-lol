<template>
	<div class="page">
		<form @submit.prevent="onSubmit" action="" class="searchForm">
			<input placeholder="Search Bar" type="text" class="searchBar" @input="updateSearchValue" />
		</form>

		<div class="filter">
			<button class="filterB" @click="filterNone">All</button>
			<button class="filterB" @click="filterTank">Tank</button>
			<button class="filterB" @click="filterMage">Mage</button>
			<button class="filterB" @click="filterSup">Support</button>
			<button class="filterB" @click="filterMks">Marksmen</button>
			<button class="filterB" @click="filterFig">Fighters</button>
			<button class="filterB" @click="filterAss">Assassin</button>
		</div>

		<div class="container" id="container">
			<div class="thediv" v-for="champion in searchFilter" :key="champion.name">
				<ChampCard class="card" :champid="champion.id" />
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";

import ChampCard from "../components/ChampCard.vue";

export default {
	setup() {
		const store = useStore();
		const DataList = store.state.ChampList;
		const champCreate = false;

		return {
			store,
			DataList,
			champCreate,
		};
	},
	components: {
		ChampCard,
	},
	methods: {
		submitted: function () {
			console.log("submitted :)");
		},
		updateSearchValue(value) {
			this.store.commit("searchedChamp", value.target.value.replace(/\s/g, ""));
		},

		filterNone: function () {
			this.DataList = this.store.state.ChampList;

			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},

		filterTank: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Tank"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
		filterMage: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Mage"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
		filterAss: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Assassin"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
		filterSup: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Support"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
		filterMks: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Marksman"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
		filterFig: function () {
			this.DataList = this.store.state.ChampList;
			this.DataList = this.DataList.filter(champ => champ.tags.includes("Fighter"));
			if (this.store.state.searchValue.includes(" ")) {
				this.store.state.searchValue = this.store.state.searchValue.trim();
			}
			this.store.state.searchValue = this.store.state.searchValue + " ";
		},
	},
	computed: {
		searchFilter: function () {
			try {
				return this.DataList.filter(champion => {
					champion.name = champion.id + " ";
					return champion.name.toLowerCase().match(this.store.state.searchValue.toLowerCase());
				});
			} catch (error) {
				return error;
			}
		},
	},
};
</script>

<style scoped>
@import url(https://db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);
* {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: "BeaufortforLOL-Bold";
}

.dbChamps {
	font-size: 4rem;
}
.container {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	margin: auto;
	width: 50%;
	min-height: 70rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.card:hover {
	border: black solid 0px;
}
.searchForm {
	height: 10rem;
	width: 100%;
	max-width: 1000px;
	border-radius: 7rem;
	background-color: #abc;
	margin: 3rem auto;
	display: flex;
}

.searchForm input {
	padding-left: 3rem;
	font-size: 3rem;
	height: 5rem;
	width: 80%;
	margin: auto;
	background-color: transparent;
	border: none;
	outline: none;
}
.searchForm a {
	background-color: transparent;
	margin: auto;
}
.searchForm img {
	height: 8rem;
	width: 8rem;
}
.thediv {
	width: 25%;
}
.filter {
	font-size: 4rem;
	width: 80%;
	margin: auto;
	text-align: center;
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.filterB {
	display: inline;
	background-color: transparent;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-left: 1rem;
	padding-right: 1rem;
	border-top: 0.5rem red solid;
	border-bottom: 0.5rem red solid;
	transition: 0.4s;
}
.filterB:hover {
	border-top: 0.5rem blue solid;
	border-bottom: 0.5rem blue solid;
}

@media (max-width: 1100px) {
	.searchForm {
		width: 90%;
	}
	.thediv {
		width: 33%;
	}
	.container {
		width: 75%;
	}
}
@media (max-width: 900px) {
	.filter {
		font-size: 3rem;
	}
	.filterB {
		border-top: 0.3rem red solid;
		border-bottom: 0.3rem red solid;
		padding: 0.5rem;
	}
}
@media (max-width: 600px) {
	.filter {
		width: 93%;
	}
	.searchForm {
		height: 7rem;
	}
}

@media (max-width: 503px) {
	.filter {
		font-size: 2.5rem;
	}
	.filterB {
		border-top: 0.3rem red solid;
		border-bottom: 0.3rem red solid;
		padding: 0.4rem;
	}
}
@media (max-width: 420px) {
	.filter {
		font-size: 2rem;
	}
	.container {
		width: 80%;
	}
}
</style>
