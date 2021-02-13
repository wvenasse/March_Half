<template>
    <div id="home" :class="[menuState ? 'close' : 'open']">
        <HomeHeader />
        <HomeMain />
        <HomeNav />
    </div>
</template>
<script>
    import {
        onMounted,
        reactive,
        ref,
        isRef,
        toRefs,
        computed
    } from "@vue/composition-api";
    import request from "@/utils/request";
    import HomeHeader from "@/components/Home/Header"
    import HomeMain from "@/components/Home/Main"
    import HomeNav from "@/components/Home/Nav"
    export default {
        name: 'home',
        components: {
            HomeHeader,
            HomeMain,
            HomeNav
        },
        setup(props, {
            refs,
            root
        }) {
            let menuState = computed(() => root.$store.state.app.isCollapse);
            onMounted(() => {})
            return {
                menuState
            }
        }
    };
</script>
<style lang="scss" scoped>
    #home {
        background: #f2f6fc;
    }
</style>