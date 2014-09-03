'use strict';

var fs = require('fs');
var _ = require('lodash');
var reqeust = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');

module.exports = function(options, done) {

  var dataPath = options.filePath;
  var oldResult = {};
  if (fs.existsSync(dataPath)) {
    oldResult = require(dataPath);
  }

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
    if (!oldResult[item.name]) {
      update++;
    }
    cb(null, [item.name, repoURL]);
  });

  var total = 0;
  var update = 0;

  var handleEnd = function() {
    var stats = {
      total: total,
      update: update
    };
    done(null, stats);
  };

  var handleData = function(data) {
    console.log(data.name);
  };

  reqeust.get(options.uri)
  .pipe(JSONStream.parse(options.jsonStreamPath))
  .pipe(filter)
  .on('data', handleData)
  .pipe(repoParser)
  .pipe(JSONStream.stringifyObject('module.exports = {\n', ',\n', '\n};\n'))
  .pipe(fs.createWriteStream(dataPath))
  .on('finish', handleEnd);
};
