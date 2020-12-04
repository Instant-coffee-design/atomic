import { Mark } from 'tiptap'
import { updateMark, removeMark } from 'tiptap-commands'

import LinkBase from '../../../ButtonBase/index.vue'

export default class Link extends Mark {

    get name() {
        return 'link'
    }

    get schema() {
        return {
            attrs: {
                href: { default: null },
                is: { default: 'a' },
                target: { default: '_self' },
                class: { default: ['ButtonBase--link'] }
            },
            inclusive: false,
            parseDOM: [{
                tag: 'a',
                priority: 9,
                getAttrs: dom => ({
                    href: dom.getAttribute('href'),
                    target: dom.hasAttribute('target') ? dom.getAttribute('target') : '_self'
                }),
            }],
            toDOM: node => ['a', {
                href: node.attrs.href
            }, 0]
        }
    }

    commands({ type }) {
        return attrs => {
            if (attrs.href) return updateMark(type, attrs)
            return removeMark(type)
        }
    }

    get view() {
        return LinkBase
    }
}