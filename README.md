# async-reduce
[![build status](https://secure.travis-ci.org/thlorenz/async-reduce.png)](http://travis-ci.org/thlorenz/async-reduce)

[![testling badge](https://ci.testling.com/thlorenz/async-reduce.png)](https://ci.testling.com/thlorenz/async-reduce)

Reduce an array of values via an asynchronous function.

```js
var fs = require('fs');
var path = require('path');
var asyncReduce = require('..');

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

    npm install async-reduce

## API


## License

MIT
