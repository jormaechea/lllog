'use strict';

const assert = require('assert');
const sinon = require('sinon');

const consoleHandler = require('../../lib/handlers/console');

const systemConsole = require('../../lib/handlers/console/console');

describe('Console log handler', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('Should be using the system\'s console', () => {
		assert.deepStrictEqual(console, systemConsole);
	});

	describe('Formatting', () => {

		beforeEach(() => {
			sinon.stub(systemConsole, 'log');
		});

		it('Should format properly a string', () => {

			consoleHandler.debug('Test');
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] Test');
		});

		it('Should format properly an integer', () => {

			consoleHandler.debug(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] 1');
		});

		it('Should format properly an float', () => {

			consoleHandler.debug(1.52);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] 1.52');
		});

		it('Should format properly an empty array', () => {

			consoleHandler.debug([]);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] []');
		});

		it('Should format properly a not-empty array', () => {

			consoleHandler.debug(['foo']);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] [ \'foo\' ]');
		});

		it('Should format properly an empty object', () => {

			consoleHandler.debug({});
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] {}');
		});

		it('Should format properly a not-empty object', () => {

			consoleHandler.debug({ foo: 1 });
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] { foo: 1 }');
		});

		it('Should format properly a class', () => {

			class MyClass {
			}

			consoleHandler.debug(new MyClass());
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] MyClass {}');
		});

		it('Should format properly a class instance', () => {

			class MyClass {
			}

			consoleHandler.debug(MyClass);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] [Function: MyClass]');
		});

		it('Should format properly a class instance with properties', () => {

			class MyClass {
				constructor() {
					this.foo = 1;
				}
			}

			consoleHandler.debug(new MyClass());
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] MyClass { foo: 1 }');
		});

		it('Should format more than one log item separated by comma', () => {
			consoleHandler.debug('test', 1, []);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] test, 1, []');
		});
	});

	describe('Prefixing', () => {

		beforeEach(() => {
			sinon.stub(systemConsole, 'log');
		});

		it('Should prefix with [DEBUG] when logging in debug level', () => {
			consoleHandler.debug(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[DEBUG] 1');
		});

		it('Should prefix with [INFO ] when logging in info level', () => {
			consoleHandler.info(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[INFO ] 1');
		});

		it('Should prefix with [WARN ] when logging in warn level', () => {
			consoleHandler.warn(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[WARN ] 1');
		});

		it('Should prefix with [ERROR] when logging in error level', () => {
			consoleHandler.error(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[ERROR] 1');
		});

		it('Should prefix with [FATAL] when logging in fatal level', () => {
			consoleHandler.fatal(1);
			sinon.assert.calledOnce(systemConsole.log);
			sinon.assert.calledWithExactly(systemConsole.log, '[FATAL] 1');
		});
	});
});
