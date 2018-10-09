/**
*
* @author louie
* @date created in 2018-10-8 22:49
*/
<template>
    <div id="client" v-wechat-title="$route.meta.title">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "client"
    }
</script>

<style scoped>

</style>