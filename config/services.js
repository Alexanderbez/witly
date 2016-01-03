'use strict';

/**
 * config/services.js
 * 
 * Handles setting up and connecting all required services and APIs.
 */

const mongoose = require('mongoose');
const log      = require('./logger').getLogger('Services');

/**
 * For simplicity's sake, we're going to assume a local environment only for
 * now.
 */
module.exports.init = () => {
  mongoose.connect('mongodb://localhost/witly');

  let db = mongoose.connection;

  db.on('error', (err) => {
    log.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

  db.on('open', () => {
    log.info('Successfully connected to MongoDB');
  });
};
