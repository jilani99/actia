const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {

    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        pathinfo: true,
        sourceMapFilename: '[name].js.map',
    },

    devServer: {

        hot: true,
        inline: true,
        quiet: false,
        noInfo: true,
        disableHostCheck: true,

        liveReload: false,

        watchOptions: {
            // Poll using interval (in ms, accepts boolean too)
            poll: true,
            // Ignore node_modules to decrease CPU usage
            ignored: /node_modules/,
        },

        host: 'localhost', // Defaults to `localhost`
        port: 9999, // Defaults to 8080
        open: true, // Open the page in browser
        overlay: true, // Show error overlay in browser

        contentBase: './webapp',
        compress: true,

        proxy: {
            '/api/admin/': {
                target: 'http://localhost:8090/',
                pathRewrite: {'/api/admin': ''},
                logLevel: 'debug'
            },
            '/api/ota/': {
                target: 'http://localhost:8092/',
                pathRewrite: {'/api/ota': ''},
                logLevel: 'debug'
            },
            '/api/registry/': {
                target: 'http://localhost:8761/',
                pathRewrite: {'/api/registry': ''},
                logLevel: 'debug'
            },
            '/api/tgu-dtcinfo/': {
                target: 'http://localhost:8080/',
                pathRewrite: {'/api/tgu-dtcinfo/': ''},
                logLevel: 'debug'
            },
            '/api/scheduler/': {
                target: 'http://localhost:8094/',
                pathRewrite: {'/api/scheduler/': ''},
                logLevel: 'debug'
            }
        }
    },

    plugins: [

        // Ignore node_modules so CPU usage with poll
        // watching drops significantly.
        new webpack.WatchIgnorePlugin({
            paths:
                [
                    path.join(__dirname, "./node_modules"),
                    path.join(__dirname, "./target/www/public")
                ]
        })

    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                include: path.resolve(__dirname, './webapp/app/app.constants.ts'),
                options: {

                    multiple: [
                        {
                            search: '__ENV__',
                            replace: '\'dev\''
                        },
                        {
                            search: '__VERSION__',
                            replace: '\'in dev\''
                        },
                        {
                            search: '__LDAP__',
                            replace: process.env.LDAP
                        },
                        {
                            search: '__FRONT_BUILD_TIMESTAMP__',
                            replace: () => `'${new Date()}'`
                        }
                    ]

                }
            },
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                include: path.resolve(__dirname, './webapp/app/app.constants.ts'),
                options: {

                    multiple: [
                        {
                            search: '__ENV__',
                            replace: '\'dev\''
                        },
                        {
                            search: '__VERSION__',
                            replace: '\'in dev\''
                        },
                        {
                            search: '__LDAP__',
                            replace: process.env.LDAP
                        },
                        {
                            search: '__FRONT_BUILD_TIMESTAMP__',
                            replace: () => `'${new Date()}'`
                        }
                    ]

                }
            },
        ]
    }

});
