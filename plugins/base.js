import Vue from 'vue'
import moment from 'moment'
import { ButtonBase, PopinBase, HelpersMixin } from '@/packages/core/index.js'
import Sandbox from '@/components/interactive/Sandbox'

moment.locale('fr')

Vue.mixin({
    methods: {
        ...HelpersMixin.methods,
    },
})

Vue.component('ButtonBase', ButtonBase)
Vue.component('Sandbox', Sandbox)
Vue.component('PopinBase', PopinBase)