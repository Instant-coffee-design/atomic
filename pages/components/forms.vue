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

        <h2 class="Title mb-30 mt-60">Input file</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, no value</h3>
                <sandbox :component="getProto('InputBase')" :props="{ 
                    label: 'Choisir un fichier',
                    type: 'file'
                }" v-model="inputFile1" />
            </div>
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base, multiple</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'Choisis une photo',
                    type: 'file',
                    attrs: {
                        multiple: true
                    }
                }" v-model="inputFile2" />
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">Helpers</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Number w/ constraints</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'How many sugars?',
                    constraints: {
                        boundsNumber: { value: [0, 5] }
                    },
                    helpers: ['number'],
                    type: 'number'
                }" v-model="input4" />
            </div>
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Reset w/o constraints</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'Any extras?',
                    helpers: ['reset'],
                    default: 'No shots',
                    type: 'text'
                }" v-model="input5" />
            </div>
            
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Reset w/o reveal</h3>
                <sandbox :component="getProto('InputBase')" :props="{
                    label: 'Password',
                    helpers: ['reveal'],
                    default: 'No shots',
                    type: 'password'
                }" v-model="input5" />
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">Select</h2>
        <div class="row-xs fx-wrap">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Simple select</h3>
                <sandbox :component="getProto('SelectBase')" :props="{
                    label: 'Choose your beverage',
                    options: input6options,
                    placeholder: 'Select an option...'
                }" v-model="input6" />
            </div>

            <div class="col-6">
                <h3 class="Title Title--s mb-10">Select w/ search</h3>
                <sandbox :component="getProto('SelectBase')" :props="{
                    label: 'Choose your beverage',
                    options: input6options,
                    enableSearch: true,
                    enableAdd: true,
                    placeholder: 'Type to search...'
                }" v-model="input6" @add="onOptionAdd" />
            </div>

            <div class="col-6 mt-20">
                <h3 class="Title Title--s mb-10">Select multiple w/ search</h3>
                <sandbox :component="getProto('SelectBase')" :props="{
                    label: 'Choose your beverage',
                    options: input6options,
                    enableMultiple: true,
                    enableSearch: true,
                    enableAdd: true,
                    placeholder: 'Type to search...'
                }" v-model="input7" @add="onOptionAdd" />
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">Checkbox & radio</h2>
        <div class="row-xs fx-wrap">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Simple toggle</h3>
                <sandbox :component="getProto('ToggleBase')" :props="{
                    label: 'Extra caramel?'
                }" v-model="checkbox1" />
            </div>

            <div class="col-6">
                <h3 class="Title Title--s mb-10">Simple toggle, no label</h3>
                <sandbox :component="getProto('ToggleBase')" :props="{
                    
                }" v-model="checkbox1" />
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">InputUpload</h2>
        <sandbox :component="getProto('InputUpload')" :props="{
    
        }" v-model="inputFiles" />

        <div class="pv-100"></div>
    </div>
</template>

<script>
import { InputBase, SelectBase, InputUpload, ToggleBase } from '@/packages/core/index.js'

export default {
    name: 'ComponentsButtons',
    components: { InputBase, SelectBase, InputUpload, ToggleBase },
    data: () => ({
        input1: '',
        input2: 'With caramel',
        input3: '',
        input4: 4,
        input5: 'Extra shot',
        input6: null,
        input6options: [
            { id: 0, label: 'Espresso', value: 'espresso' },
            { id: 1, label: 'Americano', value: 'americano' },
            { id: 2, label: 'Matcha latte', value: 'matcha-latte' },
            { id: 3, label: 'Pumpkin spice latte with super extra ice supplement', value: 'pumpkin-spice-latte' },
            { id: 4, label: 'Caramel macchiato', value: 'caramel-macchiato' }
        ],
        input7: [],
        inputFile1: '',
        inputFile2: '',
        inputFiles: [],
        checkbox1: false
    }),
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        },
        onOptionAdd (label) {
            let id = this.$data.input6options.length 

            this.$set(this.$data, 'input6options', [
                ...this.$data.input6options,
                { id, label: label, value: label }
            ])

            this.$data.input6 = id
        }
    }
}
</script>