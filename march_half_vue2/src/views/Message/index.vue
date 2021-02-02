<template>
    <div id="message">
        message
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
        name: 'message',
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
    #repair{
        background-color: #fff;
        height: 100%;
    }
</style>