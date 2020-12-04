export default function () {
    let options = {
        id: 'styledBlock',
        icon: 'times',
        component: 'paper-select',
        isNode: true,
        attrs: {
            items: [
                { id: 4, label: 'Paragraphe', value: { tag: 'p', classes: [] } },
                { id: 0, label: 'Titre 1', value: { tag: 'h1', classes: [] } },
                { id: 1, label: 'Titre 2', value: { tag: 'h2', classes: [] } },
                { id: 2, label: 'Titre 3', value: { tag: 'h3', classes: [] } },
                { id: 3, label: 'Citation', value: { tag: 'blockquote', classes: [] } },
            ]
        }
    }

    return options
}