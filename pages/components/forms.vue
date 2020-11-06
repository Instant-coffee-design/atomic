<template>
    <div>
        <h1 class="Title Title--l mb-5">Forms, inputs</h1>

        <h2 class="Title mb-30">Input text</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, no value</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'Order mocha'
                }" v-model="input1" />
            </div>
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, with value</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'Order mocha'
                }" v-model="input2" />
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">Input number</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, no value</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'How many sugars?',
                    constraints: {
                        boundsNumber: { value: [0, 5] }
                    },
                    helpers: ['number'],
                    type: 'number'
                }" v-model="input3" />
            </div>
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, with value</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'How many sugars?',
                    constraints: {
                        boundsNumber: { value: [0, 5] }
                    },
                    helpers: ['number'],
                    type: 'number'
                }" v-model="input4" />
            </div>
        </div>

        <div class="pv-100"></div>
    </div>
</template>

<script>
import { InputBase } from '@/packages/core'

export default {
    name: 'ComponentsButtons',
    components: { InputBase },
    data: () => ({
        input1: '',
        input2: 'With caramel',
        input3: '',
        input4: 4
    }),
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        }
    }
}
</script>