<template>
    <div>
        <h2 class="title">{{this.$route.params.name}}</h2>
    </div>
</template>

<script>
    export default {
        name:"ChampParams"

    }
</script>

<style  scoped>
    .title{
        font-size: 2rem;
    }
</style>