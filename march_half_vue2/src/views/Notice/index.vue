<template>
    <div id="notice">
        notice
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
        name: 'notice',
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
    #notice{
        background-color: #fff;
        height: 100%;
    }
</style>