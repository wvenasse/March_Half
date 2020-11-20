<template>
    <div id="home">
        <HomeHeader/>
        <HomeMain/>
        <HomeNav/>
    </div>
</template>
<script>
    import { onMounted,reactive,ref,isRef,toRefs} from "@vue/composition-api";
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
        setup(props, {refs,root}) {
            
            onMounted(() => {
            })
            return {
              
            }
        }
    };
</script>
<style lang="scss" scoped>
#home{
    
}
</style>
