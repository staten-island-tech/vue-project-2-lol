<template>
    <div>
        <form @submit.prevent="onSubmit" class="form" ref="form" >
            <h2>
                Create Your Champion
            </h2>
            <button class="submit" @click="asdf">asdf</button>
            <div class="container">
                <div class="image">
                    <button class="submit" @click="pickFile" >Upload Image</button>
                   
                    <input style="display:none" type="file" ref="image" accept="image/*" @change="onFilePicked" >
                </div>
              
                <div class="Name">
                    <input type="text" placeholder="Champion Name"  v-model="userChampName"   >
                </div>
                <div class="Title">
                    <input type="text" placeholder="Champion Title"  v-model="champTitle"   >
                </div>
                <div class="Description">
                    <textarea id="textarea" cols="30" rows="10" maxlength="400" placeholder="Description (400 Char Max)" v-model="description"  ></textarea>
                </div>
               
            
                <button class="submit" @click="createChampion">Submit</button>
            </div>

           


        </form>     
      
    </div>
</template>

<script>
import {useStore } from "vuex";
    export default {
        setup(){
            const store = useStore();
            const abilities = []
            const imageURL = null
            const error = ""
            return {store, description:"", userChampName:"",champTitle:"", abilities, imageURL, error}
        },
        
 
       methods:{
           createChampion(){
               if(this.userChampName.trim().length < 1){
                
                   alert("Enter Valid Name")
                   this.$refs.form.reset();
                   this.imageURL = null;
                   return 0
               }
               this.store.commit("updateChamp", {name: this.userChampName, title:this.champTitle ,description:this.description, image: this.imageURL, })
               
            this.store.commit("createChamp")
            this.$refs.form.reset();
            this.imageURL = null;


           },
           pickFile(){
               this.$refs.image.click()
           },
           onFilePicked(event){
                const files = event.target.files
                let filename = files[0].name
                if(filename.lastIndexOf('.') <= 0){
                     alert("Please Add Valid Image")
                     return 0
                }
                const fileReader = new FileReader()
                fileReader.addEventListener("load", () => {
                    this.imageURL= fileReader.result
                })
                fileReader.readAsDataURL(files[0])
           },
           asdf: function(){
               console.log(this.imageURL)
           }


         

        //  addAbility: function(){
        //      this.abilities.push(this.abil1);
        //      this.abil1 = "";
        //      document.getElementById("abil").value = "";
            
        //     console.log(this.abilities)
        //  },
        //  createChampion: function(){
        //      this.store.commit("updateChampName", this.userChampName)
        //      this.store.commit("updateAbil1", this.abilities)
        //      this.store.commit("updateTitle", this.champTitle)
        //      this.store.commit("createChamp")
              
        //      this.store.commit("readUserChamps")
        //     document.getElementById("form").reset();
        //     this.abilities = [];
        //     console.log(this.store.state.dbChamps)
        //  }
       },
     
  
    }
    
</script>

<style  scoped>
 .form{
  width: 90%;   
  margin: auto;
    text-align: center;
 }
 h2{
     color: black;
     font-size: 15rem;

 }
 .container{
     width: 50%;
     background-color: black;
     margin: auto;
     color: white;
     height: 80rem;
     padding-top: 2rem;
     border-radius: 30px;
      
     
     
     
 }
 img{
     position: relative;
     width: 100%;
   
     z-index: 0;
 
 }
 .Name{
     filter: none;
 }
 input{
  
     width: 80%;
     font-size: 3rem;
     border: none;
     border-bottom: 2px solid white;
     background-color: transparent;
     color: white;
     transition: 0.5s;
     margin-bottom: 2rem;
 }
 input:focus{
     outline: none;
        border-bottom: 2px solid purple;
     
 }
 textarea{
     width: 80%;
     font-size: 3rem;
     border: none;
     border-bottom: 2px solid white;
     background-color: transparent;
     color: white;
     transition: 0.5s;
     margin-bottom: 2rem;
     resize: none;
     border: 1px solid white;
     border-radius: 5px;
     
 }
 textarea:focus{
     outline: none;
 }
 .submit{
     border: 1px solid white;
     height: 6rem;
     width:20rem;
     background-color: transparent;
     color: white;
     font-size: 3rem;
     border-radius: 20px;
 }

</style>