## Rocky Leco Clay

A simple watchface for Pebble, written using Rocky.js and configurable with Clay.

This version demonstrates Clay able to be built and emulated from CloudPebble.

If you are not running CloudPebble, after cloning:

```
$ pebble package install pebble-clay`
```

and change `require('./pebble-clay');` in `src/pkjs/index.js` to `var Clay = require('pebble-clay');`