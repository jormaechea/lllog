'use strict';

const assert = require('assert');
const sinon = require('sinon');

const loggerGenerator = require('../lib/logger');
const consoleHandler = require('../lib/handlers/console');

describe('Logger', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('Should throw if an invalid min level is set', () => {
		const logger = loggerGenerator();
		assert.throws(() => logger.setMinLevel('unknown'));
	});

	it('Should not invoke the log handler for any level if logger min level is set to none', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('none')
			.setHandler(fakeConsoleHandler);

		logger.debug('test');
		logger.info('test');
		logger.warn('test');
		logger.error('test');
		logger.fatal('test');

		sinon.assert.notCalled(fakeConsoleHandler.debug);
		sinon.assert.notCalled(fakeConsoleHandler.info);
		sinon.assert.notCalled(fakeConsoleHandler.warn);
		sinon.assert.notCalled(fakeConsoleHandler.error);
		sinon.assert.notCalled(fakeConsoleHandler.fatal);
	});

	it('Should not invoke the log handler for levels that are lower than min level', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('info')
			.setHandler(fakeConsoleHandler)
			.debug('test');

		sinon.assert.notCalled(fakeConsoleHandler.info);
	});

	it('Should invoke the log handler for level that is equal to min level', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('info')
			.setHandler(fakeConsoleHandler)
			.info('test');

		sinon.assert.calledOnce(fakeConsoleHandler.info);
		sinon.assert.calledWithExactly(fakeConsoleHandler.info, 'test');
	});

	it('Should invoke the log handler for levels that are higher than min level', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('info')
			.setHandler(fakeConsoleHandler)
			.error('test');

		sinon.assert.calledOnce(fakeConsoleHandler.error);
		sinon.assert.calledWithExactly(fakeConsoleHandler.error, 'test');
	});

	it('Should pass multiple arguments to the log handler', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('info')
			.setHandler(fakeConsoleHandler)
			.error('test', 'foo', 'bar', 'moreFoo');

		sinon.assert.calledOnce(fakeConsoleHandler.error);
		sinon.assert.calledWithExactly(fakeConsoleHandler.error, 'test', 'foo', 'bar', 'moreFoo');
	});

	it('Should pass arguments of any type to the log handler', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const logger = loggerGenerator();
		logger
			.setMinLevel('info')
			.setHandler(fakeConsoleHandler)
			.error('test', 1, ['foo', 1.5], { moreFoo: 'baz', 'x-foo': [] });

		sinon.assert.calledOnce(fakeConsoleHandler.error);
		sinon.assert.calledWithExactly(fakeConsoleHandler.error, 'test', 1, ['foo', 1.5], { moreFoo: 'baz', 'x-foo': [] });
	});

	it('Should use min level as a global state', () => {

		const fakeConsoleHandler = sinon.stub(consoleHandler);

		const loggerToSetLevel = loggerGenerator();
		loggerToSetLevel.setMinLevel('error');

		const logger = loggerGenerator();
		logger.setHandler(fakeConsoleHandler);

		logger.warn('test', 1, ['foo', 1.5], { moreFoo: 'baz', 'x-foo': [] });
		sinon.assert.notCalled(fakeConsoleHandler.warn);

		// Configure in other logger
		loggerToSetLevel.setMinLevel('warn');

		logger.warn('test', 1, ['foo', 1.5], { moreFoo: 'baz', 'x-foo': [] });

		sinon.assert.calledOnce(fakeConsoleHandler.warn);
		sinon.assert.calledWithExactly(fakeConsoleHandler.warn, 'test', 1, ['foo', 1.5], { moreFoo: 'baz', 'x-foo': [] });
	});
});
