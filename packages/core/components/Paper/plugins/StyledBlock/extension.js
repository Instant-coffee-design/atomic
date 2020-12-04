import { Node } from 'tiptap'
import { toggleBlockType, setBlockType, textblockTypeInputRule } from 'tiptap-commands'

export default class StyledBlock extends Node {

    get name() {
        return 'styledBlock'
    }

    get schema() {
        return {
            attrs: {
                tag: { default: 'p' },
                classes: { default: [] }
            },
            content: 'text*',
            group: 'block',
            defining: false,
            draggable: false,
            parseDOM: [{
                tag: ['p', 'h1', 'h2', 'h3'],
                priority: 999,
                getAttrs: dom => ({
                    tag: dom.tagName.toLowerCase(),
                    classes: dom.hasAttribute('class') ? dom.getAttribute('class').explode(' ') : []
                })
            }],
            toDOM: node => [node.attrs.tag, {
                class: node.attrs.classes.join(" ")
            }, 0],
        }
    }

    commands({ type, schema }) {
        return (attrs) => toggleBlockType(type, schema.nodes.paragraph, attrs)
    }

    inputRules({ type }) {
        return [
            textblockTypeInputRule(/^```$/, type),
        ]
    }
}