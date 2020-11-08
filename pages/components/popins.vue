<template>
    <div>
        <h1 class="Title Title--l mb-5">Popins, tooltips</h1>

        <h2 class="Title mb-30">Popins</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base</h3>

                <sandbox :component="getProto('PopinBase')" :props="{
                    isActive: popin1
                }" @close="popin1 = false">
                    <button-base @click="popin1 = true">
                        Open order page
                    </button-base>
                </sandbox>
            </div>
            <div class="col-6">

            </div>
        </div>

        <div class="pv-100"></div>
    </div>
</template>

<script>
import { PopinBase, ButtonBase } from '@/packages/core'

export default {
    name: 'ComponentsPopins',
    components: { PopinBase, ButtonBase },
    data: () => ({
        popin1: false
    }),
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        }
    }
}
</script>