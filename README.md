# cache 
[![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![Supported npm package][count-npm-image]][count-npm-url] [![Supported bower package][count-bower-image]][count-bower-url] [![Supported composer package][count-composer-image]][count-composer-url]

Module that contains the mapping between a dependency and their related GitHub repository page.

## Install

```bash
$ npm install --save github-linker-cache
```


## API

```javascript
var cache = require('github-linker-cache');

console.log(cache.npm['jquery']);
// https://github.com/jquery/jquery

console.log(cache.bower['lodash']);
// https://github.com/lodash/lodash

console.log(cache.composer['monolog']);
// https://github.com/Seldaek/monolog
```


## Total supported repositories

npm: 100537

bower: 23455

composer: 47116


## License

Copyright (c) 2015 by the GitHub-Linkter authors. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-linker-cache
[npm-image]: https://badge.fury.io/js/github-linker-cache.svg
[travis-url]: https://travis-ci.org/github-linker/cache
[travis-image]: https://travis-ci.org/github-linker/cache.svg?branch=master
[count-npm-url]: https://npmjs.org/
[count-npm-image]: http://img.shields.io/badge/npm-100537-green.svg
[count-bower-url]: https://bower.io/
[count-bower-image]: http://img.shields.io/badge/bower-23455-green.svg
[count-composer-url]: https://packagist.org/
[count-composer-image]: http://img.shields.io/badge/composer-47116-green.svg
