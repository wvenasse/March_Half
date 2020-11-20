<template>
    <div id="borad">
        borad
        <tinymce/>
    </div>
</template>

<script>
    import { onMounted,reactive,ref,isRef,toRefs} from "@vue/composition-api";
    import request from "@/utils/request";
    import tinymce from "@/components/System/tinymce"
    export default {
        name: 'borad',
        components: {
            tinymce
        },

        setup(props, {
            refs,
            root
        }) {
            
            onMounted(() => {});
            return {
                
            }
        }
    }
</script>

<style scoped>
    #borad {
        background-color: #fff;
        height: 100%;
    }
</style>