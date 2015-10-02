# gengojs-default-api

The default API plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-api.svg?branch=master)](https://travis-ci.org/gengojs/plugin-api)

This module will be used for [gengo.js](https://github.com/gengojs/gengojs).

Note: The API examples defined are respect to the [default parser](https://github.com/gengojs/plugin-parser).

An example usage with options is:

```javascript

var gengo = require('gengojs');
var api = require('gengojs-default-api');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	api:{
		/* options */
	}
},/*api()*/));
```
The default API is already included in gengo.js so you should not have to require it.

## Documentation

See [documentation](https://gengojs.github.io/plugin-api)

## Options

```json
{
	"global":"__",
	"localize":"__l"
}
```
## Internal API

None

## Dependencies

* `this.header.getLocale(locale:String)` from `Header` class
* `this.header.setLocale(locale:String)` from `Header` class
* `this.header.detectLocale(locale:String)` from `Header` class (optional)
* `supported:Array` from `Header` options
* `this.backend.catalog(locale:String)` from `Backend` class

## Debug

Unix:

```bash
DEBUG=gengo.api
```
Windows:

```bash
SET DEBUG=gengo.api
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.

## Reserved words

There are a few reserved words in the API. These words are used for
overriding purposes. See the example:

```javascript
// Using 'phrase' keyword:
__({phrase:'Hello!'});
// Using 'parser' keyword which
// overrides the parser:
// See https://github.com/iwatakeshi/gengojs-default-parser
// for more details.
__('Hello!', {parser:'default'});
// Using 'locale' keyword which
// overrides the locale:
__('You have {n, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}', {parser:'format'});
```

## Contribute

Feel free to contribute or even fork the project. This plugin has been
written in ES6 and can be seen under `lib/index.js`.
