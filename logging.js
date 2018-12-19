const winston = require('winston');
const fs = require('fs');

const loggers = {};

function getCachedLogger(name, factory) {
    if (!(name in loggers)) {
        loggers[name] = factory();
    }

    return loggers[name];
}

function getFormat(name, colorized) {
    const format = winston.format.combine(
        winston.format.timestamp({ format: () => new Date().toLocaleString() }),
        winston.format.align(),
        winston.format.printf((info) => {
            return `[${info.timestamp}] ${name} - ${info.level}: ${info.message}`
        })
    );

    return colorized
        ? winston.format.combine(
            winston.format.colorize(),
            format
        )
        : format;
}


/**
 * The default logger logs everything on the console.
 */
const defaultLoggerName = 'main';

function createDefaultLogger() {
    return winston.createLogger({
        level: 'info',
        format: getFormat(defaultLoggerName),
        transports: [new winston.transports.Console()]
    });
}

const defaultLogger = getCachedLogger(defaultLoggerName, createDefaultLogger);

/**
 * Creates a logger that will log messages in a specific files.
 * Warnings and above are also displayed on console.
 * 
 * @param {string} name The logger name
 */
function loggerFactory(name) {
    function createLogger() {
        if (!fs.existsSync('tmp')) { fs.mkdirSync('tmp'); }
        const logPath = `./tmp/${name}.log`;

        defaultLogger.info(`logging ${name} to ${logPath}`)
        return winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console({
                    level: 'warn',
                    format: getFormat(name, true)
                }),
                new winston.transports.File({
                    level: 'info',
                    filename: logPath,
                    format: getFormat(name)
                }),
            ]
        })
    }

    return getCachedLogger(name, createLogger);
}

module.exports = { defaultLogger, loggerFactory };
