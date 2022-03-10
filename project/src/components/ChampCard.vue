<template>
    <div class="asdf">
        <h2 class="name">{{ChampName}}</h2>
        <div class="hide">{{champid}}</div>
        <img class='img'  :src="getimg" alt="picture"/>
    </div>
</template>

<script>
export default {
    name: "ChampCard",
    props:{
        ChampIMG:String,
        ChampName:String,
        champid: String,
    },
    computed:{
        getimg: function(){
            return "https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" + this.champid.replace(/\s+/g, '') + ".png"
        }
    }
    
    
    
}
</script>
<style scoped>
    .asdf{
        width: 100%;
    }
    .img{
        background-color: aqua;
        height: 20rem;
        width: 20rem;
    }
    .hide{
        height: 0px;
    }
    .name{
        width: 100%;
        font-size: 10px;
    }
</style>