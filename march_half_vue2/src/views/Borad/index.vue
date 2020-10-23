<template>
    <div id="borad">
        {{msg}}
        <tinymce-editor ref="editor" v-model="msg" :disabled="disabled" @onClick="onClick">
        </tinymce-editor>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
    </div>
</template>

<script>
    import TinymceEditor from '../../components/tinymce-editor'
    import {
        onMounted,
        reactive,
        ref,
        watch
    } from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'borad',
        components: {
            TinymceEditor
        },

        setup(props, {
            refs,
            root
        }) {
            let msg = ref('')
            let disabled = ref(false);
            const onClick = ((e, editor) => {
                console.log('Element clicked')
                console.log(e)
                console.log(editor)
            })
            const clear = () => {
                msg.value = '';
                // root.$refs.editor.clear()
            }
            onMounted(() => {});
            return {
                msg,
                disabled,
                onClick,
                clear
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