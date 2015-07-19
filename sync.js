#!/usr/bin/env node
var meta = require('../../package')
var transform = require('../../')
require('stdin-transform-cli')(
  meta.name,
  meta.version,
  function(input, callback) {
    try {
      callback(null, transform(input)) }
    catch (error) {
      callback(error) } })()
