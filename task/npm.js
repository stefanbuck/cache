'use strict';

var path = require('path');
var githubURLParser = require('github-url-from-git');
var base = require('./base');

var parseURL = function(url) {

  // Remove last trailing slash
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1);
  }
  // Fix multiple forward slashes
  url = url.replace(/([^:]\/)\/+/g, '$1');

  // Resolve shorthand url to a qualified URL
  if (url.split('/').length === 2) {
    url = 'http://github.com/' + url;
  }

  // Replace and fix invalid urls
  url = url.replace('https+git://', 'git+https://');
  url = url.replace('://www.github.com', '://github.com');

  // Resolve detail link
  url = url.split('/tree/master')[0];
  url = url.split('/blob/master')[0];

  var githubUrl = githubURLParser(url);
  if (githubUrl) {
    return githubUrl;
  }
};

var getRepoURL = function(node) {
  if (typeof node === 'string') {
    return parseURL(node);
  } else if (node.url) {
    return parseURL(node.url);
  } else if (node.path) {
    return parseURL(node.path);
  } else if (node.web) {
    return parseURL(node.web);
  } else if (node.git) {
    return parseURL(node.git);
  }
};

var lookup = function(node) {
  if (Array.isArray(node)) {
    return getRepoURL(node[0]);
  } else {
    return getRepoURL(node);
  }
};

var getURL = function(node) {
  var result = null;

  if (node.repository) {
    result = lookup(node.repository);
  }
  if (!result && node.repositories) {
    result = lookup(node.repositories);
  }
  if (!result && node.homepage) {
    result = parseURL(node.homepage);
  }

  return result;
};

module.exports = function(done) {

  var options = {
    uri: 'http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true',
    jsonStreamPath: 'rows.*.doc',
    filter: ['name', 'repository', 'repositories', 'homepage'],
    filePath: path.resolve(__dirname, '../store/npm.js'),
    parser: getURL
  };
  base(options, done);
};
