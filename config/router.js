'use strict';

/**
 * config/router.js
 * 
 * Bootstraps all Express routing.
 */

const express = require('express');

module.exports.bootstrap = (app) => {
  let api = require('../api');
  
  app.use('/api/shorties', api.controllers.shorty);

  return app;
};
