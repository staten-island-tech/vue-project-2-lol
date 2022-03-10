<template>
    <div class="asdf">
        <h2 class="name">{{ChampName}}</h2>
        <img class='img'  :src="getimg" alt="picture"/>
    </div>
</template>

<script>
export default {
    name: "ChampCard",
    props:{
        ChampIMG:String,
        ChampName:String,
    },
    computed:{
        getimg: function(){
            return "https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/" + this.ChampName.replace(/\s+/g, '') + ".png"
        }
    }
    
    
    
}
</script>
<style scoped>
    .asdf{
        background-color: yellow;
    }
    .img{
        background-color: aqua;
        height: 30rem;
        width: 30rem;
    }
</style>