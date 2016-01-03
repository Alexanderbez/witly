'use strict';

/**
 * config/logger.js
 * 
 * Server-side logging module wrapper.
 */

const bunyan     = require('bunyan');
const properties = require('./properties');

// Bunyan logger collection
const _loggers = new Map();

/**
 * Retrieves all created Bunyan loggers.
 * @return {Array}
 */
let getLoggers = () => {
  let loggers = [];

  for (let logger of _loggers.values()) {
    loggers.push(logger);
  }

  return loggers
};

/**
 * Retrieves names of all created Bunyan loggers.
 * @return {Array}
 */
let getLoggerNames = () => {
  let loggerNames = [];

  for (let logger of _loggers.values()) {
    loggerNames.push(logger.fields.name);
  }

  return loggerNames
};

/**
 * Wraps Bunyan's createLogger function. Attempts to create a logger unless it
 * already exists. If a logger already exists, that logger is returned.
 * @param {String} loggerName
 * @return {Object}
 */
let getLogger = (loggerName) => {
  let logger = _loggers.get(loggerName);

  if (!logger) {
    logger = bunyan.createLogger({
      name: loggerName,
      level: properties.get('env').includes('development') ? 'debug' : 'info'
    });

    _loggers.set(loggerName, logger);
  }

  return logger;
};

module.exports = {
  getLogger: getLogger,
  getLoggers: getLoggers,
  getLoggerNames: getLoggerNames
};
