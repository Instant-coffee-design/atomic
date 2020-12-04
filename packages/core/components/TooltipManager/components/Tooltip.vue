<template>
    <div
        class="TooltipBase"
        :class="[ ...$modifiers ]"
        :style="{ marginTop: top + 'px', marginLeft: left + 'px' }"
    >
        <slot></slot>
    </div>
</template>

<script>
import ModifiersMixin from '../../../helpers/mixins/ModifiersMixin'

export default {
    name: 'TooltipBase',
    mixins: [ ModifiersMixin ],
    props: {
        tag: { type: String, default: 'span' },
        top: { type: Number, default: 10 },
        left: { type: Number, default: 0 }
    }
}
</script>