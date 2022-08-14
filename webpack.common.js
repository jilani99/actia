const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const {AngularWebpackPlugin} = require('@ngtools/webpack');

// assets.js
const Assets = require('./assets');

module.exports = {

    entry: {

        messageformat: './node_modules/messageformat',
        blob: './node_modules/blob-tmp',
        'file-saver': './node_modules/file-saver',
        json3: './node_modules/json3',
        moment: './node_modules/moment',
        underscore: './node_modules/underscore',

        'angular-aria': './node_modules/angular-aria',
        'angular-cache-buster': './node_modules/angular-cache-buster',
        'angular-cookies': './node_modules/angular-cookies',
        'angular-dynamic-locale': './node_modules/angular-dynamic-locale',
        'ngstorage': './node_modules/ngstorage',
        'angular-loading-bar': './node_modules/angular-loading-bar',
        'angular-resource': './node_modules/angular-resource',
        'angular-sanitize': './node_modules/angular-sanitize',
        'angular-translate': './node_modules/angular-translate',
        'angular-translate-interpolation-messageformat': './node_modules/angular-translate-interpolation-messageformat',
        'angular-translate-loader-partial': './node_modules/angular-translate-loader-partial',
        'angular-translate-storage-cookie': './node_modules/angular-translate-storage-cookie',
        'angular-ui-router': './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'ui-router-core': './node_modules/@uirouter/core/_bundles/ui-router-core.js',
        'angular-file-saver': './node_modules/angular-file-saver',
        'angular-poller': './node_modules/angular-poller',
        'angular-filter': './node_modules/angular-filter',
        'angular-xeditable': './node_modules/angular-xeditable',
        'angular-loading-overlay': './node_modules/angular-loading-overlay',

        bootstrap: [
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/bootstrap-ui-datetime-picker',
            './node_modules/ui-bootstrap4'
        ],

        jsoneditor: './node_modules/jsoneditor/dist/jsoneditor.min.js',
        'ng-jsoneditor': './node_modules/ng-jsoneditor/ng-jsoneditor.min.js',


        ajs: path.join(__dirname, "/webapp/app/app.module.ajs.ts"),
        polyfills: path.join(__dirname, "/webapp/app/polyfills.ts"),
        vendor: path.join(__dirname, "/webapp/app/vendor.ts"),
        app: path.join(__dirname, "/webapp/app/main.ts"),

        'admin-services': glob.sync(path.join(__dirname, '/webapp/app/services/admin/*.js')),
        'auth-services': glob.sync(path.join(__dirname, '/webapp/app/services/auth/*.js')),
        'device-services': glob.sync(path.join(__dirname, '/webapp/app/services/device/*.js')),
        'device-service': glob.sync(path.join(__dirname, '/webapp/app/services/device/deviceV2.service.ts')),
        'custom-filter-service': glob.sync(path.join(__dirname, '/webapp/app/services/internal/*.ts')),
        'principal-service': glob.sync(path.join(__dirname, '/webapp/app/services/auth/principal.service.ts')),
        'management-services': glob.sync(path.join(__dirname, '/webapp/app/services/management/*.js')),
        'userfilters-services': glob.sync(path.join(__dirname, '/webapp/app/services/userfilters/*.js')),
        'utils-services': glob.sync(path.join(__dirname, '/webapp/app/services/utils/*.js')),
        'vehicle-services': glob.sync(path.join(__dirname, '/webapp/app/services/vehicle/*.js')),
        'upgraded-providers': glob.sync(path.join(__dirname, '/webapp/app/ajs-upgraded-providers.ts')),
        'handlers': glob.sync(path.join(__dirname, '/webapp/app/blocks/handlers/*.ts')),
        'authority-service': glob.sync(path.join(__dirname, '/webapp/app/services/auth/authority.service.ts')),
        'auth-service': glob.sync(path.join(__dirname, '/webapp/app/services/auth/auth.service.ts')),
        'auth-jwt-service': glob.sync(path.join(__dirname, '/webapp/app/services/auth/auth.jwt.service.ts')),
        'setting-service': glob.sync(path.join(__dirname, '/webapp/app/services/settings/settings.service.ts')),
        'register': glob.sync(path.join(__dirname, '/webapp/app/services/auth/register.service.ts')),
        'activate': glob.sync(path.join(__dirname, '/webapp/app/services/auth/activate.service.ts')),
        'password': glob.sync(path.join(__dirname, '/webapp/app/services/auth/password.service.ts')),
        'password-reset-init': glob.sync(path.join(__dirname, '/webapp/app/services/auth/password-reset-init.service.ts')),
        'password-reset-finish': glob.sync(path.join(__dirname, '/webapp/app/services/auth/password-reset-finish.service.ts')),

        admin: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/admin.state.js')),
        account: glob.sync(path.join(__dirname, '/webapp/app/pages/account/**/*.js')),
        audits: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/audits/*.js')),
        'brand-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/brand-management/*.js')),
        configuration: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/configuration/*.js')),
        'devicetypes-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/devicetypes-management/*.js')),
        'accessrights-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/accessrights-management/*.js')),
        fueltypes: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/fueltypes/*.js')),
        gateway: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/gateway/*.js')),
        'mobile-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/mobile-management/*.js')),
        'sms-operator-details': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/sms-operator-details/*.js')),
        'otakeys-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/otakeys-management/*.js')),
        registry: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/registry/*.js')),
        'service-management': glob.sync(path.join(__dirname, '/webapp/app/pages/admin/service-management/*.js')),
        target: glob.sync(path.join(__dirname, '/webapp/app/pages/admin/target/*.js')),
        telemetry: glob.sync(path.join(__dirname, '/webapp/app/pages/telemetry/*.js')),
        device: glob.sync(path.join(__dirname, '/webapp/app/pages/device/**/*.js')),
        main: glob.sync(path.join(__dirname, '/webapp/app/pages/main/**/*.js')),
        management: glob.sync(path.join(__dirname, '/webapp/app/pages/management/**/*.js')),
        resources: glob.sync(path.join(__dirname, '/webapp/app/pages/resources/**/*.js')),
        vehicle: glob.sync(path.join(__dirname, '/webapp/app/pages/vehicle/**/*.js')),
        layouts: glob.sync(path.join(__dirname, '/webapp/app/layouts/**/*.js')),

        'components-alert': glob.sync(path.join(__dirname, '/webapp/app/components/alert/*.js')),
        'components-customertree': glob.sync(path.join(__dirname, '/webapp/app/components/customertree/*.js')),
        'components-device': glob.sync(path.join(__dirname, '/webapp/app/components/device/**/*.js')),
        'components-devicetypetree': glob.sync(path.join(__dirname, '/webapp/app/components/devicetypetree/*.js')),
        'components-editable': glob.sync(path.join(__dirname, '/webapp/app/components/editable/**/*.js')),
        'components-form': glob.sync(path.join(__dirname, '/webapp/app/components/form/*.js')),
        'components-language': glob.sync(path.join(__dirname, '/webapp/app/components/language/*.ts')),
        'components-mobile': glob.sync(path.join(__dirname, '/webapp/app/components/mobile/*.js')),
        'components-modal': glob.sync(path.join(__dirname, '/webapp/app/components/modal/*.js')),
        'components-modal-apikey': glob.sync(path.join(__dirname, '/webapp/app/components/modal-apikey/*.js')),
        'components-modal-cache': glob.sync(path.join(__dirname, '/webapp/app/components/modal-cache/*.js')),
        'components-modal-copyparams': glob.sync(path.join(__dirname, '/webapp/app/components/modal-copyparams/*.js')),
        'components-modal-datatypes': glob.sync(path.join(__dirname, '/webapp/app/components/modal-datatypes/*.js')),
        'components-modal-export-data': glob.sync(path.join(__dirname, '/webapp/app/components/modal-export-data/*.js')),
        'components-modal-filters': glob.sync(path.join(__dirname, '/webapp/app/components/modal-filters/*.js')),
        'components-modal-fwupload': glob.sync(path.join(__dirname, '/webapp/app/components/modal-fwupload/*.js')),
        'modal-check-param-validity': glob.sync(path.join(__dirname, '/webapp/app/components/modal-check-param-validity/*.js')),
        'components-modal-info': glob.sync(path.join(__dirname, '/webapp/app/components/modal-info/*.js')),
        'components-modal-list-invalid-params': glob.sync(path.join(__dirname, '/webapp/app/components/modal-list-invalid-params/*.js')),
        'components-modal-vehicle-Model-Attributes': glob.sync(path.join(__dirname, '/webapp/app/components/modal-vehicle-model-attributes/*.js')),
        'components-modal-list-account-params': glob.sync(path.join(__dirname, '/webapp/app/components/modal-list-account-params/*.js')),
        'components-modal-manage-filters': glob.sync(path.join(__dirname, '/webapp/app/components/modal-manage-filters/*.js')),
        'components-modal-device-history': glob.sync(path.join(__dirname, '/webapp/app/components/modal-device-history/*.js')),
        'components-modal-mobile': glob.sync(path.join(__dirname, '/webapp/app/components/modal-mobile/*.js')),
        'components-modal-prompt': glob.sync(path.join(__dirname, '/webapp/app/components/modal-prompt/*.js')),
        'components-modal-selectparams': glob.sync(path.join(__dirname, '/webapp/app/components/modal-selectparams/*.js')),
        'components-modal-setting': glob.sync(path.join(__dirname, '/webapp/app/components/modal-setting/*.js')),
        'components-modal-telemetry-save-template': glob.sync(path.join(__dirname, '/webapp/app/components/modal-telemetry-save-template/*.js')),
        'components-modal-template': glob.sync(path.join(__dirname, '/webapp/app/components/modal-template/*.js')),
        'components-modal-vehicle': glob.sync(path.join(__dirname, '/webapp/app/components/modal-vehicle/*.js')),
        'components-parameters': glob.sync(path.join(__dirname, '/webapp/app/components/parameters/*.js')),
        'components-password': glob.sync(path.join(__dirname, '/webapp/app/components/password/*.js')),
        'components-recotable': glob.sync(path.join(__dirname, '/webapp/app/components/recotable/*.js')),
        'components-sidepanel': glob.sync(path.join(__dirname, '/webapp/app/components/sidepanel/*.js')),
        'components-sidepanelfilters': glob.sync(path.join(__dirname, '/webapp/app/components/sidepanelfilters/*.js')),
        'components-translations': glob.sync(path.join(__dirname, '/webapp/app/components/translations/*.js')),
        'components-updtable': glob.sync(path.join(__dirname, '/webapp/app/components/updtable/*.js')),
        'components-util': glob.sync(path.join(__dirname, '/webapp/app/components/util/*.js')),
        'components-waitbox': glob.sync(path.join(__dirname, '/webapp/app/components/waitbox/*.js')),

        blocks: glob.sync(path.join(__dirname, '/webapp/app/blocks/**/*.js')),

        state: path.join(__dirname, "/webapp/app/app.state.js"),

        constants: path.join(__dirname, "/webapp/app/app.constants.ts")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'target/www')
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyPlugin({
                patterns:
                    Assets.map(asset => {
                        return {
                            from: path.resolve(__dirname, `./node_modules/${asset}`),
                            to: path.resolve(__dirname, './target/www/public')
                        };
                    })
            }
        ),

        new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './node_modules/font-awesome/fonts'),
                        to: path.resolve(__dirname, './target/www/fonts')
                    },
                    {
                        from: path.resolve(__dirname, './node_modules/jsoneditor/dist/img'),
                        to: path.resolve(__dirname, './target/www/public/img')
                    },
                    {
                        from: path.resolve(__dirname, './node_modules/datatables.net-dt/images'),
                        to: path.resolve(__dirname, './target/www/images')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/app/pages/vehicle/vehicle-management/vehicle-popover.template.html'),
                        to: path.resolve(__dirname, './target/www/vehicle-popover.template.html')
                    },
                    {
                        from: path.resolve(__dirname, './webapp/app/pages/device/browseAll/device-quickview-popover.template.html'),
                        to: path.resolve(__dirname, './target/www/device-quickview-popover.template.html')
                    }
                ]
            }
        ),

        new HtmlWebpackPlugin({
            title: 'D2Hub administration platform',
            template: path.join(__dirname, "/webapp/index.ejs"),
        }),
        new HtmlWebpackTagsPlugin({
            tags: [
                'public/loading-bar.css',
                'public/bootstrap.css',
                'public/font-awesome.css',
                'public/xeditable.css',
                'public/jsoneditor.min.css',
                'public/angular-datatables.css',
                'public/jquery.dataTables.css',
                'public/colReorder.dataTables.css',
                'public/fixedHeader.dataTables.css',
                'public/fixedColumns.dataTables.css',
                'public/responsive.dataTables.css',
                'public/rowGroup.dataTables.css',
                'public/scroller.dataTables.css',

                'content/css/main.css',
                'content/css/navbar.css',
                'content/css/input.css',
                'content/css/toolbar.css',
                'content/css/tree.css',
                'content/css/page.css',
                'content/css/panel.css',
                'content/css/button.css',
                'content/css/buttons.dataTables.css',
                'content/css/text.css',
                'content/css/table.css',
                'content/css/loading.css',
                'content/css/login.css',
                'content/css/tabs.css',
                'content/css/sidepanel.css',
                'content/css/spinner.css',
                'content/css/home.component.css'

            ],
            append: true
        }),
        new webpack.ProvidePlugin({
            'JSONEditor': 'jsoneditor',
            'window.JSONEditor': 'jsoneditor',
            _: 'underscore',
            moment: 'moment'
        }),
        new webpack.ContextReplacementPlugin(
            /@angular([\\/])core([\\/])/,
            path.join(__dirname, '$_lazy_route_resources'),
        ),
        new AngularWebpackPlugin({
            tsConfigPath: path.join(__dirname, 'tsconfig.json'),
            mainPath: '/webapp/app/main.ts',
            sourceMap: true,
        }),

    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader',
                //exclude: path.resolve(__dirname, './webapp/app/pages/device/browseAll/browseAll.html'),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ],

            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.[j]sx?$/,
                loader: '@ngtools/webpack',
            },
            {
                test: /\.(css|scss)$/,
                use: ['css-to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: false}
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
        },
        fallback: {
            "assert": false,
        }
    },
    optimization: {
        splitChunks: {chunks: 'all',},
    },
    externals: {
        angular: 'angular',
    }

};