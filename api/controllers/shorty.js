'use strict';

/**
 * api/controllers/Shorty.js
 * 
 * Shorty model controller and routing logic. Only the bare minimum routes are
 * implemented.
 */

const router     = require('express').Router();
const validator  = require('validator');
const _          = require('lodash');
const models     = require('../models');
const config     = require('../../config');
const utils      = require('../utils');
const log        = config.logger.getLogger('Controllers::Shorty');
const Shorty     = models.shorty;
const Permutator = utils.permutator;

/* Controller objects */
const permutator = new Permutator();

/* Middleware */

/**
 * Performs a sanitization on a Shorty resource object and strips out any 
 * necessary fields.
 *
 * @return {Object}
 */
const sanitizeResource = (req, res, next) => {
  log.info('Performing sanitization on resource');
  let resource = req.body;

  // Strip out necessary attributes
  resource = _.pick(resource, ['url']);

  // Sanitize values
  _.forEach(resource, (k, v) => {
    resource[v] = validator.trim(k);
  });

  log.info(`Sanitized resource: ${JSON.stringify(resource)}`);
  req.resource = resource;
  next();
};

/* Routes*/

/**
 * @GET
 * Retrieve all shorty resources.
 */
router.get('/', (req, res) => {
  log.debug('Attempting to retrieve all shorty resources');

  Shorty.find({})
    .then((shorties) => {
      res.status(200).json(shorties);
    })
    .catch((err) => {
      log.error(`Failed to retrieve all shorty resources: ${err.message}`);
      res.status(400).json({error: err.message});
    });
});

/**
 * @GET
 * Retrieve a shorty resource by its MongoDB ID attribute.
 */
router.get('/:id', (req, res) => {
  let shortyID = req.params.id;
  log.debug(`Attempting to retrieve shorty resource: ${shortyID}`)

  Shorty.findById(shortyID)
    .then((shorty) => {
      if (shorty) {
        res.status(200).json(shorty);
      } else {
        log.error('Resource not found');
        res.status(404).json({
          error: 'Resource not found'
        });
      }
    })
    .catch((err) => {
      log.error(`Failed to query for shorty resource: ${err.message}`);
      res.status(400).json({
        error: err.message
      });
    });
});

/**
 * @POST
 * Create a shorty resource.
 */
router.post('/', sanitizeResource, (req, res) => {
  let resource = req.resource;
  log.debug(`Attempting to create shorty resource: ${JSON.stringify(resource)}`);

  Shorty.findOne({
      url: resource.url
    })
    .then((shorty) => {
      if (shorty) {
        log.warn('Resource already exists');
        res.status(422).json({
          error: 'Resource already exists'
        });

        return;
      } else {
        let shorty = new Shorty({
          url: resource.url,
          uid: permutator.next()
        });

        return new Promise((resolve, reject) => {
          shorty.save()
            .then((shorty) => {
              resolve(shorty);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    })
    .then((shorty) => {
      res.status(200).json(shorty);
    })
    .catch((err) => {
      log.error(`Failed to create shorty resource: ${err.message}`);
      res.status(400).json({
        error: err.message
      });
    });

  return;
});

/**
 * @PATCH
 * Updates an existing shorty resource.
 */
router.patch('/:id', sanitizeResource, (req, res) => {
  let shortyID = req.params.id;
  let resource = req.resource;
  log.debug(`Attempting to update shorty resource: ${shortyID}`);

  Shorty.findByIdAndUpdate(shortyID, {
      $set: resource
    })
    .then((shorty) => {
      if (shortyz) {
        res.status(200).json(shorty);
      } else {
        log.error('Resource not found');
        res.status(404).json({
          error: 'Resource not found'
        });
      }
    })
    .catch((err) => {
      log.error(`Failed to query for shorty resource: ${err.message}`);
      res.status(400).json({
        error: err.message
      });
    });

  return;
});

/**
 * @DELETE
 * Delete a shorty resource by its MongoDB ID attribute.
 */
router.delete('/:id', (req, res) => {
  let shortyID = req.params.id;
  log.debug(`Attempting to delete shorty resource: ${shortyID}`)

  Shorty.findByIdAndRemove(shortyID)
    .then((shorty) => {
      if (shorty) {
        res.status(200).json(shorty);
      } else {
        log.debug('Resource not found');
        res.status(404).json({
          error: 'Resource not found'
        });
      }
    })
    .catch((err) => {
      log.error(`Failed to query for shorty resource: ${err.message}`);
      res.status(400).json({
        error: err.message
      });
    });

  return;
});

module.exports = router;
