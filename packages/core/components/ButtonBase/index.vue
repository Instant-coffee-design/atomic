<template>
    <component
        :is="tag"
        class="ButtonBase"
        :class="{ ...$modifiers }"
        v-bind="computedAttrs"
        v-on="$listeners"
    >
        <div class="ButtonBase_content">
            <span class="ButtonBase_before">
                <slot name="before"></slot>
            </span>
            <span class="ButtonBase_text">
                {{ text ? text : '' }}
                
                <slot></slot>
            </span>
            <span class="ButtonBase_after">
                <slot name="before"></slot>
            </span>
        </div>
    </component>
</template>

<script>
import SCHEMA from './schema.js'
import BaseMixin from '../../helpers/mixins/BaseMixin'

export default {
    name: 'ButtonBase',
    mixins: [ BaseMixin ],
    schema: SCHEMA,
    props: {
        tag: { type: String, default: 'button' },
        link: { type: String },
        text: { type: String },
        target: { type: String },
        disabled: { type: Boolean },
        attrs: { type: Object, default: () => ({}) }
    },
    computed: {
        computedAttrs () {
            return {
                disabled: this.$props.disabled,
                target: this.$props.target,
                href: this.$props.link,
                ...this.$props.attrs
            }
        }
    }
}
</script>