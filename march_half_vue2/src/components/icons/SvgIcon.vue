<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    import { onMounted,reactive,ref,isRef,toRefs,computed} from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'svgIcon',
        // props: ['iconClass','className'],
        props: {
            iconClass:{
                type:String,
                default:'svg',
                required:true
            },
            className:{
                type:String,
                default:'svg',
                required:true
            },
        },
        setup(props, {refs,root}) {
            //计算属性，得出最终结果，并返回
            const iconName = computed(() => `#icon-${props.iconClass}`)
            const svgClass = computed(() => {
                if (props.className) {
                    return `svg-icon ${props.className}`
                }
                else {
                    return `svg-icon`
                }
            })
            return {
                iconName,
                svgClass
            }
        }
    }
    /**
             * computed监听属性变化，并计算属性
             */
            // let number = ref(1)
            // const plusOne = computed(()=>{
            //     return number.value * 10
            // })
            // const plusOne = computed({
            //     get : () => number.value + 1,
            //     set : val => {number.value = val -1 }
            // })
            // const add = () => {
            //     plusOne.value = 5
            // }

    // number,
                // plusOne,
                // add
</script>

<style lang="scss" scoped>
    #svgIcon{
        background-color: #fff;
        height: 100%;
    }

    .svg-icon {
        width: 1em;;
        height: 1em;
        fill: currentColor;
        color: #fff;
        &.font12 {
            font-size: 12px;
        }
    }
</style>

