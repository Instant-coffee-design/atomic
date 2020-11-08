<template>
    <div class="PopinBase" :class="{ 'is-active': isActive }">
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
                <p class="p-20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat odio urna, et tempor est fermentum a. Mauris in felis ultrices, interdum ligula vel, hendrerit ipsum. Maecenas ac interdum arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque feugiat sollicitudin varius. Maecenas vel rhoncus diam, sit amet laoreet dolor. Aliquam vitae aliquam erat, in tempor est. Vivamus rutrum blandit sapien, eu vulputate lorem.

                    Nam posuere, libero eu mattis suscipit, eros ipsum varius nisl, et consectetur tortor urna nec urna. Suspendisse ornare laoreet purus, eu vulputate est suscipit egestas. Nullam elit magna, euismod in imperdiet vitae, consequat sed nulla. Ut sit amet neque tincidunt, vehicula turpis vel, euismod nisi. Nulla non feugiat eros. Pellentesque ullamcorper ut nibh et dictum. In porttitor pharetra ipsum quis sagittis. Maecenas non vestibulum magna. Morbi justo sapien, congue vitae mauris sed, scelerisque convallis magna. Quisque congue diam non tempus semper. Integer faucibus lorem ac dolor commodo, at tempus diam volutpat. Integer feugiat, nibh a convallis vulputate, turpis justo pellentesque nisl, eu euismod purus sem vel tellus. Fusce ligula tortor, porta quis odio sit amet, congue lobortis tortor. Nulla ornare nulla vitae tempor luctus.
                </p>
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
export default {
    name: 'PopinBase',
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