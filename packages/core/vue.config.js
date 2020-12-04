const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    configureWebpack: {
        module: {
            rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-spread']
                    }
                }
            }]
        },
        plugins: [ new MinifyPlugin() ]
    }
}