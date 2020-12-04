<template>
    <div class="PopinBase" :class="[{ 'is-active': isActive }, ...$modifiers ]">
        <div class="PopinBase_body" ref="body">
            <div class="PopinBase_header">
                <slot name="header">
                    <div></div>
                </slot>

                <slot name="headerClose">
                    <div class="PopinBase_close" @click="$emit('close')">
                        <i class="fal fa-times"></i>
                    </div>
                </slot>
            </div>

            <div class="PopinBase_content">
                <slot name="content"></slot>
            </div>

            <div class="PopinBase_footer" v-if="$slots.footer || $slots.footerLeft || $slots.footerRight">
                <slot name="footer"></slot>
                <slot name="footerLeft"></slot>
                <slot name="footerRight"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import ModifiersMixin from '../../helpers/mixins/ModifiersMixin'

export default {
    name: 'PopinBase',
    mixins: [ ModifiersMixin ],
    props: {
        isActive: { type: Boolean, default: false }
    },
    data: () => ({
        listeners: {
            close: null
        }
    }),
    watch: {
        isActive: {
            handler (v) {
                if (v && this.$data.listeners.close) {
                    setTimeout(() => {
                        document.addEventListener('click', this.$data.listeners.close)
                    }, 100)
                } else if (this.$data.listeners.close) {
                    document.removeEventListener('click', this.$data.listeners.close)
                }
            }
        }
    },
    beforeDestroy () {
        document.removeEventListener('click', this.$data.listeners.close)
    },
    mounted () {
        this.$data.listeners.close = (e) => {
            if (!this.$refs.body.contains(e.target)) this.$emit('close')
        }
    }
}
</script>