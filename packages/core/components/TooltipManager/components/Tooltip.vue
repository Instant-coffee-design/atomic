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
import BaseMixin from '../../../helpers/mixins/BaseMixin'

export default {
    name: 'TooltipBase',
    mixins: [ BaseMixin ],
    props: {
        tag: { type: String, default: 'span' },
        top: { type: Number, default: 10 },
        left: { type: Number, default: 0 }
    }
}
</script>