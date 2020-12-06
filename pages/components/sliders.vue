<template>
    <div>
        <h1 class="Title Title--l mb-10">Gallery mosaic</h1>

        <sandbox
            classes="width-100"
            :component="getProto('GalleryMosaic')"
            :props="{
                height: 250
            }"
        />
    </div>
</template>

<script>
import { GalleryMosaic } from '@/packages/core/index.js'

export default {
    name: 'ComponentsSliders',
    components: { GalleryMosaic },
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        }
    }
}
</script>