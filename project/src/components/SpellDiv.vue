<template>
    <div class="SpellDiv">
        <h2 class="name">{{ablName}}</h2>
        <h2 class="desc">{{ablDes}}</h2>
        <img :src="getAbil" alt="">
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
    
    export default {
        props:{
            ablDes:String,
            ablName:String,
        },
        
    } 
</script>

<style  scoped>

</style>