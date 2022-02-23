const { createLogger, transports, format } = require('winston');


const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tashkent'
    });
}
const customFormat = format.combine(format.timestamp({ format: timezoned }), format.printf((info) => {
    return `${info.timestamp}-[${info.level.toUpperCase().padEnd(8)}]- ${info.message}`
}))
// Enable exception handling when you create your logger.
const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.File({ filename: 'exceptions.log', level: 'info' })
    ],
});

module.exports = logger;