var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config.js');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var httpProxy = require('http-proxy');

const app = express();
const compiler = webpack(config);
const apiProxy = httpProxy.createProxyServer();

let webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: true    // display nothing to the console
});
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddleware(compiler));

app.use('/api/*', (req, res) => {
    let proxiedUrl = req.baseUrl;
    const url = require('url');
    let url_parts = url.parse(req.url, true);
    if (url_parts.search !== null) {
        proxiedUrl += url_parts.search;
    }
    req.url = proxiedUrl;

    apiProxy.web(req, res, {
        target: {
            host: 'localhost',
            port: 3001
        }
    });
});

app.get('/*/assets/*', function(req, res, next) {
    let name = req.path;
    let filename = path.join(compiler.outputPath, name.substring(name.indexOf('/assets'), name.length));
    console.log(filename)
    compiler.outputFileSystem.readFile(filename, function(err, result) {
        if (err) {
            return next(err);
        }
        if (filename.includes('.css')) {
            res.set('Content-Type','text/css');
        }else if (filename.includes('.js')) {
            res.set('Content-Type','application/javascript');
        } else {
            res.set('Content-Type', 'text/html');
        }
        res.send(result);
        res.end();
    });
});


app.get('*', function(req, res, next) {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});

app.listen(8020, 'localhost', function(err) {
    if (err) {
        console.error(err);
    }
});