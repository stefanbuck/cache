'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rimraf = require('rimraf').sync;
var plugins = require('gulp-load-plugins')();
var stats = require('./stats.json');

var paths = {
  lint: ['./gulpfile.js', './task/**/*.js', './store/*.js', './index.js', './test/**/*.js'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}', '!test/fixtures/**'],
  source: ['./index.js']
};

function rmStoreFiles() {
  rimraf('./store/bower.js');
  rimraf('./store/composer.js');
  rimraf('./store/npm.js');
}

rmStoreFiles();

var writeStats = function(type, result) {
  if (stats.total[type] > result.total) {
    // TODO revert store file
    console.log(type + ' update failed');
    rmStoreFiles();
    process.exit(1);
    return;
  }

  stats.update[type] = result.update;
  stats.total[type] = result.total;

  fs.writeFileSync('./stats.json', JSON.stringify(stats,null, ' '));
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber())
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.plumber())
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('buildNPM', function (cb) {
  var npmTask = require('./task/npm.js');
  npmTask(function(err, result) {
    if (err) {
      return cb(err);
    }
    writeStats('npm', result);
    cb();
  });
});

gulp.task('buildBower', function (cb) {
  var bowerTask = require('./task/bower.js');
  bowerTask(function(err, result) {
    if (err) {
      return cb(err);
    }
    writeStats('bower', result);
    cb();
  });
});

gulp.task('buildComposer', function (cb) {
  var composerTask = require('./task/composer.js');
  composerTask(function(err, result) {
    if (err) {
      return cb(err);
    }
    writeStats('composer', result);
    cb();
  });
});

gulp.task('build', ['buildNPM', 'buildBower', 'buildComposer']);

gulp.task('test', ['lint', 'istanbul']);

gulp.task('default', ['build'], function() {
  var history = require('./task/history.js');
  history(stats);
});
