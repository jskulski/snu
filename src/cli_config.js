const nconf = require('nconf');
const homeDir = require('homedir');
const path = require('path');

function createProvider() {
    const provider = new nconf.Provider();

    provider
        .argv()
        .defaults({
            'init': false,
            'config-filepath': path.join(homeDir(), '.snurc.yml'),
            'show-quick-help': true,
            'show-help': false
        });

    return provider;
}

module.exports = createProvider().get();