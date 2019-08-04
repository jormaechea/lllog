'use strict';

const loggerFactory = require('./logger');

module.exports = (minLevel, handler) => {

	return loggerFactory()
		.setMinLevel(minLevel)
		.setHandler(handler);
};
