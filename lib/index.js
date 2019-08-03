'use strict';

const loggerFactory = require('./logger');

module.exports = (minLevel = 'info', handler) => {

	return loggerFactory()
		.setMinLevel(minLevel)
		.setHandler(handler);
};
