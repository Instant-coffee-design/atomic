<template>
    <div class="Sandbox">
        <div class="Sandbox_content">
            <component :is="component" :modifiers="currentModifiers" v-bind="currentProps" />
        </div>
        <div class="Sandbox_configurator" v-if="component">
            <div v-if="modifiers">
                Modifiers
                
                <button v-for="modifier in modifiers" class="m-5" :key="modifier" @click="toggleModifier(modifier)">
                    {{ modifier }} <span v-show="currentModifiers.indexOf(modifier) > -1">✅</span>
                </button>
            </div>

            <div
                class="d-flex"
                v-for="(prop, propName) in component.props"
                :key="propName"
            >
                <p>{{ propName }}</p>
                
                <div>
                    <template v-if="prop.type.name == 'Boolean'">
                        <input
                            type="checkbox"
                            @input="(e) => onInput(e.target.checked, propName, prop)"
                            :value="getStringValue(currentProps[propName])"
                        >
                    </template>
                    <template v-else>
                        <textarea
                            @input="(e) => onInput(e.target.value, propName, prop)"
                            :value="getStringValue(currentProps[propName])"
                        ></textarea>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'Sandbox',
    props: {
        component: { type: Object, default: () => ({}) }
    },
    data: () => ({
        currentProps: {},
        currentModifiers: []
    }),
    computed: {
        modifiers () {
            return this.$props.component.schema ? this.$props.component.schema.modifiers : null
        }
    },
    watch: {
        component: {
            immediate: true,
            deep: true,
            handler (v) {
                if (v) {
                    for (const [key, value] of Object.entries(v.props)) {
                        if (value.default) this.$set(this.$data.currentProps, key, this.getPropValue(value))
                    }
                }
            }
        }
    },
    methods: {
        getStringValue (value) {
            switch (typeof value) {
                case 'object': return JSON.stringify(value)
                default: return value
            }
        },
        getPropValue (prop) {
            switch (prop.type.name) {
                case 'String': return prop.default
                case 'Boolean': return prop.default
                case 'Object': return prop.default()
                default: return prop.default
            }
        },
        onInput (value, propName, prop) {
            try {
                if (prop.type.name !== 'String') value = JSON.parse(value)
                this.$set(this.$data.currentProps, propName, value)
            } catch (e) {}
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