const path = require('path');
const webpack = require('webpack');
const displayTool = require('@talentsoft-opensource/widget-display-tool');
const logging = require('./logging');
const webpackConfiguration = require('./webpack.config');
const widgetName = require('./widget.conf.json').widgetName;
const opn = require('opn');


const logger = logging.defaultLogger;
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
            logger.error("error while compiling widget");
            logger.error(err);
        }

        if (!displayToolStarted) {
            displayToolStarted = true;
            const widgetBundlePath = path.resolve('./dist/' + widgetName + '.bundle.js');
            const hostmockBundlePath = path.resolve('./dist/hostmock.bundle.js');
            const port = 5555;
            logger.info("starting the display tool...");
            displayTool({
                port,
                loggerFactory: logging.loggerFactory,
                bundleFile: widgetBundlePath,
                mockFile: hostmockBundlePath,
            });

            // this line will open a browser 
            logger.info("opening a browser to test your widget");
            logger.info("if you want to disable this behavior please edit the display.js file");
            opn('http://localhost:' + port);
        }
    })

