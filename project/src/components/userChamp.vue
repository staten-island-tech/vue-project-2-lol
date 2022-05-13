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
        height: 80rem;
        width: 65rem;
        font-size: 2rem;
        background-color: lightblue;
    }
</style>