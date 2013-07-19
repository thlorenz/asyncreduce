'use strict';

var runnel = require('runnel');

/**
 *
 * @name exports
 * @function
 * @param items {Array} the items to be reduced
 * @param seed {T} the initial value that can be of any type and is passed along as the accumulator (acc) each time the iterator is called
 * @param iterator {Function} function (acc, item, callback) {} - the iterator called for each item
 * @param done {Function} function (err, acc) {} - called with final accumulated value or an error if one occurred
 */
var asyncReduce = module.exports = function (items, seed, iterator, done) {
  if (!Array.isArray(items)) throw new Error('items must be an Array');

  if (typeof iterator !== 'function') throw new Error('iterator must be a function');
  if (iterator.length < 3) throw new Error('iterator must take at least 3 arguments, the accumulator, current itema and callback');

  if (typeof done !== 'function') throw new Error('done must be a function');
  if (iterator.length < 2) throw new Error('iterator must take at least 2 arguments, the error, and final value');

  var tasks = items.map(function (item) {
    return function (acc, cb) {
      iterator(acc, item, cb);
    };
  });

  runnel(
    [ runnel.seed(seed) ]
      .concat(tasks)
      .concat(done)
  );
};
