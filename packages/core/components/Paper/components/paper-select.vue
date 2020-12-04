<template>
    <div
        class="PaperEditor_select"
    >
        <select-base
            :options="items"
            :value="selectedId"
            @input="onInput"
        />
    </div>
</template>

<script>
import SelectBase from '../../SelectBase'

export default {
    name: 'PaperSelect',
    components: { SelectBase },
    props: {
        items: { type: Array, default: () => [] },
        currentNode: { type: Object, default: () => [] }
    },
    computed: {
        selectedId () {
            let value = this.$props.items.find(i => JSON.stringify(i.value) == JSON.stringify(this.$props.currentNode))
            return value ? value.id : false 
        }
    },
    methods: {
        onInput (id) {
            this.$emit('input', this.$props.items.find(i => i.id == id).value)
        }
    }
}
</script>