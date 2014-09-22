/*
 * github-linker-cache
 * https://github.com/stefanbuck/github-linker-cache
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
  bower: require('./store/bower.js'),
  npm: require('./store/npm.js'),
  composer: require('./store/composer.js')
};
