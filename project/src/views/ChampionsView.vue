<template>
    <div >
        This is a test
        <button @click="handleClicked">Test</button>
        
        <div v-for="champion in DataList" :key="champion.name" class="container">
            <ChampCard 
                :ChampName="champion.name" 
                   
                />
          
        </div>
    </div>
</template>

<script>
import {useStore } from "vuex";
import ChampData from "../ddragon/en_US/championFull.json"
import ChampCard from "../components/ChampCard.vue"

    export default {
        setup(){
            const store = useStore()

            const handleClicked =  function(){
                console.log("Hello")}
         
            const DataList = ChampData.data
             
            return{
                users: ChampData,
                handleClicked,
                store,DataList,
            }
            
        },
        components:{
            ChampCard,
        },
        
         
         
        
    }
</script>

<style scoped>
    div{
        
        font-size: 3rem;
        color: blue;
    
    }
    
</style>