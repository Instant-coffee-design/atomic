<template>
    <div>
        <tooltip
            v-for="tooltip in tooltips"
            v-bind="tooltip"
            :key="tooltip.id"
        >
            {{ tooltip.content }}
        </tooltip>
    </div>
</template>

<script>
import Tooltip from './components/Tooltip'

export default {
    name: 'TooltipManager',
    components: { Tooltip },
    data: () => ({
        screen: {
            width: 0,
            scroll: 0
        }
    }),
    computed: {
        tooltips () {
            return this.$store.state.tooltips.items.filter(t => t.active).map(tooltip => ({
                ...tooltip,
                style: this.getPosition(tooltip.position)
            }))
        }
    },
    mounted () {
        this.updateScreen()
        window.addEventListener('scroll', () => this.updateScreen())
    },
    methods: {
        updateScreen () {
            this.$set(this.$data.screen, {
                width: window.innerWidth,
                scroll: window.pageYOffset || document.documentElement.scrollTop
            })
        },
        getPosition (tooltip) {
            let position = { top: 0, left: 0 }

            position.top = Math.round(tooltip.top + tooltip.height)
            position.left = Math.round(tooltip.left)

            return { top: position.top + 'px', left: position.left + 'px' }
        }
    }
}
</script>