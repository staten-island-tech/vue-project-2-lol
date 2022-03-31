<template>
    <div>
        <h2 class="title">{{this.$route.params.name}}</h2>
        <h2 class="title">{{this.Results}}</h2>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'

    export default {
        data(){
            const Results = ChampData.data;
            return{
                Results,ChampData
            }
            

        },
        computed:{
            async getinfo(){
                const data = await fetch(`http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json`)
                const res = await data.json()
                console.log(res.data)
            }
        }
       
    }
</script>

<style  scoped>
    .title{
        font-size: 2rem;
    }
</style>