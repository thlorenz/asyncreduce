# asyncreduce [![build status](https://secure.travis-ci.org/thlorenz/asyncreduce.png)](http://travis-ci.org/thlorenz/asyncreduce)

Reduce an array of values via an asynchronous function.

```js
var fs = require('fs');
var path = require('path');
var asyncReduce = require('asyncreduce);

asyncReduce(
    [ '.gitignore', '.jshintrc', '.travis.yml', 'index.js', 'Readme.md' ]
  , {}
  , function size (acc, file, cb) {
      var p = path.join(__dirname, '..', file);

      fs.stat(p, function (err, stat) {
        if (err) return cb(err);

        acc[file] = stat.size;
        cb(null, acc);
      });
    }
  , function done (err, acc) {
      if (err) return console.error(err);
      console.log('sizes:\n', acc);
    }
);
```

## Installation

    npm install asyncreduce

### In the browser

#### With [browserify](https://github.com/substack/node-browserify)

You are all 

## API

### *function asyncReduce (items, seed, iterator, done)*

```
/**
 * Calls provided async iterator function with the accumulator and each item.
 * When all items have been iterated over calls done with a possible error or the final value of the accumulator.
 *
 * @name exports
 * @function
 * @param items {Array} the items to be reduced
 * @param seed {T} the initial value that can be of any type and is passed along as the accumulator (acc) each time the iterator is called
 * @param iterator {Function} function (acc, item, callback) {} - the iterator called for each item
 * @param done {Function} function (err, acc) {} - called with final accumulated value or an error if one occurred
 */
```

## License

MIT
