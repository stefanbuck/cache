'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');

var updateReadme = function(stats) {
  var filePath = path.resolve(__dirname, '../README.md');
  var content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/(npm: )[0-9]*/g, '$1' + stats.npm)
      .replace(/(bower: )[0-9]*/g, '$1' + stats.bower)
      .replace(/(composer: )[0-9]*/g, '$1' + stats.composer)
      .replace(/(badge\/npm-)[0-9]*/g, '$1' + stats.npm)
      .replace(/(badge\/bower-)[0-9]*/g, '$1' + stats.bower)
      .replace(/(badge\/composer-)[0-9]*/g, '$1' + stats.composer);

  fs.writeFileSync(filePath, content, 'utf-8');
};

var updateChangelog = function(stats) {
  var pkgFilePath = path.resolve(__dirname, '../package.json');
  var filePath = path.resolve(__dirname, '../CHANGELOG.md');

  var content = fs.readFileSync(filePath, 'utf-8');
  var pkg = fs.readFileSync(pkgFilePath, 'utf-8');
  pkg = JSON.parse(pkg);

  var version = pkg.version;
  var date = new Date().toISOString().slice(0,10);

  var entry = util.format('\n\n## v%s (%s)', version, date);
  if (stats.npm) {
    entry += '\n\nnpm: ' + stats.npm;
  }
  if (stats.bower) {
    entry += '\n\nbower: ' + stats.bower;
  }
  if (stats.composer) {
    entry += '\n\ncomposer: ' + stats.composer;
  }

  var title = '# Changelog';
  content = title + '\n' + entry + content.replace(title, '');

  fs.writeFileSync(filePath, content, 'utf-8');
};

module.exports = function(stats) {
  updateReadme(stats.total);
  updateChangelog(stats.update);
};
