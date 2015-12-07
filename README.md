# multiwhich

[![NPM version](https://img.shields.io/npm/v/multiwhich.svg)](https://www.npmjs.com/package/multiwhich)
[![Build Status](https://travis-ci.org/shinnn/multiwhich.svg?branch=master)](https://travis-ci.org/shinnn/multiwhich)
[![Build status](https://ci.appveyor.com/api/projects/status/m206w6c0co7l8cmq?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/multiwhich)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/multiwhich.svg)](https://coveralls.io/github/shinnn/multiwhich?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/multiwhich.svg)](https://david-dm.org/shinnn/multiwhich)
[![devDependency Status](https://david-dm.org/shinnn/multiwhich/dev-status.svg)](https://david-dm.org/shinnn/multiwhich#info=devDependencies)

[node-which](https://github.com/npm/node-which) with multi-executable support: finds the instances of a specified executables in the PATH environment variable.

```javascript
const multiwhich = require('multiwhich');

multiwhich(['ls', 'mkdir'], (err, paths) {
  if (err) {
    throw err;
  }

  paths; ['/bin/ls', '/bin/mkdir']
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install multiwhich
```

## API

```javascript
const multiwhich = require('multiwhich');
```

### multiwhich(*cmds* [, *options*], **callback**)

*cmds*: `Array` of strings  
*options*: `Object` (used as node-which [options](https://github.com/npm/node-which#options))  
*callback*: `Function`

The API is almost the same as [`node-which`'s](https://github.com/npm/node-which#usage), except for:

* It receives an array of executable names as its first argument.
* It passes an array of the resolved executable paths to the callback function.

```javascript
const multiwhich = require('multiwhich');

multiwhich(['eslint', 'tape'], {path: 'node_modules/.bin/'}, (err, paths) => {
  if (err) {
    throw err;
  }

  paths:
  //=> ['/Users/yourname/project/node_modules/.bin/eslint', '/Users/yourname/project/node_modules/.bin/eslint']
});
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
