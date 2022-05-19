<template>
    <div>
        <create-champ/>


         <div class="abilList">
           <div v-for="champion in this.store.state.dbChamps" :key="champion.champName">
               <user-champ :name="champion.champName" :title="champion.title" :abilitylist="champion.abil1" />
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
  
}
</style>