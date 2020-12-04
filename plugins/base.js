import Vue from 'vue'
import moment from 'moment'
import { ButtonBase, PopinBase, HelpersMixin } from '@/packages/core'

moment.locale('fr')

Vue.mixin({
    methods: {
        ...HelpersMixin.methods,
    },
})

Vue.component('ButtonBase', ButtonBase)
Vue.component('PopinBase', PopinBase)