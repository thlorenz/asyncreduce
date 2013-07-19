'use strict';
/*jshint asi: true */

var test = require('tape')

var fs = require('fs');
var path = require('path');
var asyncReduce = require('../');

if (typeof window === 'undefined') {
  test('\nreducing files to a hash with their modes', function (t) {
    t.plan(2)
    asyncReduce(
        [ 'test', 'examples', '.travis.yml', 'index.js', 'Readme.md' ]
      , {}
      , function size (acc, file, cb) {
          var p = path.join(__dirname, '..', file);

          fs.stat(p, function (err, stat) {
            if (err) return cb(err);

            acc[file] = stat.mode;
            cb(null, acc);
          });
        }
      , function done (err, acc) {
          t.notOk(err, 'no error')
          t.deepEqual(
              acc
            , { test: 16877,
                examples: 16877,
                '.travis.yml': 33188,
                'index.js': 33188,
                'Readme.md': 33188 }
          )
        }
    )
  })
}

test('\nsimulate reducing files to a hash with their modes', function (t) {
  t.plan(2)
  var sizes = {
    test          :  16877,
    examples      :  16877,
    '.travis.yml' :  33188,
    'index.js'    :  33188,
    'Readme.md'   :  33188 }

  asyncReduce(
      [ 'test', 'examples', '.travis.yml', 'index.js' ]
    , {}
    , function size (acc, file, cb) {
        var fileSize = sizes[file]
        acc[file] = fileSize;
        setTimeout(cb.bind(null, null, acc), 5);
      }
    , function done (err, acc) {
        t.notOk(err, 'no error')
        t.deepEqual(
            acc
          , { test: 16877,
              examples: 16877,
              '.travis.yml': 33188,
              'index.js': 33188 }
        )
      }
  )
})

var validIterator = function (acc, item, cb) {}
var validDone = function (err, acc) {}
var seed = ''

test('\nargument validation', function (t) {
  t.throws(
      function () { asyncReduce(1, seed, validIterator, validDone) }
    , /must be an Array/
  )
  t.throws(
      function () { asyncReduce([1, 2], seed, '', validDone) }
    , /iterator must be a function/
  )
  t.throws(
      function () { asyncReduce([1, 2], seed, function (item, cb) { /* forgot acc */ }, validDone) }
    , /iterator must take at least 3 arguments/
  )
  t.throws(
      function () { asyncReduce([1, 2], seed, validIterator, '') }
    , /done must be a function/
  )
  t.throws(
      function () { asyncReduce([1, 2], seed, validIterator, function (acc) { /* forgot err */ }) }
    , /done must take at least 2 arguments/
  )
  t.end()
})
