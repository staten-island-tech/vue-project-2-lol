<template>
    <div class="spellDiv">
        <h2 class="name">{{ablName}}</h2>
        <h2 class="desc">{{ablDes}}</h2>
        <img :src="getAbil" alt="ability">
    </div>
</template>

<script>

    
    export default {
        props:{
            ablDes:String,
            ablName:String,
            ablID:String,
        },
        computed:{
            getAbil: function(){
                return `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${this.ablID}.png

`
            }
        }
        
    } 
</script>

<style  scoped>
    .spellDiv{
        font-size: 2rem;
         
     
        margin: auto;
    }
</style>