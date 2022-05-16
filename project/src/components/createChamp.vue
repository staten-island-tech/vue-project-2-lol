<template>
    <div>
      
        <form id="form" @submit.prevent="onSubmit" > 
            <div> <input id="name+" type="text" placeholder="Champion Name"   v-model="userChampName" ></div>
           <div>
               <input type="text" id="title" placeholder="Champion Title" v-model="champTitle">
           </div>
            <input type="file" placeholder="Champion Image" >

          <div class="abilities">
              <input id="abil" type="text" placeholder="Ability" v-model="abil1"  >
            <button @click="addAbility" class="plus"><img  src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-svg-png-icon-download-1.png" alt=""></button>
          </div>
            <button @click="createChampion" >Submit to DB</button>


        </form>

       

        
   
      
    </div>
</template>

<script>
import {useStore } from "vuex";
// import userChamp from '../components/userChamp.vue'
    export default {
        setup(){
            const store = useStore();
            const abilities = []
            return {store, abil1:"", userChampName:"",champTitle:"", abilities}
        },
        
 
       methods:{
         

         addAbility: function(){
             this.abilities.push(this.abil1);
             this.abil1 = "";
             document.getElementById("abil").value = "";
            console.log(this.abilities)
         },
         createChampion: function(){
             this.store.commit("updateChampName", this.userChampName)
             this.store.commit("updateAbil1", this.abilities)
             this.store.commit("updateTitle", this.champTitle)
             this.store.commit("createChamp")
             this.store.commit("readUserChamps")
            document.getElementById("form").reset();
            console.log(this.store.state.dbChamps)
         }
       },
    //    computed: {
    //        returnDB: function(){
    //            return this.store.state.dbChamps;
    //        }
    //    },
    
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