<template>
    <component
        :is="tag"
        class="ButtonBase"
        :class="{ ...$modifiers }"
        v-bind="computedAttrs"
        v-on="$listeners"
    >
        <div class="ButtonBase_content">
            <span class="ButtonBase_iconBefore" v-if="iconBefore">
                <i class="fal" :class="[`fa-${iconBefore}`]"></i>
            </span>

            <span class="ButtonBase_before" v-if="$slots.before">
                <slot name="before"></slot>
            </span>
            <span class="ButtonBase_text">
                {{ text ? text : '' }}
                <slot></slot>
            </span>
            <span class="ButtonBase_after" v-if="$slots.after">
                <slot name="after"></slot>
            </span>

            <span class="ButtonBase_iconAfter" v-if="iconAfter">
                <i class="fal" :class="[`fa-${iconAfter}`]"></i>
            </span>
        </div>
    </component>
</template>

<script>
import SCHEMA from './schema.js'
import ModifiersMixin from '../../helpers/mixins/ModifiersMixin'

export default {
    name: 'ButtonBase',
    mixins: [ ModifiersMixin ],
    schema: SCHEMA,
    props: {
        tag: { type: String, default: 'button' },
        link: { type: String },
        text: { type: String },
        target: { type: String },
        disabled: { type: Boolean },
        iconBefore: { type: String, default: '' },
        iconAfter: { type: String, default: '' },
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