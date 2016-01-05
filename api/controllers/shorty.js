'use strict';

/**
 * api/controllers/Shorty.js
 * 
 * Shorty model controller and routing logic. Only the bare minimum routes are
 * implemented.
 */

const router     = require('express').Router();
const moment     = require('moment');
const models     = require('../models');
const config     = require('../../config');
const utils      = require('../utils');
const log        = config.logger.getLogger('Controllers::Shorty');
const Shorty     = models.shorty;
const Permutator = utils.permutator;

/* Controller objects */
const permutator = new Permutator();

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
router.post('/', (req, res) => {
  let body = req.body;
  log.debug(`Attempting to create shorty resource: ${JSON.stringify(body)}`);

  // Body validations
  req.checkBody('url', 'Missing Shorty URL').notEmpty();

  // Sanitization
  req.sanitizeBody('url').trim();

  // Check for errors
  let errors = req.validationErrors(true);

  if (errors) {
    log.error(`Invalid shorty resource body: ${JSON.stringify(req.body)}`);
    res.status(400).json(errors);
  } else {
    log.debug('Successfully validated shorty resource body');

    Shorty.findOne({
        url: body.url
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
            url: body.url,
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
  }

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
