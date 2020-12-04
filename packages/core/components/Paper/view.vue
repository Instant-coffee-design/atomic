<template>
    <div class="PaperView" :class="{ 'is-editable': editable ? true : false }">
        <div v-html="value" v-if="!initEditor"></div>
        <editor-content class="Paper_content" :editor="initEditor" v-if="initEditor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import Extensions from './plugins/index.js'

export default {
    name: 'PaperView',
    components: { EditorContent },
    props: {
        editor: { default: null },
        editable: { type: Boolean, default: false },
        value: { type: String, default: '' }
    },
    data: () => ({
        initEditor: null
    }),
    watch: {
        editor: {
            immediate: true,
            handler (v) {
                if (v) this.$data.initEditor = v
            }
        }
    },
    mounted () {
        if (!this.$props.editable) {
            this.$data.initEditor = new Editor({
                extensions: Extensions.plugins,
                content: this.$props.value,
            })
        }
    }
}
</script>