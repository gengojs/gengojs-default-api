# gengojs-default-api

The default API plugin for gengo.js.

This module will be used for [gengo.js](https://github.com/iwatakeshi/gengojs).

Note: The API examples defined are respect to the [default parser](https://github.com/iwatakeshi/gengojs-default-parser).

An example usage with options is:

```js

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
* `this.header.detectLocale(locale:String)` from `Header` class
* `supported:Array` from `Header` options
* `this.backend.catalog(locale:String)` from `Backend` class

## Debug

Unix:

```bash
DEBUG=default-api
```
Windows:

```bash
SET DEBUG=default-api
```


## API

* * *

### i18n(arg)

I18ns the arguments.
Note: You can change ID for i18n. See Options.

**Parameters**

**arg**: `*`, The arguments to internationalize.

**Returns**: `String`, Then i18ned string.

**Example**:

<h6>Phrase notation with default parser.</h6>

```js
// Assuming the locale === 'ja',
// a basic phrase returns 'こんにちは'
__('Hello');

// a basic phrase with sprintf returns 'Bob こんにちは'
__('Hello %s', 'Bob');

// a basic phrase with interpolation returns 'Bob こんにちは'
 __('Hello {{name}}', {name:'Bob'});
 ```
 <h6>Bracket notation with default parser.</h6>

```js
// Assuming the locale === 'ja',
// a basic bracket phrase returns 'おっす'
__('[Hello].informal');

// a basic bracket phrase with sprintf returns 'Bob おっす'
__('[Hello %].informal', 'Bob');

// a basic bracket phrase with interpolation returns 'Bob おっす'
__('[Hello {{name}}].informal', {name:'Bob'});
```
<h6>Dot notation with default parser.</h6>

```js
// Assuming the locale === 'ja',
// a basic dot phrase returns 'おっす'
__('greeting.hello.informal');

// a basic dot phrase with sprintf returns 'Bob おっす'
__('greeting.hello.person.informal', 'Bob');

//a basic dot phrase with interpolation returns 'Bob おっす'
__('greeting.hello.person.informal', {name:'Bob'});
```

<h6>All notations with Message Format.</h6>

Note: The format parser uses Yahoo's [intl-messageformat](https://github.com/yahoo/intl-messageformat).
```js

// Assuming the locale === 'en-us',
// a basic phrase with message formatting
// returns "You have 1,000 photos."
__('You have {n, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}', { n: 1000 });

// a basic bracket phrase with message formatting
// returns "You have 1,000 photos since Jan 1, 2015 9:33:04 AM."
__('[You have {n, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}].since.date',
     { n:4000, d:new Date() });

// a basic dot phrase with message formatting
// returns "You have 1,000 photos since Jan 1, 2015 9:33:04 AM."
__('pictures.since.date', { n:4000, d:new Date() });
```

### language(id)

Returns the name of the current locale.

**Parameters**

**id**: `string`, The locale to change.

**Returns**: `String`, Then i18ned string.

**Example**:

<h6>Get the current language.</h6>

```js

// assuming locale === 'en-us'
// returns 'American English'
__.languages();
```
<h6>Get the current language in another locale. </h6>

```js
// assuming locale === 'en-us'
// returns 'English'
__.language('en');

// returns 'Japanese'
__.language('ja');
```

**Example**:

<h6>Get the current language.</h6>

```js

// assuming locale === 'en-us'
// returns 'American English'
__.languages();
```
<h6>Get the current language in another locale. </h6>

```js
// assuming locale === 'en-us'
// returns 'English'
__.language('en');

// returns 'Japanese'
__.language('ja');
```


### languages(arg, supported)

Returns the names of the supported locale.

**Parameters**

**arg**: `String | Array`, The locale to change or the supported locales.

**supported**: `Array`, The supported locales.

**Returns**: `String`, Then i18ned string.

**Example**:

<h6>Get the supported languages.</h6>

```js

// Assuming locale === 'en-us'
// returns ['American English', 'Japanese']
__.lanugages();
```
<h6>Get the current languages in another locale. </h6>

```js
// Assuming locale === 'en-us'
// returns ['アメリカ英語', '日本語']
__.languages('ja');
```
<h6>Override the supported locales.</h6>

```js
// Assuming locale === 'en-us'
// returns ['English', 'Japanese']
__.languages(['en', 'ja']);
```
<h6>Override the supported locales and get the languages in another locale.</h6>

```js

// Assuming locale === 'en-us'
// returns ['英語', '日本語']
__.languages('ja', ['en', 'ja']);
```


### locale(locale)

Sets or gets the locale.

**Parameters**

**locale**: `String`, The locale to set or get.

**Returns**: `String`, The locale.

**Example**:

<h6>Get the current locale.</h6>

```js

// Assuming locale === 'en-us'
// returns 'en-us'
__.locale()
```
<h6>Set the locale.</h6>

```js
// Asumming locale === 'en-us'
// sets and returns 'ja'
__.locale('ja')
```

### catalog(locale)

Returns the catalog.

**Parameters**

**locale**: `String`, The locale to get.

**Returns**: `Object`, The catalog.

**Example**:

<h6>Get the entire catalog.</h6>

```js

// Returns the entire catalog
__.catalog()
```
<h6>Set the locale and return the catalog.</h6>

```js
// Sets and returns the specified catalog
__.catalog('en-us')
```


### l10n(locale)

Localizes date, time and numbers.
See [Tokei](https://github.com/iwatakeshi/tokei) for documentation.
Note: You can change ID for l10n. See Options.

**Parameters**

**locale**: `String`, The locale to override.

**Returns**: `Tokei`, The context of Tokei.

* * *

## Reserved words

There are a few reserved words in the API. These words are used for
overriding purposes. See the example:

```js
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
