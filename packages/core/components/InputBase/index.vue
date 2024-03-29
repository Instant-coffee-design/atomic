<template>
    <div class="InputBase" :class="[ $modifiers, ...classes ]">
        <label class="InputBase_label" v-if="label">
            {{ label }}
        </label>

        <template v-if="type == 'file'">
            <button-base class="InputBase_fileSelect">
                {{ label ||  "Choisir un fichier" }}
            </button-base>

            <label class="InputBase_fileLabel">
                {{ value.length > 0 ? (value.length == 1 ? value[0].name : value.length + ' fichiers sélectionnés') : 'Aucun fichier sélectionné' }}
            </label>

            <input
                class="InputBase_element"
                :type="type"
                v-bind="attrs"
                @input="(e) => onInput(Object.keys(e.target.files).map(key => e.target.files[key]))"
            >
        </template>

        <template v-else>
            <input
                class="InputBase_element"
                :value="value"
                :type="computedType"
                v-bind="attrs"
                @focus="state.isFocused = true"
                @blur="state.isFocused = false"
                @input="(e) => onInput(e.target.value)"
            >
        </template>

        <div class="Inputbase_helpers" v-if="helpers.length > 0 || Object.keys(constraints).length > 0 || suffix || $slots.default">
            <slot></slot>
            
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

            <helper-reveal
                class="Inputbase_helper"
                @click.native="reveal = !reveal"
                :is-revealed="reveal"
                v-if="helpers.includes('reveal')"
            />

            <div class="Inputbase_helper" v-if="suffix">
                {{ suffix }}
            </div>

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
import HelperReveal from './components/HelperReveal'
import { validateWithConstraints } from '../../helpers/InputValidators'
import ModifiersMixin from '../../helpers/mixins/ModifiersMixin'

export default {
    name: 'InputBase',
    schema: SCHEMA,
    mixins: [ ModifiersMixin ],
    components: { HelperErrors, HelperNumber, HelperReset, HelperReveal },
    props: {
        label: { type: String, default: '' },
        type: { type: String, default: 'text' },
        suffix: { type: String, default: '' },
        value: { type: [String, Number, Boolean, Object, Array] },
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
        reveal: false,
        errors: []
    }),
    computed: {
        classes () {
            let classes = {}

            if (this.$props.type == 'file') classes['InputBase--file'] = true
            if (this.$data.state.isValue) classes['is-value'] = true
            if (this.$data.state.isFocused) classes['is-focused'] = true
            
            return classes
        },
        computedType () {
            return this.reveal ? 'text' : this.type
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