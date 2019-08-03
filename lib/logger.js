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

const defaultLevel = 'info';

class Logger {

	constructor() {
		this.setMinLevel(defaultLevel);
		this.setHandler(consoleHandler);
	}

	setMinLevel(level) {
		if(!logLevels[level])
			throw new Error(`Unknown log level ${level}.`);

		this.minLevel = logLevels[level];
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

	_shouldLog(level) {
		return !!(logLevels[level] && logLevels[level] >= this.minLevel);
	}

	_tryToLog(level, ...data) {
		if(this._shouldLog(level))
			this.handler[level](...data);
	}

}

module.exports = () => new Logger();
