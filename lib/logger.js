'use strict';

const consoleHandler = require('./handlers/console');

const logLevels = {
	debug: 10,
	info: 20,
	warn: 30,
	error: 40,
	fatal: 50,
	none: 100
};

let minLevel = logLevels.info;

const shouldLog = level => !!(logLevels[level] && logLevels[level] >= minLevel);

class Logger {

	constructor() {
		this.setHandler(consoleHandler);
	}

	setMinLevel(level) {
		if(!level)
			return this;

		if(!logLevels[level])
			throw new Error(`Unknown log level ${level}.`);

		minLevel = logLevels[level];
		return this;
	}

	setHandler(handler) {
		if(handler)
			this.handler = handler;

		return this;
	}

	debug() {
		this._tryToLog('debug', ...arguments);
	}

	info() {
		this._tryToLog('info', ...arguments);
	}

	warn() {
		this._tryToLog('warn', ...arguments);
	}

	error() {
		this._tryToLog('error', ...arguments);
	}

	fatal() {
		this._tryToLog('fatal', ...arguments);
	}

	_tryToLog(level, ...data) {
		if(shouldLog(level))
			this.handler[level](...data);
	}

}

module.exports = () => new Logger();
