'use strict';

const util = require('util');

const systemConsole = require('./console');

const formatItem = logItem => {
	return typeof logItem === 'string' ? logItem : util.inspect(logItem);
};

const printer = (level, ...logItems) => {
	systemConsole.log(`[${level.toUpperCase().padEnd(5)}] ${logItems.map(logItem => formatItem(logItem)).join(', ')}`);
};

module.exports = {
	debug: printer.bind(null, 'debug'),
	info: printer.bind(null, 'info'),
	warn: printer.bind(null, 'warn'),
	error: printer.bind(null, 'error'),
	fatal: printer.bind(null, 'fatal')
};
