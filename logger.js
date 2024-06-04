class MainLogger {
  constructor() {
    this.subLogger = new Map()
  }
  add(logger) {
    this.subLogger.set(logger, logger)
  }
  remove(logger) {
    this.subLogger.delete(logger)
  }
  log(message, params) {
    this.subLogger.forEach((logger) => {
      logger.log(message, params)
    })
  }
  error(message, params) {
    this.subLogger.forEach((logger) => {
      logger.error(message, params)
    })
  }
}

module.exports = MainLogger
