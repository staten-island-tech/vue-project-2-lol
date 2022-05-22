<template>
    <div>
        <create-champ/>


         <div class="abilList">
           <div v-for="champion in this.store.state.dbChamps" :key="champion.champName">
               <user-champ  :imageURL="champion.imageURL"  :name="champion.champName" :title="champion.title" :description="champion.description" />
           </div>
        </div>
 
    </div>
</template>

<script>
import createChamp from '../components/createChamp.vue'
import UserChamp from '../components/userChamp.vue'
import {useStore} from "vuex"
    export default {
        setup(){
            const store = useStore();
            return{
                store
            }
        },
        
        
  components: { createChamp, UserChamp },
      
    }
</script>

<style  scoped>
    h2{
        font-size: 2rem;
    }
    .abilList{
    font-size: 3rem;
    margin: auto;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: black;
  
}
</style>