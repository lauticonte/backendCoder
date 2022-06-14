const log4js = require("log4js");
log4js.configure ({
  appenders: {
    consola: { type: "console" },
    warn: { type: 'file', filename: 'warn.log' },
    err: { type: 'file', filename: 'err.log' },
    loggerConsola:{type:'logLevelFilter', appender: 'consola', level:'info'},
    loggerWarn:{type:'logLevelFilter', appender: 'warn', level:'warn'},
    loggerError:{type:'logLevelFilter', appender: 'err', level:'error'}
  },
  categories: {
    default: { appenders: ["loggerConsola", "loggerWarn","loggerError"], level: "all" },
  }
})
const logger = log4js.getLogger();

module.exports = logger;