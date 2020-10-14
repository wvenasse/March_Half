<template>
    <div id="dorm">
        dorm
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
        name: 'dorm',
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
    #dorm{
        background-color: #fff;
        height: 100%;
    }
</style>