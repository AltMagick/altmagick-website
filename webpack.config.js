'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dist = path.join(__dirname, './dist')

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    stats: {
        warnings: false
    },
    ignoreWarnings: [/./],
    output: {
        filename: 'main.js',
        path: dist,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true,
        allowedHosts: "all"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
                test: /\.(gif|png|avif|jpe?g)$/,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                    publicPath: "assets/images/",
                    outputPath: "assets/images/",
                },
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [{
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ],
            }
        ]
    }
}