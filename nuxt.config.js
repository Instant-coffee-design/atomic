require('dotenv').config()

export default {
    head: {
        title: 'instant-coffee',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        '@/assets/scss/global.scss'
    ],

    plugins: [
        { src: '@/plugins/base.js' }
    ],

    components: true,

    buildModules: [],

    modules: [
        '@nuxtjs/axios',
        'nuxt-i18n'
    ],

    // i18n: {
    //     locales: [
    //         { code: 'fr', iso: 'fr-FR', file: 'fr.js' }
    //     ],
    //     langDir: '/translations/',
    //     defaultLocale: 'fr',
    //     lazy: true
    // },

    build: {
        extend (config) {
            config.module.rules.push({
                test: /\.svg.html$/,
                loader: 'raw-loader'
            })
        },
        babel: {
            presets(env, [preset, options]) {
                return [["@babel/preset-env", {}]];
            },
            plugins: [
                [
                "@babel/plugin-transform-runtime",
                {
                    regenerator: true
                }
                ]
            ]
        }
    }
}
