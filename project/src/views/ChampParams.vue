<template>
    <div class="page" >

        <div class="Title">
            
            <h2 class="name">{{this.Results.title}}</h2>
            <h2 class="name">{{this.Results.name}}</h2>
            <div class="BG">
                <img class="splashImg" :src="getSplash" alt="">
            </div>
            
        </div>    
    
        <div class="body1">
            {{this.Spells}}
        </div>
       
     
        <h2 class="title">{{this.Results.lore}}</h2>
        <h2 class="title">{{this.Results.allytips}}</h2>
        <h2 class="title">{{this.Results.enemytips}}</h2>
 
    </div>
</template>

<script>

    export default {
        data(){
            const Results = []
            const Spells = []
            return{
                Results, Spells
            }
            

        },
        computed:{
            getSplash: function() {
                return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.Results.id}_0.jpg`
              
            }
        },
        

        async mounted(){
            await fetch(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion/${this.$route.params.name}.json`).then((res) => res.json()).then(data => this.Results = data.data)

            this.Results = Object.values(this.Results)[0];
            this.Results.title = this.Results.title.toUpperCase();
            this.Results.name = this.Results.name.toUpperCase();
            this.Spells = this.Results.spells
            console.log(this.Spells)

        }
     
       
    }
</script>

<style  scoped>
@import url(//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);
 
    .page{
        background-color: rgb(0, 9, 19);
        color: #FFFF;
        z-index: 2;

    }
    .name{
        text-align: center;
        font-size: 8rem;
        font-family: "BeaufortforLOL-Bold";
        color: #FFFF;
        z-index: 2;
  
    }
    .splashImg{
        margin:auto;
        display: block;
        z-index: 1;
        
        
    }
   .blurBG{
       filter: blur(8px);
        margin: auto;
        display: block;
        width: 100%;
        position: relative;
        z-index: 0;
   }
   .Title{
    position: relative;
    z-index: 2;
    margin-top: 2rem;
   }
   .body1{
       font-size: 2rem;
   }
</style>+