<template>
    <div>
        <div class="card">
            <img :src="imageURL" alt="">
            <h1 class="name"> {{title}}  {{name}}</h1>
            <h2>{{description}}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            imageURL: String,
            name: String,
            description: String,
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
        color:black;
     
 
    }
    img{
        height: 150px;
        width: 150px;
    }
</style>