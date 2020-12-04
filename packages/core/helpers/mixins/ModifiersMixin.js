export default {
    props: {
        modifiers: { type: Array, default: () => [] }
    },
    computed: {
        $modifiers () {
            let modifiers = {}

            if (this.$props.modifiers) {
                this.$props.modifiers.forEach(modifier => { 
                    if (modifier) {
                        modifiers[this.$options.name + '--' + modifier] = true
                    }
                })
            }

            return modifiers
        }
    }
}