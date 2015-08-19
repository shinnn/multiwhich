'use strong';

const path = require('path');

const test = require('tape');
const multiwhich = require('.');
const which = require('which');

test('whichPromise()', t => {
  t.plan(12);

  const binName = path.basename(process.execPath);

  multiwhich([binName], (err, paths) => {
    t.strictEqual(err, null, 'should accept a single-element array.');
    t.deepEqual(paths, [process.execPath], 'should find the first instance of an executable in the PATH.');
  });

  multiwhich([binName, 'mkdir'], (err, paths) => {
    t.strictEqual(err, null, 'should accept a multi-element array.');
    t.deepEqual(
      paths,
      [process.execPath, which.sync('mkdir')],
      'should find the instances of multiple executables in the PATH.'
    );
  });

  multiwhich(['eslint.js'], {path: 'node_modules/eslint/bin', all: true}, (err, paths) => {
    t.strictEqual(err, null, 'should accept node-which options.');
    t.deepEqual(
      paths,
      [[path.resolve('node_modules/eslint/bin/eslint.js')]],
      'should reflect node-which options to the result.'
    );
  });

  multiwhich(['__these_binaries__', binName, '__don/t_exist__'], err => {
    t.strictEqual(
      err.message,
      'not found: __these_binaries__',
      'should pass the first node-which error to its callback.'
    );
  });

  t.throws(
    () => multiwhich('mkdir'),
    /TypeError.*mkdir is not an array/,
    'should throw a type error when the first argument os not an array.'
  );

  t.throws(
    () => multiwhich([1, binName], t.fail),
    /TypeError.*1 is not a string/,
    'should throw a type error when one of the array elements is not a string.'
  );

  t.throws(
    () => multiwhich([1, binName, null], t.fail),
    /TypeError.*1 and null are not strings/,
    'should throw a type error when more than one of the array elements is not a string.'
  );

  t.throws(
    () => multiwhich([binName], {path: 1}, t.fail),
    /TypeError/,
    'should throw a type error when it takes an invalid node-which option.'
  );

  t.throws(
    () => multiwhich([binName], 1),
    /TypeError.*1 is not a function\. Expected a callback function of multiwhich/,
    'should throw a type error when the last argument os not a function.'
  );
});
