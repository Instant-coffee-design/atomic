<template>
    <div>
        <h1 class="Title Title--l mb-5">Paper</h1>

        <h2 class="Title mb-30">Text editor</h2>
        <div>
            <paper-editor :value="value" />
        </div>

        <div class="pv-100"></div>
    </div>
</template>

<script>
import { PaperEditor, PaperView } from '@/packages/core/index.js'

export default {
    name: 'ComponentsPaper',
    components: { PaperEditor, PaperView },
    data: () => ({
        value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci nisi, fringilla sit amet leo ut, scelerisque fringilla lorem.</p><h1>Etiam eu lacus eget nunc ultrices pulvinar. Integer eu pharetra ex.</h1>'
    }),
    methods: {
        getProto (name) {
            return this.$options.__proto__.components[name]
        },
    }
}
</script>