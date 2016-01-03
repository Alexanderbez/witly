'use strict';

/**
 * config/properties.js
 * 
 * Common/global application properties and settings.
 */

let _properties = new Map();

((env) => {
  _properties.set('port', parseInt(env.NODE_PORT || env.PORT || 1337));
  _properties.set('env', env.NODE_ENV || 'development');
  _properties.set('local', env.LOCAL == 'true' ? true : false);
})(process.env);

module.exports = _properties;
