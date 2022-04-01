<template>
    <div>
        <h2 class="title">{{this.$route.params.name}}</h2>
        <h2 class="title">{{this.Results}}</h2>
        <img :src="'https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/' + this.$route.params.name + '.png'" alt="">
    </div>
</template>

<script>

    export default {
        data(){
            const Results = []
            return{
                Results
            }
            

        },
        async mounted(){
            await fetch(`http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion/${this.$route.params.name}.json`).then((res) => res.json()).then(data => this.Results = data.data)
        }
        
       
    }
</script>

<style  scoped>
    .title{
        font-size: 2rem;
    }
</style>