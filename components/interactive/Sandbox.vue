<template>
    <div class="Sandbox">
        <div class="Sandbox_content">
            <component :is="component" v-bind="currentProps" />
        </div>
        <div class="Sandbox_configurator" v-if="component">
            Component

            <div
                class="d-flex"
                v-for="(prop, propName) in component.props"
                :key="propName"
            >
                <p>{{ propName }}</p>
                <div>
                    <textarea
                        @input="(e) => onInput(e, propName, prop)"
                        :value="getStringValue(currentProps[propName])"
                    >
                    </textarea>
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
        componentInstance: null,
        currentProps: { text: 'lol' }
    }),
    created () {
        for (const [key, value] of Object.entries(this.$props.component.props)) {
            this.$set(this.$data.currentProps, key, this.getPropValue(value))
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
                case 'Object': return prop.default()
                default: return prop.default
            }
        },
        onInput (e, propName, prop) {
            let value = e.target.value

            if (prop.type.name !== 'String') value = JSON.parse(value)

            this.$set(this.$data.currentProps, propName, value)
        }
    }
}
</script>