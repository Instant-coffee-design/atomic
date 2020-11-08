<template>
    <div>
        <h1 class="Title Title--l mb-5">Popins, tooltips</h1>

        <h2 class="Title mb-30">Popins</h2>
        <div class="row-xs">
            <div class="col-12">
                <h3 class="Title Title--s mb-10">Base</h3>

                <sandbox :component="getProto('PopinBase')" :props="{
                    isActive: popin1
                }" @close="popin1 = false">
                    <button-base @click="popin1 = true">
                        Open order page
                    </button-base>
                </sandbox>
            </div>
        </div>

        <h2 class="Title mb-30 mt-60">Tooltips</h2>
        <div class="row-xs">
            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base</h3>

                <sandbox>
                    <i
                        class="fal fa-info-circle"
                        @mouseenter="(e) => $store.commit('tooltips/open', {
                            content: '100% Organic, GMO-free coffee', element: e.target
                        })"
                        @mouseleave="$store.commit('tooltips/close')"
                    ></i>
                </sandbox>
            </div>

            <div class="col-6">
                <h3 class="Title Title--s mb-10">Base</h3>

                <sandbox>
                    <button-base
                        @mouseenter="(e) => $store.commit('tooltips/open', {
                            content: 'Click here to confirm order',
                            element: e.target
                        })"
                        @mouseleave="$store.commit('tooltips/close')"
                    >Brew fresh coffee</button-base>
                </sandbox>
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