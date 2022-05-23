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
        width: 35rem;
        height: 25rem;
        font-size: 2rem;
        text-align: center;
        border: 1px solid red;
        background-color: lightblue;
        margin: 2rem 2rem 2rem 2rem;
        color:black;
        padding-top: 2rem;
        display: flex;
  
        
      
     
 
    }
    img{
        height: 100%;
        width: 100%;
    }
    
    .left{
        width: 30%;

    }
    .right{
        width: 70%;
    }
</style>