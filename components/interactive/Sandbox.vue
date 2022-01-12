<template>
    <div class="Sandbox" :class="{ 'is-active': state.isOpen }">
        <div class="Sandbox_content">
            <component
                :is="component"
                :class="classes"
                :modifiers="currentModifiers"
                :value="value"
                v-bind="currentProps"
                v-on="$listeners"
                v-if="component"
            />

            <slot></slot>

            <div class="Sandbox_toggle" @click="state.isOpen = !state.isOpen" v-if="component">
                <i class="fal fa-cog"></i>
            </div>
        </div>

        <div class="Sandbox_configurator" v-if="component">
            <div v-if="modifiers">
                Modifiers
                
                <button v-for="modifier in modifiers" class="m-5" :key="modifier" @click="toggleModifier(modifier)">
                    {{ modifier }} <span v-show="currentModifiers.indexOf(modifier) > -1">✅</span>
                </button>
            </div>

            <div
                v-for="(prop, propName) in component.props"
                class="mv-10"
                :key="propName"
            >
                <input-base
                    :label="propName"
                    :value="getStringValue(currentProps[propName])"
                    v-bind="getInputType(getTypeArray(prop.type))"
                    @input="(v) => onInput(v, propName, prop)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { ButtonBase, InputBase } from '@/packages/core'

export default {
    name: 'Sandbox',
    components: { ButtonBase, InputBase },
    props: {
        classes: { type: String, default: '' },
        component: { type: [Object, Boolean], default: false },
        props: { type: [Object, Boolean], default: false },
        value: { type: [String, Number, Array, Boolean] }
    },
    data: () => ({
        currentProps: {},
        currentModifiers: [],
        state: {
            isOpen: false
        }
    }),
    computed: {
        modifiers () {
            if (!this.$props.component) return false

            return this.$props.component.schema ? this.$props.component.schema.modifiers : null
        },
        defaultValues () {
            if (!this.$props.component) return false

            return {
                ...(this.$props.component.schema && this.$props.component.schema.default ? this.$props.component.schema.default : {}),
                ...this.$props.props
            }
        }
    },
    watch: {
        component: {
            immediate: true,
            deep: true,
            handler (v) {
                if (v) this.update()
            }
        },
        props: {
            deep: true,
            handler (v) {
                if (v) this.update()
            }
        }
    },
    methods: {
        update () {
            if (!this.$props.component.props) return
            
            for (const [key, value] of Object.entries(this.$props.component.props)) {
                if (this.defaultValues && this.defaultValues[key] !== undefined) {
                    this.$set(this.$data.currentProps, key, this.defaultValues[key])
                } else if (value.default !== undefined) {
                    this.$set(this.$data.currentProps, key, this.getPropValue(value))
                }
            }
        },
        getStringValue (value) {
            switch (typeof value) {
                case 'object': return JSON.stringify(value)
                default: return value
            }
        },
        getPropValue (prop) {
            let types = this.getTypeArray(prop.type)

            if (types.includes('Boolean') || types.includes('String')) {
                return prop.default
            } 

            if (types.includes('Object') || types.includes('Array')) {
                return prop.default()
            }

            return prop.default
        },
        getInputType (types) {
            let props = {}

            if (types.includes('Boolean')) {
                props = { ...props, type: 'checkbox' };
            } 

            if (types.includes('Number')) {
                props = { ...props, type: 'number', helpers: ['number'] };
            }

            if (types.includes('String')) {
                props = { ...props, type: 'text' };
            }

            return props
        },
        getTypeArray (type) {
            if (!Array.isArray(type)) type = [type]
            type = type.map(t => t.name)

            return type
        },
        onInput (value, propName, prop) {
            let types = this.getTypeArray(prop.type)
            
            if (types.includes('Object') || types.includes('Array')) {
                try {
                    value = JSON.parse(value)
                } catch (e) {
                    value = types.includes('Object') ? {} : []
                }
            }

            this.$set(this.$data.currentProps, propName, value)
        },
        toggleModifier (value) {
            if (this.$data.currentModifiers.indexOf(value)> -1) {
                this.$data.currentModifiers = this.$data.currentModifiers.filter(v => v != value)
            } else {
                this.$data.currentModifiers = [ ...this.$data.currentModifiers, value ]
            }
        }
    }
}
</script>