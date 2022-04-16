<template>
    <div >
         
        <form class='form' action="submit" @submit="submitted" v-on:submit.prevent="onSubmit" >
            <input placeholder="Champion Name"  @input="updateSearchValue"  >
        </form>
        <h1>You searched for: {{this.store.state.searchValue}}</h1>
        
        <div class="container" id="container">

            <div  class="thediv"  v-for="champion in DataList" :key="champion.name">
                <ChampCard class="card" :ChampName="champion.name" :champid="champion.id"/>
            
            </div>
        </div>
        
    </div>
</template>

<script>
import {useStore } from "vuex";

import ChampCard from "../components/ChampCard.vue"

    export default {
        setup(){
            const store = useStore()
            const Champions = store.dispatch("getChamps")
            console.log(store.state.ChampList)
            const handleClicked =  function(){
                console.log("Hello")}
         
            const DataList = store.state.ChampList
         

            return{
                users:
                handleClicked,
                store,DataList, Champions
            }
            
        },
        components:{
            ChampCard,
        },
        methods:{
            submitted: function(){
                console.log("submitted :)")
            },
            updateSearchValue (value){
                this.store.commit('searchedChamp', value.target.value);
                const keys = Object.keys(this.DataList)
                const searchTerms = []
                keys.forEach((key) => {
                    searchTerms.push(this.DataList[key].name)
                    searchTerms.push(this.DataList[key].id)
                })
                console.log(searchTerms)
            }   
        },
        
         
         
        
    }
</script>

<style scoped>
    div{
        
        font-size: 3rem;
        color: blue;
    
    }
    .container{
        width: 80%;
        background-color: rosybrown;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: auto;
    }
    
</style>