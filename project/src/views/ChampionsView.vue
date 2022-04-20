<template>
    <div >
         
        
        <input placeholder="Champion Name"  v-model="search" @input="updateSearchValue"  >

 
        
        <div class="container" id="container">

            <div  class="thediv"  v-for="champion in searchFilter" :key="champion.name">
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
            

     
           
            const DataList = store.state.ChampList
          

            return{
           
                store,DataList,
                search:" ",  
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