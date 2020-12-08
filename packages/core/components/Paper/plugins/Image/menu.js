export default function () {
    let options = {
        id: 'image',
        icon: 'image',
        isNode: true,
        popin: {
            form: {
                src: {
                    is: 'input-media',
                    value: {},
                    transformer: {
                        get (v) {
                            return v._id || ''
                        },
                        set (v) {
                            return v.sizes.s.src || ''
                        }
                    }
                }
            },
            attrs: {
                modifiers: ['panel']
            }
        }
    }

    return options
}