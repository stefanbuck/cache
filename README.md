# github-linker-registries 
[![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![Supported npm package][count-npm-image]][count-npm-url] [![Supported bower package][count-bower-image]][count-bower-url] [![Supported composer package][count-composer-image]][count-composer-url]


## Install

```bash
$ npm install --save github-linker-registries
```


## Usage

```javascript
var registries = require('github-linker-registries');
console.log(registries.npm) 
// => {"jquery":"https://github.com/jquery/jquery", "bootstrap":"https://github.com/twbs/bootstrap" ...}

console.log(registries.bower)
// => {"lodash":"https://github.com/lodash/lodash", "async":"https://github.com/caolan/async" ...}

console.log(registries.composer)
// => {"monolog/monolog":"https://github.com/Seldaek/monolog", "twig/twig":"https://github.com/fabpot/Twig" ...}
```


## Total supported repositories

npm: 78723

bower: 11398

composer: 37500


## License

Copyright (c) 2014 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-linker-registries
[npm-image]: https://badge.fury.io/js/github-linker-registries.svg
[travis-url]: https://travis-ci.org/stefanbuck/github-linker-registries
[travis-image]: https://travis-ci.org/stefanbuck/github-linker-registries.svg?branch=master
[count-npm-url]: https://npmjs.org/
[count-npm-image]: http://img.shields.io/badge/npm-78723-green.svg
[count-bower-url]: https://bower.io/
[count-bower-image]: http://img.shields.io/badge/bower-11398-green.svg
[count-composer-url]: https://packagist.org/
[count-composer-image]: http://img.shields.io/badge/composer-37500-green.svg
