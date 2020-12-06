export default function () {
    let options = {
        id: 'link',
        icon: 'link',
        isMark: true,
        popin: {
            form: {
                href: { label: 'Lien', type: 'text', value: '' },
                target: {
                    label: 'Ouvrir dans un nouvel onglet',
                    is: 'toggle-base',
                    value: '_self',
                    transformer: {
                        get (v) {
                            return v == '_blank'
                        },
                        set (v) {
                            return v ? '_blank' : '_self'
                        }
                    }
                }
            },
            attrs: {
                modifiers: ['s', 'absolute-header']
            }
        }
    }

    return options
}