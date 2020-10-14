<template>
    <div id="post">
        post
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref,
    } from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'post',
        setup(props, {
            refs,
            root
        }) {

            return {

            }
        }
    }
</script>

<style scoped>
    #post{
        background-color: #fff;
        height: 100%;
    }
</style>