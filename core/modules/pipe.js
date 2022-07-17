/* eslint-disable strict */

'use strict';

/**
 * So the main difference between compose and pipe is the order of the composition.
 * Compose performs a right-to-left function composition
 * since Pipe performs a left-to-right composition
 */
const pipeFn =
  (...fns) =>
  (args) =>
    fns.reduce((arg, fn) => fn(arg), args);

module.exports = pipeFn;
