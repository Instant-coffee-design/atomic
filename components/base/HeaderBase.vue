<template>
    <header class="HeaderBase">
        <nuxt-link
            v-for="item in items"
            class="HeaderBase_link"
            :to="item.link"
            :key="item.id"
        >
            {{ item.label }}
        </nuxt-link>
    </header>
</template>

<script>

export default {
    name: 'HeaderBase',
    props: {
        items: { type: Array, default: () => ([
            { label: 'instant.coffee', link: '/' },
            { label: 'composants', link: '/components'}
        ]) }
    },
    data: () => ({
        
    })
}
</script>