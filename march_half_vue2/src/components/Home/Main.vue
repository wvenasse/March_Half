<template>
    <div id="homeMain" >
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted,reactive,ref,isRef,toRefs,computed} from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'act',
        setup(props, { refs, root }) {
            
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    #homeMain{
        height: 100vh;
        // position: fixed;
        // left: $navMenu;
        // top: 75px;
        // right: 0;
        // bottom: 0;
        // border: 30px solid #f7f7f7;
        // border-bottom: 0;
        // -webkit-box-sizing: border;
        // background: #fff;
    }

    .main-content{
        width: 100%;
        height: 100%;
        padding-top: $homeHeader + 30;
        padding-right: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        transition: all 0.3s ease 0s;
    }

    .open {
        .main-content {
            padding-left: $navMenu + 30;
        }
    }

    .close {
        .main-content {
            padding-left: $navMenuMin + 30;
        }
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 30px 30px 0 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }

</style>