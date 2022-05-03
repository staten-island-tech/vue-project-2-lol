<template>
    <router-link :to="'/Champions/' + this.champid"  >
 
            
                <img class='img'  :src="getimg" alt="picture"/>
           
 
    </router-link>
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
            // return "https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" + this.champid.replace(/\s+/g, '') + ".png"
            return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+this.champid+"_0.jpg"
        },
        getname: function(){
            return this.ChampName
        }
    }
    
    
    
}
</script>
<style scoped>
    
    .img{
  
     
        background-color: transparent;
       height:425px;
       width: 100%;
        clip-path: inset(10% 10% 10% 10%);
       
        border-top: 5px transparent solid;
        transition: 0.5s;
         
    }
    /* .img:hover{
        clip-path: inset(5% 5% 5% 5%);
    } */
    .hide{
        height: 0px;
    }
    .name{
        width: 100%;
        font-size: 10px;
    }
    .img:hover{
      transform: scale3d(.95, .95, 1);
        clip-path: inset(5% 5% 5% 5%);
 
     
        border-top:5px solid red;
    }
</style>