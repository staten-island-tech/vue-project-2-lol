<template>
    <div>
        <div class="card">
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
</style>