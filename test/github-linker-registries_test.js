'use strict';

var registries = require('../');
var validUrl = require('valid-url');
require('should');

describe('githubLinkerRegistries', function () {

  it('public properties', function () {
    registries.should.have.keys('npm', 'bower', 'composer');
  });

  it('npm content length', function () {
    Object.keys(registries.npm).length.should.be.above(0);
  });

  it('bower content length', function () {
    Object.keys(registries.bower).length.should.be.above(0);
  });

  it('composer content length', function () {
    Object.keys(registries.composer).length.should.be.above(0);
  });

  it('npm returns a valid uri', function () {
    var item = registries.npm[Object.keys(registries.npm)[0]];
    validUrl.isUri(item).length.should.be.above(0);
  });

  it('bower returns a valid uri', function () {
    var item = registries.bower[Object.keys(registries.bower)[0]];
    validUrl.isUri(item).length.should.be.above(0);
  });

  it('composer returns a valid uri', function () {
    var item = registries.composer[Object.keys(registries.composer)[0]];
    validUrl.isUri(item).length.should.be.above(0);
  });

});
