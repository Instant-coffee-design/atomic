<template>
    <div class="InputUpload">
        <div class="InputUpload_body">
            <div class="InputUpload_input">
                <input-base class="InputUpload_element" :modifiers="['file-upload']" type="file" :attrs="{ multiple: true }" @input="addFiles" />

                <div>
                    <p class="ft-3xl">
                        <i class="fal fa-cloud-upload color-ft-weak fa-2x mb-10"></i>
                    </p>

                    Choisir des fichiers ou les faire glisser
                </div>
            </div>

            <div class="InputUpload_upload" :class="{ 'is-active': files.length > 0 }" v-show="files.length > 0">
                <div
                    v-for="(file, i) in files"
                    class="InputUpload_file"
                    :class="{ 'is-loaded': file.loaded, 'is-loading': file.loading }"
                    :key="i"
                >   
                    <div class="InputUpload_title">
                        <span class="ft-l mr-10">
                            <i class="fal" :class="[ getTypeIcon(file.raw.type) ]"></i>
                        </span>

                        {{ file.name }}
                    </div>
                    
                    <div class="InputUpload_status">
                        <i class="fal fa-times color-ft-weak" @click.stop="deleteFile(file.name)" v-if="!file.loading && !file.loaded && !isLoading"></i>
                        <i class="fal fa-spinner-third spin color-ft-weak" v-if="file.loading && !file.loaded"></i>
                        <i class="fal fa-check color-blueberry" v-if="file.loaded && !file.error"></i>
                        <i class="fal fa-times color-error" v-if="file.error"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="InputUpload_actions" :class="{ 'is-active': queuedFiles.length > 0 && !isLoading }">
            <div>
                <div class="ft-s color-ft-weak p-5" @click="files = []">Réinitialiser</div>
            </div>

            <button-base
                :modifiers="['s']"
                @click.stop="upload"
            >
                Uploader {{ queuedFiles.length }} fichier(s)
            </button-base>
        </div>

        <div class="InputUpload_actions" :class="{ 'is-active': !isLoading && loadedFiles.length > 0 && loadedFiles.length == files.length }">
            <div class="text-center ft-s fx-grow color-blueberry ph-20" v-if="status == 'success'">
                <i class="fal fa-check mr-5"></i> Les fichiers ont été chargés avec succès. Ils se trouvent dans la Bibliothèque de médias.
            </div>
            <div class="text-center ft-s fx-grow color-error ph-20" v-else-if="status == 'partial'">
                <i class="fal fa-exclamation-triangle mr-5"></i> Certains fichiers n'ont pas pu être chargés, veuillez réessayer.
            </div>
            <div class="text-center ft-s fx-grow color-error ph-20" v-else-if="status == 'fail'">
                <i class="fal fa-times mr-5"></i> Les fichiers n'ont pas pu être chargés, veuillez réessayer.
            </div>
        </div>
    </div>
</template>

<script>
import InputBase from '../InputBase/index.vue'

export default {
    name: 'InputUpload',
    components: { InputBase },
    props: {
        value: { type: Array, default: () => [] },
        isLoading: { type: Boolean, default: false }
    },
    data: () => ({
        files: [],
        state: {
            loading: false
        }
    }),
    computed: {
        queuedFiles () { return this.$data.files.filter(f => !f.loaded && !f.loading) },
        loadedFiles () { return this.$data.files.filter(f => f.loaded) },
        status () {
            let status = 'success'
            if (this.$data.files.filter(f => f.error).length > 0) status = 'partial'
            if (this.$data.files.filter(f => f.error).length >= this.$data.files.length) status = 'fail'

            return status
        }
    },
    watch: {
        value: {
            immediate: true,
            handler (v) {
                this.$data.files = v
            }
        }
    },
    methods: {
        getTypeIcon (type) {
            let icon = 'fa-file-alt'

            if (type.indexOf('image') > -1) icon = 'fa-file-image'
            if (type.indexOf('html') > -1) icon = 'fa-file-code'

            return icon
        },
        addFiles (files) {
            this.$data.files = [ ...this.queuedFiles, ...files.map(file => ({
                name: file.name,
                raw: file,
                loaded: false,
                loading: false
            }))]
        },
        deleteFile (name) {
            this.$data.files = this.$data.files.filter(i => i.name != name)
        },
        upload () {
            this.$emit('input', this.$data.files)
        }
    }
}
</script>