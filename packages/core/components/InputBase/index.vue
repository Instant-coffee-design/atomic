<template>
    <div class="InputBase" :class="[ ...classes ]">
        <label class="InputBase_label" v-if="label">
            {{ label }}
        </label>

        <input
            class="InputBase_element"
            :value="value"
            :type="type"
            v-bind="attrs"
            @focus="state.isFocused = true"
            @blur="state.isFocused = false"
            @input="(e) => onInput(e.target.value)"
        >

        <div class="Inputbase_helpers" v-if="helpers.length > 0 || Object.keys(constraints).length > 0">
            <helper-number
                class="Inputbase_helper"
                @increment="increment(1)"
                @decrement="increment(-1)"
                v-if="helpers.includes('number')"
            />

            <helper-reset
                class="Inputbase_helper"
                :is-active="state.isValue"
                @click="reset"
                v-if="helpers.includes('reset')"
            />

            <helper-errors
                class="Inputbase_helper"
                :errors="errors"
                :is-valid="state.isValid"
                :is-active="errors.length > 0 && state.isFocused"
                v-show="state.isValue"
                v-if="Object.keys(constraints).length > 0"
            />
        </div>
    </div>
</template>

<script>
import SCHEMA from './schema'
import HelperErrors from './components/HelperErrors'
import HelperNumber from './components/HelperNumber'
import HelperReset from './components/HelperReset'
import { validateWithConstraints } from '../../helpers/InputValidators'

export default {
    name: 'InputBase',
    schema: SCHEMA,
    components: { HelperErrors, HelperNumber, HelperReset },
    props: {
        label: { type: String },
        type: { type: String, default: 'text' },
        value: { type: [String, Number, Boolean] },
        helpers: { type: Array, default: () => [] },
        constraints: { type: Object, default: () => ({}) },
        default: { type: [String, Number] },
        attrs: { type: Object, default: () => ({}) },
    },
    data: () => ({
        state: {
            isFocused: false,
            isValue: false,
            isValid: false
        },
        errors: []
    }),
    computed: {
        classes () {
            let classes = {}

            if (this.$data.state.isValue) classes['is-value'] = true
            if (this.$data.state.isFocused) classes['is-focused'] = true
            
            return classes
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler (v) {
                this.$data.state.isValue = typeof v !== undefined && v !== ''
                this.validate(v)
            }
        }
    },
    methods: {
        onInput (v) {
            this.validate(v)
            this.$emit('input', v)
        },
        increment (v) {
            let value = parseInt(this.$props.value)

            if (Number.isNaN(value)) value = this.$props.default ? this.$props.default : 0

            this.onInput(value + v)
        },
        validate (v) {
            if (Object.keys(this.$props.constraints).length <= 0) return
            
            const result = validateWithConstraints(v, this.$props.constraints)
            
            this.$data.state.isValid = result.valid
            this.$data.errors = result.errors
        },
        reset () {
            this.onInput(this.$props.default)
        }
    }
}
</script>