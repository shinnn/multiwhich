'use strict';

var arrayToSentence = require('array-to-sentence');
var mapAsync = require('map-async');
var oneTime = require('one-time');
var which = require('which');

function isNotString(item) {
  return typeof item !== 'string';
}

module.exports = function multiwhich(cmds, options, cb) {
  if (!Array.isArray(cmds)) {
    throw new TypeError(
      String(cmds) +
      ' is not an array. Expected an array of executable names'
    );
  }

  if (cb === undefined) {
    cb = options;
    options = {};
  }

  var nonStringValues = cmds.filter(isNotString);
  if (nonStringValues.length !== 0) {
    var isPrural = nonStringValues.length > 1;
    throw new TypeError(
      arrayToSentence(nonStringValues) +
      ' ' +
      (isPrural ? 'are' : 'is') +
      ' not ' +
      (isPrural ? 'strings' : 'a string') +
      '. Expected every item in the array is a string of executable name.'
    );
  }

  if (typeof cb !== 'function') {
    throw new TypeError(
      String(cb) +
      ' is not a function. Expected a callback function of multiwhich.'
    );
  }

  mapAsync(cmds, function iterator(cmd, index, done) {
    which(cmd, options, done);
  }, oneTime(cb));
};
