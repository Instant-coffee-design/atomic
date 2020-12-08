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
                <div class="p-30">
                    {{ content }}

                    <div v-for="(input, id) in form" class="mv-20" :key="id">
                        <component
                            :is="input.is ? input.is : 'input-base'"
                            v-bind="input"
                            :value="input.transformer && input.transformer.get ? input.transformer.get(value[id]) : value[id]"
                            @input="(v) => value[id] = v"
                        />
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
import InputMedia from '../../InputMedia'
import ToggleBase from '../../ToggleBase'
import ButtonBase from '../../ButtonBase'

export default {
    name: 'PaperPopin',
    components: { PopinBase, ButtonBase, InputBase, ToggleBase, InputMedia },
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
                this.$data.value = this.formToValues(form)
            }
        },
        currentNode: {
            immediate: true,
            handler (node) {
                this.$data.value = {
                    ...this.$data.value,
                    ...this.formToValues(this.$props.form),
                    ...(node ? node : {})
                }
            }
        }
    },
    methods: {
        formToValues (form) {
            let values = {}

            Object.keys(form).forEach(id => {
                values[id] = form[id].value
            })

            return values
        },
        onInput () {
            let values = Object.keys(this.$props.form).reduce((prev, key) => {
                let value = this.$data.value[key]
                let form = this.$props.form[key]

                return {
                    ...prev,
                    [key]: form.transformer && form.transformer.set ? form.transformer.set(value) : value
                }
            }, {})

            this.$emit('input', values)

            this.$emit('close')
        }
    }
}
</script>