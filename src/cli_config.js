const nconf = require('nconf');
const homeDir = require('homedir');
const path = require('path');

function createProvider() {
    const provider = new nconf.Provider();

    provider
        .argv()
        .defaults({
            'check-services': true,
            'init': false,
            'config-filepath': path.join(homeDir(), '.snurc.yml'),
            'display-config-status': true,
            'help': false
        });

    return provider;
}

module.exports = createProvider().get();