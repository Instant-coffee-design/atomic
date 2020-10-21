<template>
    <div>
        <h1 class="Title Title--l">Boutons</h1>
        <sandbox>
            <button-base />
        </sandbox>
    </div>
</template>

<script>
import ButtonBase from '@/packages/core/components/ButtonBase'

export default {
    name: 'ComponentsButtons',
    components: { ButtonBase }
}
</script>