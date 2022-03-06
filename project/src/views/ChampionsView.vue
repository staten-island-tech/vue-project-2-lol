<template>
    <div >
        This is a test
        <button @click="handleClicked">Test</button>
        
        <h1 v-for="Champion in DataList" :key="Champion.name">{{Champion.id}}</h1>
    </div>
</template>

<script>
import {useStore } from "vuex";
import ChampData from "../ddragon/en_US/champion.json"
    export default {
        setup(){
            const store = useStore()

            const handleClicked =  function(){
                console.log("Hello")}
         
            const DataList = ChampData.data
            return{
                users: ChampData,
                handleClicked,
                store,DataList
            }
        
        },
        methods:{
            
        },
        
    }
</script>

<style scoped>
    div{
        
        font-size: 3rem;
        color: blue;
    
    }
    
</style>