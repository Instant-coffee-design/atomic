<template>
    <div class="Toggle" v-bind="attrs">
        <label class="Toggle_label">
            {{ label }}
            <input class="Toggle_checkbox" type="checkbox" :checked="transformedValue" @click="onInput(!transformedValue)">
        </label>
    </div>
</template>

<script>
export default {
    name: 'ToggleBase',
    props: {
        value: { type: [Boolean, String], default: false },
        label: { type: String, default: '' },
        transformer: { type: [Object, Boolean], default: false },
        attrs: { type: Object, default: () => {} }
    },
    computed: {
        transformedValue () {
            return this.$props.transformer ? this.$props.transformer.get(this.$props.value) : this.$props.value
        }
    },
    methods: {
        onInput (value) {
            this.$emit('input', this.$props.transformer ? this.$props.transformer.set(value) : value)
        }
    }
}
</script>