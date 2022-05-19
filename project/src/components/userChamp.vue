<template>
    <div>
        <div class="card">
            <img class="image" :src=imageurl alt="">
            <h2 class="name"> {{title}}  {{name}}</h2>
            <ul v-for="ability in abilitylist" :key="ability" >
                {{ability}}
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            imageurl: String,
            name: String,
            abilitylist: Array,
            title: String,

        }
    }
</script>

<style scoped>
    .card{
        height: 35rem;
        width: 25rem;
        font-size: 2rem;
        text-align: center;
        border: 1px solid red;
        background-color: lightblue;
        margin: 2rem 2rem 2rem 2rem;
     
 
    }
    .image{
        margin-top: 2rem;
        height: 15rem;
        width: 15rem;
 
    }
</style>