'use strict';

/**
 * config/bootstrap.js
 * 
 * Handles all common Express configuration and setting management.
 */

const bodyParser       = require('body-parser');
const morgan           = require('morgan');
const cors             = require('cors');
const properties       = require('./properties');
const router           = require('./router');
const services         = require('./services');
const expressValidator = require('express-validator');

module.exports = (app) => {
  /* Service and API client initialization */

  services.init();

  /* Express configuration */

  app.set('port', properties.get('port'));
  app.set('env', properties.get('env'));

  /* Express middleware */

  // Parse application/json
  app.use(bodyParser.json());

  // Express data validation
  app.use(expressValidator());

  // HTTP logger
  app.use(morgan('common', {
    skip: (req, res) => {
      // Skip logging for successful HTTP requests only on prod
      return (res.statusCode < 400 && properties.get('env').includes('production'));
    }
  }));

  // CORS
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  /* Express routing */

  router.bootstrap(app);

  return app;
};
