const sh = require('shelljs');
const assert = require('chai').assert;

describe('Command Line Interface', () => {

    it('it works out of the box', () => {
        const result = sh.exec(['node', 'src/cli.js'].join(' '));

        assert.equal(result.code, 0)
    });



});