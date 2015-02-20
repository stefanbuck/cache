'use strict';

var fs = require('fs');
var _ = require('lodash');
var reqeust = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var stats = require('../stats.json');

module.exports = function(options, done) {
  var total = 0;
  var dataPath = options.filePath;
  var filter = es.mapSync(function(item) {
    if (options.filter && Array.isArray(options.filter)) {
      item = _.pick(item, options.filter);
    }
    return item;
  });

  var repoParser = es.map(function(item, cb) {
    var repoURL = options.parser(item); // <-- NEW
    if (!repoURL) {
      return cb();
    }
    total++;
    cb(null, [item.name, repoURL]);
  });

  var handleEnd = function() {
    var oldTotal = stats.total[options.type];
    done(null, {
      total: total,
      update: total - oldTotal
    });
  };

  var handleData = function(data) {
    console.log(data.name);
  };

  reqeust.get(options.uri)
  .pipe(JSONStream.parse(options.jsonStreamPath, options.jsonStreamMap))
  .pipe(filter)
  .on('data', handleData)
  .pipe(repoParser)
  .pipe(JSONStream.stringifyObject('module.exports = {\n', ',\n', '\n};\n'))
  .pipe(fs.createWriteStream(dataPath))
  .on('finish', handleEnd);
};
