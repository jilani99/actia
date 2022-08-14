module.exports = function (bs) {

    // https://www.npmjs.com/package/http-proxy-middleware
    var proxy = require('http-proxy-middleware');

    // api proxy
    var options = {
        target: 'http://localhost:8081/',
        changeOrigin: false,
        xfwd: false,
        toProxy: false,
        preserveHeaderKeyCase: false,
        prependPath: false,
        ignorePath: false,
        autoRewrite: false,
        followRedirects: false,
        pathRewrite: {'/api' : ''},
        logLevel: 'debug'
    }

    var apiProxy = proxy('/api', options);

    return {
        server: {
            baseDir: "./target/www",

            middleware:
                {
                    // overrides the second middleware default with new settings
                    1: require('connect-history-api-fallback')({
                        index: '/index.html',
                        verbose: true
                    }),
                    2: apiProxy
                }
        },
        port: 9999,
    };

};
