/* global describe, it*/
var assert = require('chai').assert;
var Core = require('gengojs-core');
var api = require('../');
describe('API (plugin)', function() {
  'use strict';
  describe('load plugin', function() {
    it('should exist in the core', function() {
      var gengo = new Core({}, api());
      assert.isDefined(gengo.plugins.apis[0]);
    });
  });
});