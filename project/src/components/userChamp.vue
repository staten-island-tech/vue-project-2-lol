<template>
    <div>
        <div class="card">
            <div class="left">
                <img :src="imageURL" alt="">

            </div>

            <div class="right">

                <h1 class="name"> {{title}}  {{name}}</h1>
                <h2>{{description}}</h2>

            </div>
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
        display: flex;
        width: 90rem;
        background-color: lightcoral;
        border: 1px solid black;
        height: 40rem;

    }
    img{
        width: 100%;
    height: 100%; 
    object-fit: contain;

    }
    .left{
        width: 70%;
        object-fit:scale-down;
        
    }
    .right{
        width: 30%;
        font-size: 3rem;
    }
    .name{
        font-size: 4rem;
    }
    
    
</style>