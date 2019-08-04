# LLLog

[![npm version](https://badgen.net/npm/v/lllog)](https://www.npmjs.com/package/lllog)
[![Install size](https://badgen.net/packagephobia/install/lllog)](https://www.npmjs.com/package/lllog)
[![Build Status](https://travis-ci.org/jormaechea/lllog.svg?branch=master)](https://travis-ci.org/jormaechea/lllog)
[![Coverage Status](https://coveralls.io/repos/github/jormaechea/lllog/badge.svg?branch=master)](https://coveralls.io/github/jormaechea/lllog?branch=master)

A minimal **zero-dependency** logger.

## Install

`npm i lllog`

## Usage

Here's an simple example of how to use the package:

```js
const logger = require('lllog')();

logger.info('LLLog is great');
````

You can customize the log level when creating your logger, or on runtime:

```js
const logger = require('lllog')('error');

logger.info('This is not gonna be logged');

logger.error('But this will!');
logger.fatal('Also this one');

logger.setMinLevel('info');
logger.info('Now this is beeing logged too');
```

You can even silence every log using the `none` log level

There are 5 log levels which you can use:
- `debug`
- `info`
- `warn`
- `error`
- `fatal`

You can also use you're own log handler (it must implement the five log levels in order to prevent your app from crashing):

```js
const logger = require('lllog')('error', myHandler);

// Or on runtime
logger.setHandler(myOtherHandler);
```

## Tests
Simply run `npm t`

## Contributing
Issues and PRs are welcome, under one condition: maintain the zero dependency promise.
