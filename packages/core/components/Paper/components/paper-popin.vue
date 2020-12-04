<template>
    <div
        class="PaperEditor_popin"
    >
        <popin-base
            :is-active="isActive"
            v-bind="attrs"
            @close="$emit('close')"
        >
            <template slot="content">
                <div class="p-40">
                    {{ content }}

                    <div v-for="(input, id) in form" class="mv-20" :key="id">
                        <input-base v-bind="input" v-model="value[id]" />
                    </div>
                </div>
            </template>

            <template slot="footer">
                <div></div>

                <button-base @click="onInput">
                    Valider
                </button-base>
            </template>
        </popin-base>
    </div>
</template>

<script>
import PopinBase from '../../PopinBase'
import InputBase from '../../InputBase'
import ButtonBase from '../../ButtonBase'

export default {
    name: 'PaperPopin',
    components: { PopinBase, ButtonBase, InputBase },
    props: {
        content: { type: String, default: '' },
        form: { type: Object, default: () => {} },
        isActive: { type: Boolean, default: false },
        attrs: { type: Object, default: () => {} },
        currentNode: { type: Object, default: () => {} }
    },
    data: () => ({
        value: {}
    }),
    watch: {
        form: {
            immediate: true,
            deep: true,
            handler (form) {
                this.$data.value = {}

                Object.keys(form).forEach(id => {
                    this.$data.value[id] = form[id].value
                })
            }
        }
    },
    methods: {
        onInput () {
            this.$emit('input', this.$data.value)
            this.$emit('close')
        }
    }
}
</script>