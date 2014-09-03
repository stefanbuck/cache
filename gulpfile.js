'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();
var stats = {total: {}, update: {}};
var paths = {
  lint: ['./gulpfile.js', './task/**/*.js', './store/*.js', './index.js']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber())
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('buildNPM', function (cb) {
  var npmTask = require('./task/npm.js');
  npmTask(function(err, result) {
    if (err) {
      return cb(err);
    }
    stats.update.npm = result.update;
    stats.total.npm = result.total;
    cb();
  });
});

gulp.task('buildBower', function (cb) {
  var bowerTask = require('./task/bower.js');
  bowerTask(function(err, result) {
    if (err) {
      return cb(err);
    }
    stats.update.bower = result.update;
    stats.total.bower = result.total;
    cb();
  });
});

gulp.task('bump', function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['buildNPM', 'buildBower']);

gulp.task('default', ['build', 'lint', 'bump'], function() {
  var history = require('./task/history.js');
  history(stats);
});
