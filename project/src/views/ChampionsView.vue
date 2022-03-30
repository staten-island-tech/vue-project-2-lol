<template>
    <div >
        <h2>{{this.$route.params.name}}</h2>
        <form class='form' action="submit" v-on:submit.prevent="onSubmit" >
            <input type="text" placeholder="Enter Champion Name " >
        </form>
        
        <div class="container" id="container">
 
            <div  class="thediv"  v-for="champion in DataList" :key="champion.name">
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
            console.log(DataList)

            return{
                users: ChampData,
                handleClicked,
                store,DataList,
            }
            
        },
        components:{
            ChampCard,
        },
        methods:{
            submitted: function(event){
                event.preventDefault();
                const divs = document.getElementsByClassName("thediv")
                const dived = divs.length
                for(let i = 0; i < dived; i = i+1) {
                    const parent = document.getElementbyID('container')
                    parent.removeChild(parent.firstChild)
                }
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