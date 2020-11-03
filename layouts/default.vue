<template>
    <div class="LayoutDefault">

        <div class="LayoutDefault_body">
            <div class="LayoutDefault_nav">
                <div class="LayoutDefault_navContainer">
                    <img class="LayoutDefault_navLogo" :src="assets.logo">

                    <div>
                        <nuxt-link
                            v-for="item in items"
                            class="LayoutDefault_navItem"
                            exact-active-class="is-active" 
                            :to="item.link"
                            :key="item.id"
                        >
                            {{ item.label }}
                        </nuxt-link>
                    </div>

                    <div class="LayoutDefault_navFooter">
                        @theotimecolin
                    </div>
                </div>
            </div>

            <div class="LayoutDefault_content">
                <header-base />

                <Nuxt />
            </div>
        </div>
    </div>
</template>

<script>
import logo from '@/assets/img/logo/logo.png'

import HeaderBase from '@/components/base/HeaderBase'

export default {
    name: 'LayoutDefault',
    components: { HeaderBase },
    data: () => ({
        assets: { logo },
        items: [
            { id: 0, label: 'Boutons, liens', link: '/components/buttons' },
            { id: 1, label: 'Popins, infobulles', link: '/components/' },
            { id: 2, label: 'Formulaires, inputs', link: '/components/' },
            { id: 3, label: 'Carousels, galeries', link: '/components/' },
            { id: 4, label: 'Fonctionnels', link: '/components/' },
            { id: 5, label: 'Images, icônes', link: '/components/' },
        ]
    })
}
</script>