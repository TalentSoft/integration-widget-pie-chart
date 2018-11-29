const path = require('path');
const webpack = require('webpack');
const displayTool = require('@talentsoft-opensource/widget-display-tool');
const loggerFactory = require('./loggerFactory');
const webpackConfiguration = require('./webpack.config');
const widgetName = require('./widget.conf.json').widgetName;


const logger = loggerFactory('main');
logger.info('starting webpack watch on widget code...');

let displayToolStarted = false;

const compiler = webpack({ ...webpackConfiguration, mode: 'development' });
compiler.watch(
    {
        aggregateTimeout: 300,
        ignored: 'node_modules',
    },
    (err, stats) => {
        logger.info(stats.toString({
            builtAt: true,
            entrypoints: false,
            modules: false
        }));
        if (err) {
            logger.error(err);
        }

        if (!displayToolStarted) {
            displayToolStarted = true;
            const widgetBundlePath = path.resolve('./dist/' + widgetName + '.bundle.js');
            const hostmockBundlePath = path.resolve('./dist/hostmock.bundle.js');
            logger.info("starting the display tool...");
            displayTool({
                port: 5555,
                loggerFactory,
                bundleFile: widgetBundlePath,
                mockFile: hostmockBundlePath,
                proxyPort: 3000
            });
            logger.info("open a browser and navigate to http://localhost:5555 to test your widget");
        }
    })
