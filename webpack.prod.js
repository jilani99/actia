const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {

    mode: 'production',
    output: {
        filename: '[chunkhash].bundle.js'
    },
    plugins: [

        new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './webapp/content'),
                        to: path.resolve(__dirname, './target/www/content')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/i18n'),
                        to: path.resolve(__dirname, './target/www/i18n')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/assets'),
                        to: path.resolve(__dirname, './target/www/assets')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/50x.html'),
                        to: path.resolve(__dirname, './target/www')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/404.html'),
                        to: path.resolve(__dirname, './target/www')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/favicon.ico'),
                        to: path.resolve(__dirname, './target/www')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/robots.txt'),
                        to: path.resolve(__dirname, './target/www')
                    }
                ]
            }
        )
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
                            replace: '\'prod\''
                        },
                        {
                            search: '__VERSION__',
                            replace: '\'' + process.env.FRONTVERSION + '\''
                        },
                        {
                            search: '__LDAP__',
                            replace: process.env.LDAP
                        },
                        {
                            search: '__FRONT_BUILD_TIMESTAMP__',
                            replace: '\'' + process.env.BUILDTIMESTAMP + '\''
                        }
                    ]

                }
            },
        ]
    }
});

