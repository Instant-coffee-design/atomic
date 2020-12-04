export default function () {
    let options = {
        id: 'heading',
        icon: 'text-size',
        component: 'paper-select',
        isNode: true,
        attrs: {
            items: [
                { id: 0, label: 'Titre 1', value: { level: 1 } },
                { id: 1, label: 'Titre 2', value: { level: 2 } },
                { id: 2, label: 'Titre 3', value: { level: 3 } },
            ]
        }
    }

    return options
}