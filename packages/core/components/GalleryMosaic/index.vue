<template>
    <div class="GalleryMosaic" :class="{ 'is-no-selection': selected.length <= 0 }">
        <div class="GalleryMosaic_row" v-for="(row, i) in imageRows" :key="i">
            <div
                v-for="image in row.images"
                class="GalleryMosaic_imageContainer ActionMenu_hover" 
                :class="{ 'is-active': selected.includes(image._id) }"
                :style="{ '--width': image.width + 'px', '--height': image.height + 'px' }"
                @click="$emit('input', image._id)"
                :key="image._id"
            >
                <img class="GalleryMosaic_image" :width="Math.min(image.original.width * 0.8, image.width)" :height="Math.min(image.original.height * 0.8, image.height)" :src="image.src" />

                <div class="GalleryMosaic_selector" v-if="selectable">
                    <i class="fal fa-check"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SCHEMA from './schema.js'

export default {
    name: 'GalleryMosaic',
    schema: SCHEMA,
    props: {
        items: { type: Array, default: () => [] },
        height: { type: Number, default: 175 },
        selected: { type: Array, default: () => [] },
        selectable: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false }
    },
    data: () => ({
        maxWidth: 0
    }),
    mounted () {
        this.$data.maxWidth = this.$el.offsetWidth
    },
    computed: {
        imageRows () {
            let images = this.$props.items.slice()
            
            let rows = []
            let safeguard = 0

            while (images.length > 0 && safeguard < 100) {
                safeguard++

                let currentRow = {
                    width: 0,
                    images: []
                }

                while (currentRow.width < this.$data.maxWidth && images.length > 0 && safeguard < 100) {
                    safeguard++
                    
                    let current = images[0].sizes['s']
                    let width = (this.$props.height / current.height) * current.width

                    currentRow.images.push({
                        ...current,
                        _id: images[0]._id,
                        original: current,
                        width: width,
                        height: this.$props.height
                    })

                    currentRow.width += width
                    images.shift()
                }

                rows.push(currentRow)
            }

            rows.forEach((row, i) => {
                if (i == rows.length - 1 && (row.width - 5) < this.$data.maxWidth) return

                let diff = this.$data.maxWidth / (row.width - 5)

                row.images = row.images.map(image => ({
                    ...image,
                    width: Math.round(image.width * diff) - 5,
                    height: Math.round(image.height * diff) - 5
                }))
            })

            return rows
        }
    }
}
</script>