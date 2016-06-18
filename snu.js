const invariant = require('invariant');
const R = require('ramda');
const fetch = require('node-fetch');

const Services = require('./services');

// data Config = [ ServiceKey ]
// go :: Config -> Renderer -> Side Effects?
function go(config, renderer) {
  var requestedServices;
  if (!config || !config.services || config.services.length == 0) {
    requestedServices = Services.ALL;
  }
  else {
    const inConfig = (svc) => R.contains(svc.key, config.services)
    requestedServices = R.filter(inConfig, Services.ALL);
  }

  const renderReport = R.curry(gatherReport)(renderer);
  R.map(renderReport, requestedServices)
}

// gatherReport :: Renderer -> Service -> Indicator (Side effect)
function gatherReport(renderer, service) {
  fetch(service.url)
    .then((resp) => resp.json()) // TODO: pass promise around to allow other methods than JSON?
    .then(service.parser)
    .then(renderer)
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}

module.exports = {
  go,
  gatherReport
}
