const sh = require('shelljs');
const assert = require('chai').assert;
const tempfile = require('tempfile');
const EXITS = require('../src/exit_statuses');

TMP_SNU_RC_FILEPATH = tempfile();

describe('Command Line Interface', () => {

    beforeEach(function() {
        if (sh.test('-f', TMP_SNU_RC_FILEPATH)) {
            sh.rm(TMP_SNU_RC_FILEPATH);
        }
    })

    it('it works out of the box', () => {
        const result = sh.exec(['node', 'src/cli.js'].join(' '));

        assert.equal(result.code, 0)
    });

    it('it creates a snurc when asked with --init', () => {
        const result = sh.exec(['node', 'src/cli.js', '--init', `--config-filepath=${TMP_SNU_RC_FILEPATH}`].join(' '));

        assert.isOk(sh.test('-f', TMP_SNU_RC_FILEPATH))
    });

    it('it does not create a snurc if not asked', () => {
        const result = sh.exec(['node', 'src/cli.js', `--config-filepath=${TMP_SNU_RC_FILEPATH}`].join(' '));

        assert.isNotOk(sh.test('-f', TMP_SNU_RC_FILEPATH))
    });


    it('it errors when there is a config file in the way', () => {
        const testContent = 'unique content to this test purple monkey dishwasher'
        sh.ShellString(testContent).to(TMP_SNU_RC_FILEPATH)

        const result = sh.exec(['node', 'src/cli.js', '--init', `--config-filepath=${TMP_SNU_RC_FILEPATH}`].join(' '));

        assert.isOk(sh.test('-f', TMP_SNU_RC_FILEPATH));
        assert(result.code !== 0, 'Did not exit with non-zero status')
        assert(sh.cat(TMP_SNU_RC_FILEPATH).stdout == testContent, 'Content of config file was mutated')
    });

    it.only('displays help if you ask', () => {
        const result = sh.exec(['node', 'src/cli.js', '--help'].join(' '));

        assert(result.code === EXITS.SHOWED_INFO, 'Did not exit with SHOWED INFO status')
    });



});