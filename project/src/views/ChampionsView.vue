<template>
    <div class="page">

      
        <form action="" class="searchForm">
            <input placeholder="Search Bar" type="text" class="searchBar" @input="updateSearchValue">
            <a href="https://www.youtube.com/watch?v=ek-672uRnhQ"><img src="https://freepngimg.com/download/league_of_legends/85646-and-league-legends-riot-icons-of-computer.png" alt="LOL Icon"></a>
        </form>


         
    
 
        
        <div class="container" id="container">

            <div  class="thediv"  v-for="champion in searchFilter" :key="champion.name">
                <ChampCard class="card"   :champid="champion.id"/>
            
            </div>
        </div>
        
    </div>
</template>

<script>
import {useStore } from "vuex";

import ChampCard from "../components/ChampCard.vue"

    export default {
        setup(){
            const store = useStore();
            const DataList = store.state.ChampList
            return{
           
                store,DataList,
                  
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
                this.store.commit('searchedChamp', value.target.value.replace(/\s/g, ''));
             
            },
            
         
        },
        computed:{
            searchFilter: function(){
                return this.DataList.filter((champion) => {
                    console.log(this.store.state.searchValue.length)
                    return champion.id.toLowerCase().match(this.store.state.searchValue.toLowerCase())
                })
            }
        }
        
       
        
         
         
        
    }
</script>

<style scoped>
@import url(//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);
    * {
        border: 0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "BeaufortforLOL-Bold";
    }
  
     
    .container{
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        margin: auto;
           
        width: 50%;
   
        min-height: 70rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
       
 
    }
    .card:hover{
        border: black solid 0px;
    }
    .searchForm{
        height: 10rem;
        width: 100%;
        max-width: 1000px;
        border-radius: 7rem;
        background-color: #abc;
        margin: 3rem auto;
        display: flex;
        
        }
    .searchForm input{
        padding-left: 3rem;
        font-size: 3rem;
        height: 5rem;
        width: 80%;
        margin: auto;
        background-color: transparent;
        border: none;
        outline: none;
    }
    .searchForm a{
        background-color: transparent;
        margin: auto;
    }
    .searchForm img{
        height: 8rem;
        width: 8rem;
    }
    .thediv{
        width: 25%;
    }
    
 
</style>