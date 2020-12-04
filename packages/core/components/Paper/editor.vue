<template>
    <div class="PaperEditor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, getNodeAttrs }">
            <div class="PaperEditor_menu">
                <div class="PaperEditor_menuGroup" v-for="(group, i) in options" :key="i">
                    <component
                        v-for="option in group"
                        :is="option.component || 'paper-button'"
                        :is-active="isActive[option.id] ? isActive[option.id]() : false"
                        :icon="option.icon"
                        :current-node="option.isNode ? getNodeAttrs(option.id) : (option.isMark ? getMarkAttrs(option.id) : null)"
                        v-bind="option.attrs"
                        @click="commands[option.id]()"

                        @input="(v) => commands[option.id](v) || undefined"

                        :key="option.id"
                    />
                </div>
            </div>
        </editor-menu-bar>

        <editor-view class="PaperEditor_view" :editor="editor" :editable="true" />
    </div>
</template>

<script>
import { Editor, EditorMenuBar } from 'tiptap'
import EditorView from './view'
import PaperButton from './components/paper-button'
import PaperSelect from './components/paper-select'
import Extensions from './plugins/index.js'

export default {
    name: 'PaperEditor',
    components: { EditorView, EditorMenuBar, PaperButton, PaperSelect },
    props: {
        value: { type: String, default: 'Hello' }
    },
    data: () => ({
        state: {
            current: 'styleSelect'
        },
        editor: null,
        options: []
    }),
    async mounted () {
        this.$data.editor = new Editor({
            extensions: Extensions.plugins,
            content: this.$props.value,
        })

        this.$data.options = [
            [
                { id: 'undo', label: 'Annuler', icon: 'undo-alt' },
                { id: 'redo', label: 'Rétablir', icon: 'redo-alt' }
            ], [  
                Extensions.menu.styledBlock()
            ], [
                { id: 'bold', label: 'Gras', icon: 'bold' },
                { id: 'italic', label: 'Italique', icon: 'italic' },
            ], [
                { id: 'fileSelect', label: 'Image', icon: 'image' },
                Extensions.menu.link(),
                { id: 'blockquote', label: 'Citation', icon: 'quote-right' },
                { id: 'bullet_list', label: 'Liste', icon: 'list-ul' },
                { id: 'ordered_list', label: 'Liste numérotée', icon: 'list-ol' },
            ]
        ]

        this.$data.editor.on('update', () => this.onUpdate())
        setTimeout(() => this.onUpdate(), 100)
    },
    methods: {
        onUpdate () {
            this.$emit('input', this.$data.editor.getHTML())
        }
    }
}
</script>