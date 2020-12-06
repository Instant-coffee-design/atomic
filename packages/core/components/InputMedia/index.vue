<template>
    <div class="InputMedia">
        <input-upload :is-loading="state.loading" @input="onUpload" />
        
        <div class="mt-20">
            <gallery-mosaic :items="items" />
        </div>
    </div>
</template>

<script>
import InputUpload from '../InputUpload'
import GalleryMosaic from '../GalleryMosaic'

export default {
    name: 'InputMedia',
    components: { InputUpload, GalleryMosaic },
    props: {
        value: { type: Array, default: () => [] }
    },
    async fetch () {
        await this.$store.dispatch('library/fetch')
    },
    data: () => ({
        state: {
            loading: false
        }
    }),
    computed: {
        items () { return this.$store.getters['library/find']() }
    },
    methods: {
        async onUpload (files) {
            this.$data.state.loading = true

            for (const file of files) {
                let result = await this.$store.dispatch('library/create', {
                    file: file.raw
                })
            }
            
            this.$data.state.loading = false
        }
    }
}
</script>