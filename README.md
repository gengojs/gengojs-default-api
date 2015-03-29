# gengojs-default-api

The default API plugin for gengojs.

This module will be used for the upcoming [gengo.js](https://github.com/iwatakeshi/gengojs) **1.0.0**.


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
The default api is already included in gengojs so you should not have to require it.


##Options

```json
{
	"global":"__",
	"localize":"__l"
}
```
