<template>
    <div>
        <h1 class="Title Title--l">Boutons</h1>
        <sandbox :component="getProto('ButtonBase')" />
    </div>
</template>

<script>
import { ButtonBase } from '@/packages/core'

export default {
    name: 'ComponentsButtons',
    components: { ButtonBase },
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        }
    }
}
</script>