const path = require('path');
const webpack = require('webpack');
const winston = require('winston');

const displayTool = require('@talentsoft-opensource/widget-display-tool');
const webpackConfiguration = require('./webpack.config');
const widgetName = require('./widget.conf.json').widgetName;
const compiler = webpack({... webpackConfiguration, mode: 'development'});


console.log('starting webpack watch on widget code...');
compiler.watch({
    aggregateTimeout: 300,
    ignored: 'node_modules',

},
(err, stats) => {
    console.log(stats.toString({
        builtAt: true,
        entrypoints: false,
        modules: false
    }));
    if (err) {
        console.error(err);
    }
})


const logPath = './display-toolbar.log';
console.log(`logging display tool to ${logPath}`)
const fileLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [ new winston.transports.File({ filename: logPath }) ]
})

console.log('starting display tool...');
const widgetBundlePath = path.resolve('./dist/' + widgetName + '.bundle.js');
const hostmockBundlePath = path.resolve('./dist/hostmock.bundle.js');
displayTool({
    port: 5555,
    logger: fileLogger,
    bundleFile: widgetBundlePath,
    mockFile: hostmockBundlePath,
    proxyConf: {
        port: 3000,
        logDestination: './tmp/proxy.log'
    }
});
