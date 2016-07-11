const assert = require('chai').assert;
const goPieces = require('../src/snu').goPieces;
const config = require('../src/config');
const Service = require('../src/services').Service
const _ = function() {}


const ShownService = Service('shown_service', 'Shown Service', 'http://www.example.com/', _)
const HiddenService = Service('hidden_service', 'Hiddent Service', 'http://www.example.com/', _)
const NotInConfigService = Service('unknown_service', 'Unknown Service', 'http://www.example.com/', _)

const ServiceDirectory = [
  ShownService,
  HiddenService,
]

const configJSON = {
  services: {
    'shown_service': true,
    'hidden_service': false,
    // 'unknown_service': false
  }
}

describe('Configuration', function() {
  it('should only gather reports for known & shown', (done) => {
    const gathererSpy = function(renderer, service) {
      assert.deepEqual(service, ShownService);
      assert.notDeepEqual(service, HiddenService);
      assert.notDeepEqual(service, NotInConfigService);
      done();
    };

    goPieces(configJSON, _, gathererSpy, ServiceDirectory)
  });


  it('can generate a config file with current services', () => {
    generatedConfig = config.generateConfig([ ShownService ], [ HiddenService ]);

    assert.deepEqual(generatedConfig, {
      services: {
        shown: [ ShownService.key ],
        hidden: [ HiddenService.key ]
      }
    })
  });

  it('can write a generated configuration', () => {
    generatedConfig = config.generateConfig(ServiceDirectory);
    config.saveConfig(generatedConfig);
  });
});