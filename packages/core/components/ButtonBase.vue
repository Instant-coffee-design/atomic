<template>
    <div class="ButtonBase">
        <div class="ButtonBase_content">
            <span class="ButtonBase_before">
                <slot name="before"></slot>
            </span>
            <span class="ButtonBase_text">
                Hello
            </span>
            <span class="ButtonBase_after">
                <slot name="before"></slot>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ButtonBase'
}
</script>