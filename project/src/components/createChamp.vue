<template>
    <div>
        <form @submit.prevent="onSubmit"  id="form">


            <div class="leftForm">
                <input type="file" class="image" placeholder="Select Image"  >
            </div>
            <div class="rightForm">
                <div class="sameLine">
                    <input type="text" id="title" class="title sLinput" placeholder="Title" v-model="champTitle" required >
                    <input type="text" class="name sLinput" placeholder="Name" v-model="userChampName"  required>
                </div>
                <div class="input">
                    <textarea v-model="abil1" id="abil"  placeholder=" Description / Lore"   cols="30" rows="10" class="desc"></textarea>

                </div>
                       <button @click="addAbility" class="plus"><img id="plusImg" src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-svg-png-icon-download-1.png" alt=""></button>


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
            this.abilities = [];
            console.log(this.store.state.dbChamps)
         }
       },
  
    }
    
</script>

<style  scoped>
 
 #form{
     height: 40rem;
     width: 50%;
     background-color: lightgrey;
     margin: auto;
     margin-top: 4rem;
     display: flex;
 }
 .leftForm{
     width: 50%;
     background-color: lightslategrey;
     display: flex;
     justify-content: space-evenly;
     padding-top: 5%;
  
     
 }
 .image{
     height: 90%;
     width: 90%;
     
     background-color: lightskyblue;
 }
 .rightForm{
     width: 50%;
     padding-top: 5%;
 }
 .sLinput{
     width:45%;
     margin: 2.5%;
     height: 3.5rem;
     font-size: 3rem;
 }
 
 .desc{
     font-size: 2rem;
     resize: none;
 }
 #plusImg{
     height: 3rem ;
     width: 3rem ;
 }
</style>