export default function () {
    let options = {
        id: 'image',
        icon: 'image',
        isNode: true,
        popin: {
            form: {
                image: {
                    is: 'input-media',
                    value: ''
                }
            },
            attrs: {
                modifiers: ['panel']
            }
        }
    }

    return options
}