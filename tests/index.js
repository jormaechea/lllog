'use strict';

const assert = require('assert');

const loggerFactory = require('../lib');

describe('Factory', () => {

	context('Default logger', () => {

		const logger = loggerFactory();

		it('Should create a logger object when invoked', () => {
			assert.strictEqual(typeof logger, 'object');
		});
	});

	context('Custom level logger', () => {

		const logger = loggerFactory('warn');

		it('Should create a logger object when invoked', () => {
			assert.strictEqual(typeof logger, 'object');
		});
	});

	context('Custom handler logger', () => {

		const logger = loggerFactory('warn', {});

		it('Should create a logger object when invoked', () => {
			assert.strictEqual(typeof logger, 'object');
		});
	});
});
