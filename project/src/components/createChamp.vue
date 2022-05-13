<template>
    <div>
      
        <form  @submit.prevent="onSubmit" > 
            <div> <input id="name+" type="text" placeholder="Champion Name"   v-model="userChampName" ></div>
           
          <div class="abilities">
              <input id="abil" type="text" placeholder="Ability" v-model="abil1"  >
            <button @click="addAbility" class="plus"><img  src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-svg-png-icon-download-1.png" alt=""></button>
          </div>
            <button @click="createChampion" >Submit to DB</button>


        </form>

     

       <div class="userMade">
           <h2 v-for="made in this.store.state.dbChamps" :key="made.champName">
               Name: {{made.champName}},
               Abilities: {{made.abil1}}
           </h2>
       </div>
   
      
    </div>
</template>

<script>
import {useStore } from "vuex";
    export default {
        setup(){
            const store = useStore();
            const abilities = []
            return {store, abil1:"", userChampName:"", abilities}
        },
        

       methods:{
         addAbility: function(){
             this.abilities = this.abilities.concat(this.abil1);
             this.abil1 = "";
             document.getElementById("abil").value = "";

         },
         createChampion: function(){
             this.store.commit("updateChampName", this.userChampName)
             this.store.commit("updateAbil1", this.abilities)
             this.store.commit("createChamp")

             document.getElementById("name+").value = "";
         }
       } 
    }
    
</script>

<style  scoped>
button{
    width: 10rem;
    height: 5rem;   
}
h2{
    font-size: 4rem;
    text-align: center;
}

input{
    text-align: center;
    font-size: 3rem;
    height: 5rem;
    width: 20rem;
    margin-bottom: 3rem;
} 
form{
    text-align: center;
    width:30%;
    margin: auto;
}
img{
    height: 1rem;
    width: 1rem;
}
.plus{
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    border: none;
    position: absolute;
   
}
.abilities{
    text-align: center;
    vertical-align: middle;
   
}
</style>