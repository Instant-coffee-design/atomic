<template>
    <button
        class="PaperEditor_button"
        :class="{ 'is-active': isActive }"
        type="button"
        @click="$emit('click')"
    >
        <i class="fal" :class="[`fa-${icon}`]" v-if="icon"></i>

        <div class="PaperEditor_buttonList" v-if="$slots['list']">
            <slot name="list"></slot>
        </div>
    </button>
</template>

<script>
export default {
    name: 'PaperButton',
    props: {
        subMenu: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        icon: { type: [String, Boolean], default: false }
    }
}
</script>