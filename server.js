'use strict';

/**
 * app.js
 *
 * To start the server, run: `npm start | ./node_modules/bunyan/bin/bunyan`.
 * 
 * Common environment variables are supported, e.g.:
 * `NODE_ENV=production PORT=80 LOCAL=false node app.js`
 */

const express = require('express');
const config  = require('./config');
const log     = config.logger.getLogger('Server');

/*
  Express app
*/

let app = express();

/*
  App bootstrap
*/

config.bootstrap(app);

/*
  App launch
*/

app.listen(app.get('port'), () => {
  log.info(`Service started on port ${app.get('port')} in ${app.get('env')}`);
});
