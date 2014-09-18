'use strict';

var path = require('path');
var githubURLParser = require('github-url-from-git');
var base = require('./base');

module.exports = function(done) {

  var options = {
    uri: 'https://packagist.org/packages/list.json?fields[]=repository',
    jsonStreamPath: 'packages.*',
    jsonStreamMap: function (item, path) {
		item.name = path[path.length - 1];
		return item;
    },
    filter: ['name', 'repository'],
    filePath: path.resolve(__dirname, '../store/composer.js'),
    parser: function(item) {
      return githubURLParser(item.repository);
    }
  };
  base(options, done);
};
