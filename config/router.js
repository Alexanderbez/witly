'use strict';

/**
 * config/router.js
 * 
 * Bootstraps all Express routing.
 */

const express = require('express');
const apiDocs = require('./apiDocs');

module.exports.bootstrap = (app) => {
  let api = require('../api');
  
  app.use('/swagger.json', (req, res) => {
    res.status(200).json(apiDocs);
  });
  app.use('/api/shorties', api.controllers.shorty);

  return app;
};
