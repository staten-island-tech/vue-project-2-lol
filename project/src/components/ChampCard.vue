<template>
    <div class="asdf">
        <img class='img' :src={ImgSource} alt=""/>
        <h2 class="name">{{ChampName}}</h2>
    </div>
</template>

<script>
export default {
    name: "ChampCard",
    props:{
        ImgSource:String,
        ChampName:String,
    }
}
</script>
<style scoped>
    .asdf{
        background-color: yellow;
    }
</style>