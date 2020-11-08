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

        <tooltip-manager />
    </div>
</template>

<script>
import logo from '@/assets/img/logo/logo.png'

import HeaderBase from '@/components/base/HeaderBase'
import TooltipManager from '@/packages/core/components/TooltipManager'

export default {
    name: 'LayoutDefault',
    components: { HeaderBase, TooltipManager },
    data: () => ({
        assets: { logo },
        items: [
            { id: 0, label: 'Buttons, links', link: '/components/buttons' },
            { id: 1, label: 'Popins, tooltips', link: '/components/popins' },
            { id: 2, label: 'Forms, inputs', link: '/components/forms' },
            { id: 3, label: 'Sliders, galleries', link: '/components/sliders' },
            { id: 4, label: 'Functionals', link: '/components/functionals' },
            { id: 5, label: 'Images, icons', link: '/components/images' },
        ]
    })
}
</script>