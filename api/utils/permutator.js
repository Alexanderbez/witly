'use strict';

/**
 * api/utils/permutator.js
 * 
 * A permutator class that is responsible for picking a unique and random
 * character sequence for a Shorty resource. This will represent a shortened
 * URL as an UID.
 */

const _ = require('lodash');

/**
 * Permutator class constructor. A Permutator class requires a seed (n), these
 * will represent the character set to choose from and a value k that will
 * represent the number of characters to pick to form a UID.
 *
 * Note: k must be <= N, where N is the number of elements to choose from in 
 * the character set n.
 *
 * @param {Array} n
 * @param {Integer} k
 * @return {Object}
 */
let Permutator = class Permutator {
  constructor(n, k) {
    // Validate parameters
    if (n !== undefined && !(n instanceof Array)) {
      throw new TypeError('Invalid arguments');
    }

    if (k !== undefined && (isNaN(parseFloat(k)) || !isFinite(k))) {
      throw new TypeError('Invalid arguments');
    }

    if (n !== undefined && k !== undefined && (k % 1 !== 0 || k > n.length)) {
      throw new TypeError('Invalid arguments');
    }

    this.n = n || _.flatten([
      'abcdefghijklmnopqrstuvwxyz'.split(''),
      'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => {
        return c.toUpperCase();
      }),
      '0123456789'.split('')
    ]);
    this.k = k || 8;
  }

  /**
   * Get a random permutation of length k from the sample n.
   *
   * @return {String}
   */
  next() {
    return _.sample(this.n, this.k).join('');
  }
};

module.exports = Permutator;
