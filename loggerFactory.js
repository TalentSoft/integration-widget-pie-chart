const winston = require('winston');
const fs = require('fs');

const loggers = {};
module.exports = function loggerFactory(name) {
    if (name in loggers) {
        return loggers[name];
    }

    const format = winston.format.combine(
        winston.format.timestamp({ format: () => new Date().toLocaleString()}),
        winston.format.align(),
        winston.format.printf((info) => {
            return `[${info.timestamp}] ${name} - ${info.level}: ${info.message}`
        })
    );

    const colorizedFormat = winston.format.combine(
        winston.format.colorize(),
        format
    );

    function createLogger(name) {
        if (!fs.existsSync('tmp')) { fs.mkdirSync('tmp'); }
        const logPath = `./tmp/${name}.log`;

        if (name === "main") {
            return winston.createLogger({
                level: 'info',
                format: colorizedFormat,
                transports: [new winston.transports.Console()]
            })
        }

        loggerFactory('main').info(`logging ${name} to ${logPath}`)
        return winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console({
                    level: 'warn',
                    format: colorizedFormat
                }),
                new winston.transports.File({
                    level: 'info',
                    filename: logPath,
                    format
                }),
            ]
        })
    }

    const logger = createLogger(name);
    loggers[name] = logger;
    return logger;
}
