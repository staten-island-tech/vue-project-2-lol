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
        height: 50rem;
        border-radius: 8px;
        margin-top: 5rem;

    }
    img{
        width: 100%;
    height: 100%; 
    object-fit: cover;
    border-radius: 8px;
    

    }
    .left{
        width: 65%;
        object-fit:scale-down;
        border-radius: 8px;
        
    }
    .right{
        width: 30%;
        font-size: 3rem;
    }
    .name{
        font-size: 4rem;
    }  

      
    

    @media (max-width: 1000px){
        .card{
            width: 60rem;
            height: 33rem;
   
        }
        .name{
            font-size: 2.5rem;

        }
        h2{
            font-size: 1.5rem;
        }

    }
    @media (max-width: 650px){
        .card{
            width: 37rem;
            height: 20rem;
           
        }
        .name{
            font-size: 1.5rem;

        }
        h2{
            font-size: 1rem;
        }

    }
    
    
</style>