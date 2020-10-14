<template>
    <div id="borad">
        borad
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
        name: 'borad',
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
    #borad{
        background-color: #fff;
        height: 100%;
    }
</style>