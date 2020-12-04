export default function () {
    let options = {
        id: 'link',
        icon: 'link',
        popin: {
            content: 'Hello',
            form: {
                href: { label: 'Lien', type: 'text', value: '' }
            },
            attrs: {
                modifiers: ['s']
            }
        }
    }

    return options
}