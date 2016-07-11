const assert = require('chai').assert;
const goPieces = require('../snu').goPieces;
const Service = require('../services').Service
const _ = function() {}

const ShownService = Service('shown_service', 'Shown Service', 'http://www.example.com/', _)
const HiddenService = Service('hidden_service', 'Hiddent Service', 'http://www.example.com/', _)
const NotInConfigService = Service('unknown_service', 'Unknown Service', 'http://www.example.com/', _)

const ServiceDirectory = [
  ShownService,
  HiddenService,
  NotInConfigService
]

const config = {
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

    goPieces(config, _, gathererSpy, ServiceDirectory)
  });


  it.only('can generate a config file with current services', () => {
    // generateConfig :: [ Services ] -> Config
    const SERVICE_VISIBLE = true

    function generateConfig(serviceDirectory) {
      const R = require('ramda');

      const serviceKeys = R.map(R.prop('key'), serviceDirectory);
      const serviceVisibilityStatuses = R.times(() => SERVICE_VISIBLE, serviceKeys.length)
      const servicesConfig = R.zipObj(serviceKeys, serviceVisibilityStatuses)

      return {
        services: servicesConfig
      }
    }

    generatedConfig = generateConfig(ServiceDirectory);

    assert.deepEqual(generatedConfig, {
      services: {
        'shown_service': true,
        'hidden_service': true,
        'unknown_service': true
      }
    })
  });

  // it.only('can write a generated configuration', () => {

  //   generatedConfig = generateConfig(ServiceDirectory);


  // });
});