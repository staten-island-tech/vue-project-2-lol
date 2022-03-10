<template>
    <div >
        This is a test
        <button @click="handleClicked">Test</button>
        <div class="container">

            <div v-for="champion in DataList" :key="champion.name">
                <ChampCard class="card" :ChampName="champion.name" :champid="champion.id"/>
            
            </div>
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
    .container{
        width: 80%;
        background-color: rosybrown;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: auto;
    }
    
</style>