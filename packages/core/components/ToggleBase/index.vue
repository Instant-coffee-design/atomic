<template>
    <label class="Toggle" v-bind="attrs">
        <input class="Toggle_checkbox" type="checkbox" :checked="transformedValue" @click="onInput(!transformedValue)">
        <div class="Toggle_container"></div>

        <p class="Toggle_label" v-if="label">{{ label }}</p>
    </label>
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