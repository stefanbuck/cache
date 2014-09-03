'use strict';

var path = require('path');
var base = require('./base');

module.exports = function(done) {

  var options = {
    uri: 'https://bower-component-list.herokuapp.com',
    jsonStreamPath: '*',
    filter: ['name', 'website'],
    filePath: path.resolve(__dirname, '../store/bower.js'),
    parser: function(item) {
      return item.website;
    }
  };
  base(options, done);
};
