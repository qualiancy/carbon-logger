/*!
 * Carbon Logger Middleware
 * Copyright (c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var quantum = require('quantum');

/*!
 * Main exports
 */

var exports = module.exports = createLogger;

/*!
 * Version
 */

exports.version = '0.1.0';

/*!
 * Adding transport options to stats exports
 */

exports.transports = {};

for (var name in quantum.transports) {
  exports[name] = quantum.transports[name];
  exports.transports[name] = quantum.transports[name];
}

/*!
 * Return a new quantum logger, slightly modified.
 */

function createLogger (name, options) {
  options = options || {};
  options.levels = 'http';

  var logger = new quantum.Logger(name, options);

  // not allowing change of levels
  logger.levels = function () {};

  // Augmenting our logger object with middleware function
  logger.middleware = function (req, res, next) {
    var method = req.method.toUpperCase()
      , url = req.url;

    res.once('proxy start', function () {
      logger.write(method, url);
    });

    next();
  };

  // allows user to provide own reporting mechanisms
  return logger;
}
