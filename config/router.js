'use strict';

/**
 * config/router.js
 * 
 * Bootstraps all Express routing.
 */

const express = require('express');
const appRoot = require('app-root-path');

module.exports.bootstrap = (app) => {
  let api = require('../api');
  
  // app.use('/', express.static(appRoot + '/public'));
  app.use('/api/shorties', api.controllers.shorty);

  return app;
};
